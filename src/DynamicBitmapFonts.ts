import * as PIXI from 'pixi.js';

import { mergeDeep } from './helpers';

import _shortcuts from './shortcuts';

export module DynamicBitmapFonts {
  export module CHARACTERS {
    export const NONE = "";
    export const ASCII = " 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!?@#%&\"'`*|/\-+=<>,.:;^_~()[]{}";
    
    export const AZ_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    export const AZ_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    export const DIGITS = "0123456789";
    export const SPACE = " ";
    export const SPECIAL = SPACE + "!?@#%&\"'*/\-+=<>,.:;_()";
    export const CURRENCY = "$¢£¤¥֏؋߾߿৲৳৻૱௹฿៛₠₡₢₣₤₥₦₧₨₩₪₫€₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾₿꠸﷼﹩＄￠￡￥￦𑿝𑿞𑿟𑿠𞋿𞲰";

    export const AZ = AZ_UPPERCASE + AZ_LOWERCASE;
    export const ALPHANUMERIC = AZ + DIGITS;

    export const ASCIIish = ALPHANUMERIC + SPECIAL;
  }

  //// TYPES ////

  export type FontConfiguration = {
    style: Partial<PIXI.TextStyle>;
    options: {
      chars?: string | string[] | string[][];
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

  //// SHORTCUTS ////

  export const shortcuts = _shortcuts;

  //// HELPERS ////

  export function combineStringValues(val: any): string {
    if (typeof val === "string") {
      return val;
    }
    return Object.values<string>(val).reduce(
      (a, c) => a + combineStringValues(c), "");
  }

  export function extractUniqueCharacters(
    ...objects: (Record<string, any> | string)[]
  ) {
    const fullString = objects
      .reduce<string>((a, c) => a + combineStringValues(c), "");
    return [ ...new Set([...fullString]) ]
      .filter(c => c !== '\n')
      .sort();
  }

  export class Manager<BitmapFontName extends string = string> {
    public readonly defaultFontConfiguration:Omit<FontConfiguration,'style'> = {
      options: {
        chars: CHARACTERS.ASCIIish,
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
    public requiredCharacters:string = CHARACTERS.ASCIIish
    public translations:any;
    public configs:Record<BitmapFontName,FontConfiguration> = {} as any;
    public renderer:PIXI.Renderer|null = null;
    
    public async createBitmapFonts() {
      const defaultChars = [
        ...extractUniqueCharacters(
          //// From translations json
          this.translations,
          //// Add characters, defined as required regardless of language
          this.requiredCharacters,
        )
      ].sort();

      const entries = Object.entries(this.configs) as [BitmapFontName, FontConfiguration][];
      for (const [fontName, originalConfig] of entries) {
        const config = mergeDeep<FontConfiguration>(
          this.defaultFontConfiguration, 
          { options: { chars: defaultChars } },
          originalConfig,
        );
        this.createBitmapFont(fontName, config);
      }
    }
      
    private async createBitmapFont(fontName:BitmapFontName, config:FontConfiguration) {
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
        }
      }

      const chars = Object.values(font.chars) as {
        kerning: any,
        page: number;
        xAdvance: number;
        texture: PIXI.Texture;
        xOffset: number;
        yOffset: number;
      }[];

      for (let char of chars) {
        char.xOffset += config.xOffset ?? 0.0;
        char.yOffset += config.yOffset ?? 0.0;
        const texture = char.texture as PIXI.Texture;
        texture.frame.width += config.options.padding ?? 0.0;
        texture.updateUvs();
      }

      return font;
    }
  }
}

export default DynamicBitmapFonts;
