import { BitmapFont } from '@pixi/text-bitmap';
import type { Renderer, Texture } from '@pixi/core';
import type DynamicBitmapFonts from '.';
import * as utils from './utils';

type FontConfiguration = DynamicBitmapFonts.FontConfiguration;
type DynamicBitmapFont = DynamicBitmapFonts.DynamicBitmapFont;

function createBitmapFont<BitmapFontName extends string = string>(fontName:BitmapFontName, config:FontConfiguration, renderer: Renderer, translations: any) {
  if ( config.localeKeysWhiteList ) {
    config.options.chars += utils.combineStringValues(translations, config.localeKeysWhiteList);
  } else {
    config.options.chars += utils.combineStringValues(translations);
  }
  config.options.chars = [ ...new Set([...config.options.chars]) ].filter(c => c !== '\n').sort().join('');

  if (config?.style?.dropShadowDistance) {
    config.style.dropShadowDistance *= config.options.resolution;
  }

  const font:DynamicBitmapFont = Object.assign(
    BitmapFont.from(fontName, config.style, config.options), 
    { dynamicBitmapFontConfig: config, name : fontName }
  )

  if ( config.modifyTexture ) {
    for (const key in font.pageTextures) {
      font.pageTextures[key] = config.modifyTexture(font.pageTextures[key], renderer, config);
      for ( const c in font.chars ) {
        font.chars[c].texture.baseTexture = font.pageTextures[key].baseTexture;
      }
    }
  }

  const characters = Object.values(font.chars) as {
    kerning: any,
    page: number;
    xAdvance: number;
    texture: Texture;
    xOffset: number;
    yOffset: number;
  }[];

  for (let character of characters) {
    character.xOffset += config.xOffset ?? 0.0;
    character.yOffset += config.yOffset ?? 0.0;
    const texture = character.texture as Texture;
    texture.frame.width += config.options.padding ?? 0.0;
    texture.updateUvs();
  }

  return font;
}

export function createBitmapFonts<BitmapFontName extends string = string>(
  configs:Record<BitmapFontName,FontConfiguration> = {} as any,
  translations:any,
  renderer:Renderer|null = null,
) {
  const entries = Object.entries(configs) as [BitmapFontName, FontConfiguration][];
  const results = {} as Record<BitmapFontName,DynamicBitmapFont>;
  for (const [name,config] of entries) {
    results[name] = createBitmapFont(name, config, renderer, translations);
  }
  return results;
}

export async function createBitmapFontsAsync<BitmapFontName extends string = string>(
  configs:Record<BitmapFontName,FontConfiguration> = {} as any,
  translations:any,
  renderer:Renderer|null = null,
) {
  type ResultsMap =  Record<BitmapFontName,DynamicBitmapFont>;
  const results = {} as ResultsMap;
  const entries = Object.entries(configs) as [BitmapFontName, FontConfiguration][];
  for (const [name,config] of entries) {
    await nextFrame();
    results[name] = createBitmapFont(name, config, renderer, translations);
  }
  return results;
}

/**
 * @returns A promise, which resolve on the next render frame.
 */
export function nextFrame() {
  return new Promise<unknown>(resolve => window?.requestAnimationFrame(resolve) ?? resolve(-1));
}
