import * as PIXI from "pixi.js";

import DynamicBitmapFonts from "pixi-dynamic-bitmap-fonts";

import { bitmapFontsConfigs } from "./bitmapFontConfigs";

import en from "./locale/en.json";
import bg from "./locale/bg.json";
import it from "./locale/it.json";
import sp from "./locale/sp.json";

const translations = [en, bg, it, sp].map(o => o.data.strings);

export function main({ stage, renderer }: PIXI.Application) {

  let i = 0;

  const man = new DynamicBitmapFonts.Manager();
  man.defaultFontConfiguration.options.resolution = 1.0;
  //man.requiredCharacters = DynamicBitmapFonts.CHARACTERS.DIGITS;
  man.configs = bitmapFontsConfigs;
  man.renderer = renderer;

  function getFonts() {
    return  Object.values(PIXI.BitmapFont.available) as DynamicBitmapFonts.BitmapFont[];
  }

  function test(trans:any, fontIndex=0) {
    man.translations = trans;
    const fonts = man.createBitmapFonts();

    Object.assign( PIXI.BitmapFont.available, fonts );

    const testFont = getFonts()[fontIndex];
    console.log( 
      `[${ fontIndex }] "${ testFont.name }"
        ${ [...DynamicBitmapFonts.extractUniqueCharacters(trans)].join('') }` )
     
    if ( ! testFont.pageTextures ) {
      return;
    }

    const tex = testFont.pageTextures[0];
    testFont.pageTextures[0].baseTexture.update();

    stage.removeChildren();

    let y = testFont.size * 2.0;
    for ( const [i,t] of Object.values(testFont.pageTextures ?? {} ).entries() ) {
      const s = stage.addChild( new PIXI.Sprite(t))
      s.position.y = y;
      y += s.height;
    }

    const t = new PIXI.BitmapText(testFont.name, {
      fontName: testFont.name,
    })
    stage.addChild(t);
  }

  const COMBINE_ALL_LANGUAGES = true;
  if ( COMBINE_ALL_LANGUAGES ) {
    test(translations)
    document.onclick = () => test(translations, ++i % getFonts().length);
  } else {
    test(translations[i])
    document.onclick = () => test(translations[(++i % translations.length)]);
  }
}
