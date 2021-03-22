import * as PIXI from 'pixi.js';

export module shortcuts {
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
}

export default shortcuts;
