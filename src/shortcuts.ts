import * as PIXI from 'pixi.js';

////

export module CHARACTERS {
  export const NONE = "";
  export const ASCII = " 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!?@#%&\"'`*|/\-+=<>,.:;^_~()[]{}";
  
  export const AZ_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  export const AZ_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
  export const DIGITS = "0123456789";
  export const SPACE = " ";
  export const SPECIAL = SPACE + "!?@#%&\"'*/\-+=<>,.:;_()";
  export const BASIC_PUNCTUATION = SPACE + "!?-+=,.:;\"";
  export const CURRENCY = "$¢£¤¥֏؋߾߿৲৳৻૱௹฿៛₠₡₢₣₤₥₦₧₨₩₪₫€₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾₿꠸﷼﹩＄￠￡￥￦𑿝𑿞𑿟𑿠𞋿𞲰";

  export const AZ = AZ_UPPERCASE + AZ_LOWERCASE;
  export const ALPHANUMERIC = AZ + DIGITS;

  export const ASCIIish = ALPHANUMERIC + SPECIAL;
}

////

class TempBMFTextureContainer extends PIXI.Container {
  constructor(private readonly bmfTexture: PIXI.Texture) {
    super();
  }
  public addTextureSpriteCopy() {
    return this.addChild(new PIXI.Sprite(this.bmfTexture));
  }
}

export function modifyTextureAsPixiObject(
  modifyPixiObject: (o: TempBMFTextureContainer) => void
) {
  return (
    texture: PIXI.Texture,
    renderer: null | PIXI.Renderer
  ): PIXI.Texture => {
    if (!renderer) {
      throw new Error(`Renderer is ${renderer}`);
    }

    const container = new TempBMFTextureContainer(texture);
    container.addTextureSpriteCopy();

    modifyPixiObject(container);

    const renderTexture = PIXI.RenderTexture.create({
      width: texture.width,
      height: texture.height,
      resolution: 1,
      scaleMode: PIXI.SCALE_MODES.LINEAR
    });
    renderer.render(container, renderTexture);

    return new PIXI.Texture(renderTexture.baseTexture);
  };
}
