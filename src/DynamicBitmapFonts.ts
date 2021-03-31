import * as PIXI from 'pixi.js';

import * as _shortcuts from './shortcuts';
import * as _utils from './utils';

export module DynamicBitmapFonts {

  //// TYPES ////

  export type FontConfiguration = {
    style: Partial<PIXI.TextStyle>;
    options: {
      chars?: string;
      resolution?: number;
      textureWidth?: number;
      textureHeight?: number;
      padding?: number;
    }
    xOffset?: number;
    yOffset?: number;
    
    localeKeysWhiteList?: string[];
    modifyTexture?: (texture:PIXI.Texture, renderer:null|PIXI.Renderer)=>PIXI.Texture
  };

  export type BitmapFont = PIXI.BitmapFont & { 
    name: string,
    dynamicBitmapFontConfig?: FontConfiguration, 
    pageTextures?: Record<number,PIXI.Texture>
  };
  
  //// HELPERS ////
  
  export const utils = _utils;

  export const shortcuts = _shortcuts;

  //// MANAGER ////

  export class Manager<BitmapFontName extends string = string> {
    public readonly defaultFontConfiguration:Omit<FontConfiguration,'style'> = {
      options: {
        chars: '',
        resolution: 1.0,
        padding: 1,
        textureWidth: 1024,
        textureHeight: 1024,
      },
      xOffset: 0.0,
      yOffset: 0.0,

    }

    /** 
     * These characters will be used regardless of any currencly defined tranalations. 
     * Use to add any support for any parts of the text that would be dynamic
     * (i.e. aren't included in predefined localization files) 
     **/
    public requiredCharactersForAllFonts:string = '';
    public translations:any;
    public configs:Record<BitmapFontName,FontConfiguration> = {} as any;
    public renderer:PIXI.Renderer|null = null;
    
    public createBitmapFonts() {
      const entries = Object.entries(this.configs) as [BitmapFontName, FontConfiguration][];

      return entries.map(
        ([bitmapfontName, bitmapFontConfig]) => {
          return [bitmapfontName,this.createBitmapFont(bitmapfontName, bitmapFontConfig)] as const;
        }
      ).reduce(
        (a,[bitmapfontName,font]) => ({ ...a, [bitmapfontName]: font }), 
        {}
      )
    }
      
    private createBitmapFont(fontName:BitmapFontName, originalConfig:FontConfiguration) {
      const config = mergeDeep<FontConfiguration>(
        this.defaultFontConfiguration, 
        originalConfig,
      );

      config.options.chars += this.requiredCharactersForAllFonts;
      if ( config.localeKeysWhiteList ) {
        config.options.chars += utils.combineStringValues(this.translations, config.localeKeysWhiteList);
      } else {
        config.options.chars += utils.combineStringValues(this.translations);
      }
      config.options.chars = [ ...new Set([...config.options.chars]) ].filter(c => c !== '\n').sort().join('');

      if (config?.style?.dropShadowDistance) {
        config.style.dropShadowDistance *= config.options.resolution;
      }

      const font:BitmapFont = Object.assign(
        PIXI.BitmapFont.from(fontName, config.style, config.options), 
        { dynamicBitmapFontConfig: config, name : fontName }
      )

      if ( config.modifyTexture ) {
        for (const key in font.pageTextures) {
          font.pageTextures[key] = config.modifyTexture(font.pageTextures[key], this.renderer);
          for ( const c in font.chars ) {
            font.chars[c].texture.baseTexture = font.pageTextures[key].baseTexture;
          }
        }
      }

      const characters = Object.values(font.chars) as {
        kerning: any,
        page: number;
        xAdvance: number;
        texture: PIXI.Texture;
        xOffset: number;
        yOffset: number;
      }[];

      for (let character of characters) {
        character.xOffset += config.xOffset ?? 0.0;
        character.yOffset += config.yOffset ?? 0.0;
        const texture = character.texture as PIXI.Texture;
        texture.frame.width += config.options.padding ?? 0.0;
        texture.updateUvs();
      }

      return font;
    }
  }
}

function isObject(item:any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function mergeDeep<T>(target:Partial<T>, ...sources:(Partial<T>|undefined|null)[]):T {
  if (!sources.length) {
    throw new Error(`No sources for mergeDeep()`);
  }

  if (!isObject(target)) {
    throw new Error(`Target is not an object\n` + target);
  }

  return [target,...sources].reduce<T>(
    (a,c) => {
      if ( c !== undefined && c !== null ) {
        for (const key in c) {
          if ( c[key] !== undefined ) {
            if (isObject(c[key])) {
              a[key] = mergeDeep( isObject(a[key]) ? a[key] : {}, c[key]);
            } else {
              a[key] = c[key]!;
            }
          }
        }
      }
      return a;
    },
    {} as T
  )
}

export default DynamicBitmapFonts;
