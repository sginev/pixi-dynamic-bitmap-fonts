"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.DynamicBitmapFonts = void 0;
var PIXI = require("pixi.js");
var helpers_1 = require("./helpers");
var shortcuts_1 = require("./shortcuts");
var DynamicBitmapFonts;
(function (DynamicBitmapFonts) {
    var CHARACTERS;
    (function (CHARACTERS) {
        CHARACTERS.NONE = "";
        CHARACTERS.ASCII = " 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!?@#%&\"'`*|/\-+=<>,.:;^_~()[]{}";
        CHARACTERS.AZ_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        CHARACTERS.AZ_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
        CHARACTERS.DIGITS = "0123456789";
        CHARACTERS.SPACE = " ";
        CHARACTERS.SPECIAL = CHARACTERS.SPACE + "!?@#%&\"'*/\-+=<>,.:;_()";
        CHARACTERS.CURRENCY = "$¢£¤¥֏؋߾߿৲৳৻૱௹฿៛₠₡₢₣₤₥₦₧₨₩₪₫€₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾₿꠸﷼﹩＄￠￡￥￦𑿝𑿞𑿟𑿠𞋿𞲰";
        CHARACTERS.AZ = CHARACTERS.AZ_UPPERCASE + CHARACTERS.AZ_LOWERCASE;
        CHARACTERS.ALPHANUMERIC = CHARACTERS.AZ + CHARACTERS.DIGITS;
        CHARACTERS.ASCIIish = CHARACTERS.ALPHANUMERIC + CHARACTERS.SPECIAL;
    })(CHARACTERS = DynamicBitmapFonts.CHARACTERS || (DynamicBitmapFonts.CHARACTERS = {}));
    //// SHORTCUTS ////
    DynamicBitmapFonts.shortcuts = shortcuts_1["default"];
    //// HELPERS ////
    function combineStringValues(val, keys) {
        if (typeof val === "string") {
            return val;
        }
        return Object.entries(val).reduce(function (a, _a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return (!keys || keys.includes(key))
                ? a + combineStringValues(value, keys)
                : a;
        }, "");
    }
    DynamicBitmapFonts.combineStringValues = combineStringValues;
    function extractUniqueCharacters() {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        var fullString = objects
            .reduce(function (a, c) { return a + combineStringValues(c); }, "");
        return __spreadArray([], __read(new Set(__spreadArray([], __read(fullString))))).filter(function (c) { return c !== '\n'; })
            .sort();
    }
    DynamicBitmapFonts.extractUniqueCharacters = extractUniqueCharacters;
    var Manager = /** @class */ (function () {
        function Manager() {
            this.defaultFontConfiguration = {
                options: {
                    chars: CHARACTERS.ASCIIish,
                    resolution: 1.0,
                    padding: 1,
                    textureWidth: 512,
                    textureHeight: 512
                },
                xOffset: 0.0,
                yOffset: 0.0
            };
            /**
             * These characters will be used regardless of any currencly defined tranalations.
             * Use to add any support for any parts of the text that would be dynamic
             * (i.e. aren't included in predefined localization files)
             **/
            this.requiredCharacters = '';
            this.configs = {};
            this.renderer = null;
        }
        Manager.prototype.createBitmapFonts = function () {
            var _this = this;
            var defaultChars = __spreadArray([], __read(extractUniqueCharacters(
            //// From translations json
            this.translations, 
            //// Add characters, defined as required regardless of language
            this.requiredCharacters))).sort();
            var entries = Object.entries(this.configs);
            return entries.map(function (_a) {
                var _b = __read(_a, 2), bitmapfontName = _b[0], originalConfig = _b[1];
                var config = helpers_1.mergeDeep(_this.defaultFontConfiguration, { options: { chars: defaultChars } }, originalConfig);
                return [bitmapfontName, _this.createBitmapFont(bitmapfontName, config)];
            }).reduce(function (a, _a) {
                var _b;
                var _c = __read(_a, 2), bitmapfontName = _c[0], font = _c[1];
                return (__assign(__assign({}, a), (_b = {}, _b[bitmapfontName] = font, _b)));
            }, {});
        };
        Manager.prototype.createBitmapFont = function (fontName, config) {
            var e_1, _a;
            var _b, _c, _d, _e;
            if (config.localeKeysWhiteList) {
                var allChars = combineStringValues(this.translations, config.localeKeysWhiteList);
                var uniqueChars = __spreadArray([], __read(new Set(__spreadArray([], __read(allChars))))).filter(function (c) { return c !== '\n'; }).sort().join('');
                console.log(fontName, uniqueChars);
                config.options.chars = uniqueChars;
            }
            if ((_b = config === null || config === void 0 ? void 0 : config.style) === null || _b === void 0 ? void 0 : _b.dropShadowDistance) {
                config.style.dropShadowDistance *= config.options.resolution;
            }
            var font = Object.assign(PIXI.BitmapFont.from(fontName, config.style, config.options), { dynamicBitmapFontConfig: config, name: fontName });
            if (config.modifyTexture) {
                for (var key in font.pageTextures) {
                    font.pageTextures[key] = config.modifyTexture(font.pageTextures[key], this.renderer);
                    for (var c in font.chars) {
                        font.chars[c].texture.baseTexture = font.pageTextures[key].baseTexture;
                    }
                }
            }
            var chars = Object.values(font.chars);
            try {
                for (var chars_1 = __values(chars), chars_1_1 = chars_1.next(); !chars_1_1.done; chars_1_1 = chars_1.next()) {
                    var char = chars_1_1.value;
                    char.xOffset += (_c = config.xOffset) !== null && _c !== void 0 ? _c : 0.0;
                    char.yOffset += (_d = config.yOffset) !== null && _d !== void 0 ? _d : 0.0;
                    var texture = char.texture;
                    texture.frame.width += (_e = config.options.padding) !== null && _e !== void 0 ? _e : 0.0;
                    texture.updateUvs();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (chars_1_1 && !chars_1_1.done && (_a = chars_1["return"])) _a.call(chars_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return font;
        };
        return Manager;
    }());
    DynamicBitmapFonts.Manager = Manager;
})(DynamicBitmapFonts = exports.DynamicBitmapFonts || (exports.DynamicBitmapFonts = {}));
exports["default"] = DynamicBitmapFonts;
//# sourceMappingURL=DynamicBitmapFonts.js.map