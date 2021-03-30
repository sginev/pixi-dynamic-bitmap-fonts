import * as PIXI from 'pixi.js';
import _shortcuts from './shortcuts';
export declare module DynamicBitmapFonts {
    type FontConfiguration = {
        style: Partial<PIXI.TextStyle>;
        options: {
            chars?: string;
            resolution?: number;
            textureWidth?: number;
            textureHeight?: number;
            padding?: number;
        };
        xOffset?: number;
        yOffset?: number;
        localeKeysWhiteList?: string[];
        modifyTexture?: (texture: PIXI.Texture, renderer: null | PIXI.Renderer) => PIXI.Texture;
    };
    type BitmapFont = PIXI.BitmapFont & {
        name: string;
        dynamicBitmapFontConfig?: FontConfiguration;
        pageTextures?: Record<number, PIXI.Texture>;
    };
    const shortcuts: typeof _shortcuts;
    function combineStringValues(val: any, keys?: string[]): string;
    function extractUniqueCharacters(...objects: (Record<string, any> | string)[]): string[];
    class Manager<BitmapFontName extends string = string> {
        readonly defaultFontConfiguration: Omit<FontConfiguration, 'style'>;
        /**
         * These characters will be used regardless of any currencly defined tranalations.
         * Use to add any support for any parts of the text that would be dynamic
         * (i.e. aren't included in predefined localization files)
         **/
        requiredCharactersForAllFonts: string;
        translations: any;
        configs: Record<BitmapFontName, FontConfiguration>;
        renderer: PIXI.Renderer | null;
        createBitmapFonts(): {};
        private createBitmapFont;
    }
}
export default DynamicBitmapFonts;
