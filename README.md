# pixi-dynamic-bitmap-fonts

[![NPM](https://nodei.co/npm/pixi-dynamic-bitmap-fonts.png)](https://npmjs.org/package/pixi-dynamic-bitmap-fonts)

## Disclaimer

This package is very early work in progress. There will be a lot of breaking changes in future versions and hopefully an actual human-understandable readme.

For now:

----

## Usage

```ts
const dbmf = new DynamicBitmapFonts.Manager();

/** Ref your translations object. 
 * This would typically be your localization json object,
 * filled with key-value pairs, the right side of which would be the
 * text, translated to the desired language.
 * 
 * DynamicBitmapFonts will in fact look through those values and
 * gather all unique symvbols found.
 */
dbmf.translation = myTranslationsObject;

/** Just in case, you might want to add characters, even if they aren't
 * found in the translations object.
 * 
 * Typically you'd use this if you want to have digits and perhaps the english alphabet,
 * regardless of the actual language displayed, to resolve dynamic content such as numeric values
 * and usernames.
 */

dbmf.requiredCharacters = DynamicBitmapFonts.CHARACTERS.ALPHANUMERIC;

/**
 * Keys would be the font name. Values -- that font's configurations.
 */
dmbf.configs = {
  "myAwesomeFont": {
    style: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: 24,
      fontWeight: 'bold',
      fill: '#FFFFFF',
    },
    options: {
      textureWidth: 1024,
      textureHeight: 1024,
      resolution: 1.0,
      padding: 1,
    },
    modifyTexture: shortcuts.modifyTextureAsPixiObject( (o) => {
      o.addTextureSpriteCopy();
      const [a,b] = o.children as PIXI.Sprite[];
      a.x -= 1;
      a.alpha = 0.5;
      a.blendMode = PIXI.BLEND_MODES.ADD;
      b.x += 1;
      a.alpha = 0.5;
      b.blendMode = PIXI.BLEND_MODES.ADD;
    })
  },
}

```
