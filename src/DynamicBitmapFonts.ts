import { Renderer, Texture } from '@pixi/core';
import { TextStyle } from '@pixi/text';
import { BitmapFont } from '@pixi/text-bitmap';
import { createBitmapFonts, createBitmapFontsAsync } from './createBitmapFonts';

import * as _shortcuts from './shortcuts';
import * as _utils from './utils';

export module DynamicBitmapFonts {

  //// TYPES ////

  export type FontConfiguration = {
    style: Partial<TextStyle>;
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
    modifyTexture?: (texture:Texture, renderer:null|Renderer, config:FontConfiguration)=>Texture
  };

  export type DynamicBitmapFont = BitmapFont & { 
    name: string,
    dynamicBitmapFontConfig?: FontConfiguration, 
    pageTextures?: Record<number, Texture>
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
        textureWidth: undefined,
        textureHeight: undefined,
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
    public renderer:Renderer|null = null;
    public scaleFactor:number = 1.0;

    public ignorePixiRendererResolution:boolean = true;

    public createBitmapFonts(async:boolean = false) {
      const entries = Object.entries(this.configs) as [BitmapFontName, FontConfiguration][];
      const fn = async ? createBitmapFontsAsync : createBitmapFonts;
      return fn(
        entries.reduce(
          (a,[name,originalConfig]) => {
            const config = mergeDeep<FontConfiguration>(
              this.defaultFontConfiguration, 
              originalConfig,              
            );
            config.options.resolution ??= 1.0;
            config.options.resolution *= this.scaleFactor;
            if(!this.ignorePixiRendererResolution) {
              config.options.resolution *= this.renderer.resolution;
            }
            config.options.chars += String(this.requiredCharactersForAllFonts) || '';
            a[name] = config;
            return a;
          }, {} as Record<BitmapFontName,FontConfiguration>
        ),
        this.translations,
        this.renderer,
      )
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
