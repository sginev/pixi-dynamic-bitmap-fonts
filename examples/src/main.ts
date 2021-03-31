import * as PIXI from "pixi.js";

import DynamicBitmapFonts from "pixi-dynamic-bitmap-fonts";

import { bitmapFontsConfigs } from "./bitmapFontConfigs";

import en from "./locale/en.json";
import bg from "./locale/bg.json";
import it from "./locale/it.json";
import sp from "./locale/sp.json";

const localizations = [en, bg, it, sp].map(o => o.data.strings);

for ( const key in bitmapFontsConfigs ) {
  bitmapFontsConfigs[key].options.chars += key;
}

export function main({ stage, renderer }: PIXI.Application) {

  let fontIndex = 0;
  let langIndex = 0;

  const man = new DynamicBitmapFonts.Manager();
  man.defaultFontConfiguration.options.resolution = 1.0;
  man.defaultFontConfiguration.options.textureWidth = 1024;
  man.defaultFontConfiguration.options.textureHeight = 1024;
  man.configs = bitmapFontsConfigs;
  man.renderer = renderer;

  function getFonts() {
    return  Object.values(PIXI.BitmapFont.available) as DynamicBitmapFonts.BitmapFont[];
  }

  function test() {
    man.translations = localizations[langIndex];
    const fonts = man.createBitmapFonts();

    Object.assign( PIXI.BitmapFont.available, fonts );

    const font = getFonts()[fontIndex];
    console.log( 
      `[${ fontIndex }] "${ font.name }"
        ${ [...DynamicBitmapFonts.utils.extractUniqueCharacters(man.translations)].join('') }` )
     
    if ( ! font.pageTextures ) {
      return;
    }

    console.log( font )

    // const tex = testFont.pageTextures[0];
    // tex.baseTexture.update();

    stage.removeChildren();

    let y = font.size * 2.0;
    for ( const [i,t] of Object.values(font.pageTextures ?? {} ).entries() ) {
      const s = stage.addChild( new PIXI.Sprite(t))
      s.position.y = y;
      y += s.height;
    }

    const t = new PIXI.BitmapText(font.name, { fontName: font.name })
    // const t = new PIXI.Text(font.name, { fontfamily: font.font, fontSize : font.size, fill: 'yellow' })
    stage.addChild(t);
  }

  ////

  test()

  document.onmousedown = (e) => {
    console.log(e.button)
    if ( e.button === 0 ) {
      langIndex = ( langIndex + 1 ) % localizations.length;
    } else {
      fontIndex = ( fontIndex + 1 ) % getFonts().length;
    }
    test();
  }
  document.oncontextmenu = e => {
    e.preventDefault();
  }
}
