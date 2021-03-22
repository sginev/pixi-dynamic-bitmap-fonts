"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
    function combineStringValues(val) {
        if (typeof val === "string") {
            return val;
        }
        return Object.values(val).reduce(function (a, c) { return a + combineStringValues(c); }, "");
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
            this.requiredCharacters = CHARACTERS.ASCIIish;
            this.configs = {};
            this.renderer = null;
        }
        Manager.prototype.createBitmapFonts = function () {
            return __awaiter(this, void 0, void 0, function () {
                var defaultChars, entries, entries_1, entries_1_1, _a, fontName, originalConfig, config;
                var e_1, _b;
                return __generator(this, function (_c) {
                    defaultChars = __spreadArray([], __read(extractUniqueCharacters(
                    //// From translations json
                    this.translations, 
                    //// Add characters, defined as required regardless of language
                    this.requiredCharacters))).sort();
                    entries = Object.entries(this.configs);
                    try {
                        for (entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                            _a = __read(entries_1_1.value, 2), fontName = _a[0], originalConfig = _a[1];
                            config = helpers_1.mergeDeep(this.defaultFontConfiguration, { options: { chars: defaultChars } }, originalConfig);
                            this.createBitmapFont(fontName, config);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (entries_1_1 && !entries_1_1.done && (_b = entries_1["return"])) _b.call(entries_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return [2 /*return*/];
                });
            });
        };
        Manager.prototype.createBitmapFont = function (fontName, config) {
            var _a, _b, _c, _d;
            return __awaiter(this, void 0, void 0, function () {
                var font, key, chars, chars_1, chars_1_1, char, texture;
                var e_2, _e;
                return __generator(this, function (_f) {
                    if ((_a = config === null || config === void 0 ? void 0 : config.style) === null || _a === void 0 ? void 0 : _a.dropShadowDistance) {
                        config.style.dropShadowDistance *= config.options.resolution;
                    }
                    font = Object.assign(PIXI.BitmapFont.from(fontName, config.style, config.options), { dynamicBitmapFontConfig: config, name: fontName });
                    if (config.modifyTexture) {
                        for (key in font.pageTextures) {
                            font.pageTextures[key] = config.modifyTexture(font.pageTextures[key], this.renderer);
                        }
                    }
                    chars = Object.values(font.chars);
                    try {
                        for (chars_1 = __values(chars), chars_1_1 = chars_1.next(); !chars_1_1.done; chars_1_1 = chars_1.next()) {
                            char = chars_1_1.value;
                            char.xOffset += (_b = config.xOffset) !== null && _b !== void 0 ? _b : 0.0;
                            char.yOffset += (_c = config.yOffset) !== null && _c !== void 0 ? _c : 0.0;
                            texture = char.texture;
                            texture.frame.width += (_d = config.options.padding) !== null && _d !== void 0 ? _d : 0.0;
                            texture.updateUvs();
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (chars_1_1 && !chars_1_1.done && (_e = chars_1["return"])) _e.call(chars_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    return [2 /*return*/, font];
                });
            });
        };
        return Manager;
    }());
    DynamicBitmapFonts.Manager = Manager;
})(DynamicBitmapFonts = exports.DynamicBitmapFonts || (exports.DynamicBitmapFonts = {}));
exports["default"] = DynamicBitmapFonts;
//# sourceMappingURL=DynamicBitmapFonts.js.map