import * as PIXI from 'pixi.js';
import * as utils from './utils';
import type DynamicBitmapFonts from '.';

type FontConfiguration = DynamicBitmapFonts.FontConfiguration;
type BitmapFont = DynamicBitmapFonts.BitmapFont;

export function createBitmapFonts<BitmapFontName extends string = string>(
  configs:Record<BitmapFontName,FontConfiguration> = {} as any,
  translations:any,
  renderer:PIXI.Renderer|null = null,
) {
  function createBitmapFont(fontName:BitmapFontName, config:FontConfiguration) {
    if ( config.localeKeysWhiteList ) {
      config.options.chars += utils.combineStringValues(translations, config.localeKeysWhiteList);
    } else {
      config.options.chars += utils.combineStringValues(translations);
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
  
  const entries = Object.entries(configs) as [BitmapFontName, FontConfiguration][];
  return entries
    .reduce(
      (a,[name,config]) => {
        a[name] = createBitmapFont(name, config);
        return a;
      }, {} as Record<BitmapFontName,BitmapFont>
    )
}
