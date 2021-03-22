import * as PIXI from 'pixi.js';
import _shortcuts from './shortcuts';
export declare module DynamicBitmapFonts {
    module CHARACTERS {
        const NONE = "";
        const ASCII = " 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!?@#%&\"'`*|/-+=<>,.:;^_~()[]{}";
        const AZ_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const AZ_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
        const DIGITS = "0123456789";
        const SPACE = " ";
        const SPECIAL: string;
        const CURRENCY = "$\u00A2\u00A3\u00A4\u00A5\u058F\u060B\u07FE\u07FF\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0\u20A1\u20A2\u20A3\u20A4\u20A5\u20A6\u20A7\u20A8\u20A9\u20AA\u20AB\u20AC\u20AD\u20AE\u20AF\u20B0\u20B1\u20B2\u20B3\u20B4\u20B5\u20B6\u20B7\u20B8\u20B9\u20BA\u20BB\u20BC\u20BD\u20BE\u20BF\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6\uD807\uDFDD\uD807\uDFDE\uD807\uDFDF\uD807\uDFE0\uD838\uDEFF\uD83B\uDCB0";
        const AZ: string;
        const ALPHANUMERIC: string;
        const ASCIIish: string;
    }
    type FontConfiguration = {
        style: Partial<PIXI.TextStyle>;
        options: {
            chars?: string | string[] | string[][];
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
    function combineStringValues(val: any): string;
    function extractUniqueCharacters(...objects: (Record<string, any> | string)[]): string[];
    class Manager<BitmapFontName extends string = string> {
        readonly defaultFontConfiguration: Omit<FontConfiguration, 'style'>;
        /**
         * These characters will be used regardless of any currencly defined tranalations.
         * Use to add any support for any parts of the text that would be dynamic
         * (i.e. aren't included in predefined localization files)
         **/
        requiredCharacters: string;
        translations: any;
        configs: Record<BitmapFontName, FontConfiguration>;
        renderer: PIXI.Renderer | null;
        createBitmapFonts(): Promise<void>;
        private createBitmapFont;
    }
}
export default DynamicBitmapFonts;
