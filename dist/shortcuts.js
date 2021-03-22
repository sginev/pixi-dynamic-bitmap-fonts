"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.shortcuts = void 0;
var PIXI = require("pixi.js");
var shortcuts;
(function (shortcuts) {
    var TempBMFTextureContainer = /** @class */ (function (_super) {
        __extends(TempBMFTextureContainer, _super);
        function TempBMFTextureContainer(bmfTexture) {
            var _this = _super.call(this) || this;
            _this.bmfTexture = bmfTexture;
            return _this;
        }
        TempBMFTextureContainer.prototype.addTextureSpriteCopy = function () {
            return this.addChild(new PIXI.Sprite(this.bmfTexture));
        };
        return TempBMFTextureContainer;
    }(PIXI.Container));
    function modifyTextureAsPixiObject(modifyPixiObject) {
        return function (texture, renderer) {
            if (!renderer) {
                throw new Error("Renderer is " + renderer);
            }
            var container = new TempBMFTextureContainer(texture);
            container.addTextureSpriteCopy();
            modifyPixiObject(container);
            var renderTexture = PIXI.RenderTexture.create({
                width: texture.width,
                height: texture.height,
                resolution: 1,
                scaleMode: PIXI.SCALE_MODES.LINEAR
            });
            renderer.render(container, renderTexture);
            return new PIXI.Texture(renderTexture.baseTexture);
        };
    }
    shortcuts.modifyTextureAsPixiObject = modifyTextureAsPixiObject;
})(shortcuts = exports.shortcuts || (exports.shortcuts = {}));
exports["default"] = shortcuts;
//# sourceMappingURL=shortcuts.js.map