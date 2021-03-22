import * as PIXI from 'pixi.js';
export declare module shortcuts {
    class TempBMFTextureContainer extends PIXI.Container {
        private readonly bmfTexture;
        constructor(bmfTexture: PIXI.Texture);
        addTextureSpriteCopy(): PIXI.Sprite;
    }
    export function modifyTextureAsPixiObject(modifyPixiObject: (o: TempBMFTextureContainer) => void): (texture: PIXI.Texture, renderer: null | PIXI.Renderer) => PIXI.Texture;
    export {};
}
export default shortcuts;
