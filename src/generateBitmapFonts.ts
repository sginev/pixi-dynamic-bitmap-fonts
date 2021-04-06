import * as utils from './utils';

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



export function createBitmapFonts<BitmapFontName extends string = string>(
  translations:any,
  configs:Record<BitmapFontName,FontConfiguration> = {} as any,
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
        font.pageTextures[key] = config.modifyTexture(font.pageTextures[key], renderer);
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
