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
var shortcuts_1 = require("./shortcuts");
var DynamicBitmapFonts;
(function (DynamicBitmapFonts) {
    //// TYPES ////
    //// HELPERS ////
    DynamicBitmapFonts.shortcuts = shortcuts_1["default"];
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
                    chars: '',
                    resolution: 1.0,
                    padding: 1,
                    textureWidth: 1024,
                    textureHeight: 1024
                },
                xOffset: 0.0,
                yOffset: 0.0
            };
            /**
             * These characters will be used regardless of any currencly defined tranalations.
             * Use to add any support for any parts of the text that would be dynamic
             * (i.e. aren't included in predefined localization files)
             **/
            this.requiredCharactersForAllFonts = '';
            this.configs = {};
            this.renderer = null;
        }
        Manager.prototype.createBitmapFonts = function () {
            var _this = this;
            var entries = Object.entries(this.configs);
            return entries.map(function (_a) {
                var _b = __read(_a, 2), bitmapfontName = _b[0], bitmapFontConfig = _b[1];
                return [bitmapfontName, _this.createBitmapFont(bitmapfontName, bitmapFontConfig)];
            }).reduce(function (a, _a) {
                var _b;
                var _c = __read(_a, 2), bitmapfontName = _c[0], font = _c[1];
                return (__assign(__assign({}, a), (_b = {}, _b[bitmapfontName] = font, _b)));
            }, {});
        };
        Manager.prototype.createBitmapFont = function (fontName, originalConfig) {
            var e_1, _a;
            var _b, _c, _d, _e;
            var config = mergeDeep(this.defaultFontConfiguration, originalConfig);
            config.options.chars += this.requiredCharactersForAllFonts;
            if (config.localeKeysWhiteList) {
                config.options.chars += combineStringValues(this.translations, config.localeKeysWhiteList);
            }
            else {
                config.options.chars += combineStringValues(this.translations);
            }
            config.options.chars = __spreadArray([], __read(new Set(__spreadArray([], __read(config.options.chars))))).filter(function (c) { return c !== '\n'; }).sort().join('');
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
            var characters = Object.values(font.chars);
            try {
                for (var characters_1 = __values(characters), characters_1_1 = characters_1.next(); !characters_1_1.done; characters_1_1 = characters_1.next()) {
                    var character = characters_1_1.value;
                    character.xOffset += (_c = config.xOffset) !== null && _c !== void 0 ? _c : 0.0;
                    character.yOffset += (_d = config.yOffset) !== null && _d !== void 0 ? _d : 0.0;
                    var texture = character.texture;
                    texture.frame.width += (_e = config.options.padding) !== null && _e !== void 0 ? _e : 0.0;
                    texture.updateUvs();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (characters_1_1 && !characters_1_1.done && (_a = characters_1["return"])) _a.call(characters_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return font;
        };
        return Manager;
    }());
    DynamicBitmapFonts.Manager = Manager;
})(DynamicBitmapFonts = exports.DynamicBitmapFonts || (exports.DynamicBitmapFonts = {}));
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
function mergeDeep(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    if (!sources.length) {
        throw new Error("No sources for mergeDeep()");
    }
    if (!isObject(target)) {
        throw new Error("Target is not an object\n" + target);
    }
    return __spreadArray([target], __read(sources)).reduce(function (a, c) {
        if (c !== undefined && c !== null) {
            for (var key in c) {
                if (c[key] !== undefined) {
                    if (isObject(c[key])) {
                        a[key] = mergeDeep(isObject(a[key]) ? a[key] : {}, c[key]);
                    }
                    else {
                        a[key] = c[key];
                    }
                }
            }
        }
        return a;
    }, {});
}
exports["default"] = DynamicBitmapFonts;
//# sourceMappingURL=DynamicBitmapFonts.js.map