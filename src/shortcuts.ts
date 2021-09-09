import { SCALE_MODES } from "@pixi/constants";
import { Renderer, RenderTexture, Texture } from "@pixi/core";
import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { DynamicBitmapFonts } from ".";

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

class TempBMFTextureContainer extends Container {
  constructor(private readonly bmfTexture: Texture) {
    super();
  }
  public addTextureSpriteCopy() {
    return this.addChild(new Sprite(this.bmfTexture));
  }
}

export function modifyTextureAsPixiObject(
  modifyPixiObject: (
    container: TempBMFTextureContainer, 
    config:DynamicBitmapFonts.FontConfiguration
  ) => void
) {
  return (
    texture: Texture,
    renderer: null | Renderer,
    config:DynamicBitmapFonts.FontConfiguration
  ): Texture => {
    if (!renderer) {
      throw new Error(`Renderer is ${renderer}`);
    }

    const container = new TempBMFTextureContainer(texture);
    container.addTextureSpriteCopy();

    modifyPixiObject(container, config);

    const renderTexture = RenderTexture.create({
      width: texture.width,
      height: texture.height,
      resolution: config?.options?.resolution ?? 1.0,
      scaleMode: SCALE_MODES.LINEAR
    });
    renderer.render(container, { renderTexture });

    return new Texture(renderTexture.baseTexture);
  };
}
