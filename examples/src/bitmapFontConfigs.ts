import * as PIXI from 'pixi.js';

import DynamicBitmapFonts from "../..";

interface BitmapFontConfigurationsDictionary {
  [key: string]: DynamicBitmapFonts.FontConfiguration;
}

export const bitmapFontsConfigs:BitmapFontConfigurationsDictionary = {
  statusBarValues: {
    style: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: 25,
      fontWeight: 'bold',
      fill: '#ffffff',
      align: 'center',
    },
    options: {
      padding: 1,
    },
    modifyTexture: DynamicBitmapFonts.shortcuts.modifyTextureAsPixiObject( (o) => {
      o.addTextureSpriteCopy();
      const [a,b] = o.children as [PIXI.Sprite,PIXI.Sprite];
      a.x -= 0.5;
      a.tint = 0xFF00FF;
      a.blendMode = PIXI.BLEND_MODES.SCREEN;
      b.x += 0.5;
      b.tint = 0x00FFFF;
      b.blendMode = PIXI.BLEND_MODES.SCREEN;
    }),
    localeKeysWhiteList: [
      "MysteryJackpot", "FreeSpinsTitleAnnounce"
    ]
  },
  freeSpinsAnnounceTitle: {
    style: {
      dropShadow: true,
      dropShadowAngle: 1.7,
      dropShadowBlur: 1,
      dropShadowColor: '#bf73ff',
      dropShadowDistance: 7,
      fill: ['white', '#d977fd', '#f2c0ff', '#ffe5fc', 'white'],
      fillGradientStops: [0.18, 0.24, 0.34, 0.6, 0.9],
      fontFamily: 'Arial Black',
      fontSize: 65,
      lineJoin: 'round',
      stroke: '#f37bf2',
      strokeThickness: 4,
      trim: true,
    },
    options: {
    }
  },
  freeSpinsAnnounceMegaOrbs: {
    style: {
      dropShadow: true,
      dropShadowAngle: 1.7,
      dropShadowBlur: 1,
      dropShadowColor: '#01fe72',
      dropShadowDistance: 7,
      fill: ['white', '#2ff2b2', '#adffc2', '#adffc2', 'white'],
      fillGradientStops: [0.18, 0.24, 0.34, 0.6, 0.9],
      fontFamily: 'Arial Black',
      fontSize: 72,
      lineJoin: 'round',
      stroke: '#59d9c0',
      strokeThickness: 3,
      trim: true,
    },
    options: {
    },
  },
  freeSpinsTitle: {
    style: {
      dropShadow: true,
      dropShadowAngle: 1.7,
      dropShadowBlur: 1,
      dropShadowColor: '#01fe72',
      dropShadowDistance: 7,
      fill: ['white', '#2ff2b2', '#adffc2', '#adffc2', 'white'],
      fillGradientStops: [0.18, 0.24, 0.34, 0.6, 0.9],
      fontFamily: 'Arial Black',
      fontSize: 95,
      lineJoin: 'round',
      stroke: '#59d9c0',
      strokeThickness: 3,
      trim: true,
    },
    options: {
    },
  },
  bonusTitle: {
    style: {
      dropShadow: true,
      dropShadowAngle: 1.7,
      dropShadowBlur: 1,
      dropShadowColor: '#bf73ff',
      dropShadowDistance: 7,
      fill: ['white', '#d977fd', '#f2c0ff', '#ffe5fc', 'white'],
      fillGradientStops: [0.18, 0.24, 0.34, 0.6, 0.9],
      fontFamily: 'Arial Black',
      fontSize: 65,
      lineJoin: 'round',
      stroke: '#f37bf2',
      strokeThickness: 4,
      trim: true,
    },
    options: {
    },
  },
  bonusType: {
    style: {
      dropShadow: true,
      dropShadowAngle: 1.7,
      dropShadowBlur: 1,
      dropShadowColor: '#01fe72',
      dropShadowDistance: 7,
      fill: ['white', '#2ff2b2', '#adffc2', '#adffc2', 'white'],
      fillGradientStops: [0.18, 0.24, 0.34, 0.6, 0.9],
      fontFamily: 'Arial Black',
      fontSize: 72,
      lineJoin: 'round',
      stroke: '#59d9c0',
      strokeThickness: 3,
      trim: true,
    },
    options: {
    },
  },
  bigWin: {
    style: {
      dropShadow: true,
      dropShadowAngle: 1.7,
      dropShadowBlur: 1,
      dropShadowColor: '#0affff',
      dropShadowDistance: 7,
      fill: ['white', '#58ccfe', '#a3fdff', 'white', '#ffeeb3'],
      fillGradientStops: [0.18, 0.24, 0.34, 0.6, 0.9],
      fontFamily: 'Arial Black',
      fontSize: 120,
      lineJoin: 'round',
      stroke: '#34d2d8',
      strokeThickness: 4,
      trim: true,
    },
    options: {
    },
  },
  popupTitle: {
    style: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: 24,
      fontWeight: 'bold',
      fill: '#6aecff',
      align: 'center',
      dropShadow: true,
      dropShadowAngle: Math.PI / 3,
      dropShadowBlur: 1,
      dropShadowColor: '#000000',
      dropShadowDistance: 6,
    },
    options: {
      resolution: 2,
    },
  },
  pickOne: {
    style: {
      dropShadow: true,
      dropShadowAngle: 1.7,
      dropShadowBlur: 1,
      dropShadowColor: '#0affff',
      dropShadowDistance: 2,
      fill: ['white', '#58ccfe', '#a3fdff', 'white', '#ffeeb3'],
      fillGradientStops: [0.18, 0.24, 0.34, 0.6, 0.9],
      fontFamily: 'Arial Black',
      fontSize: 50,
      lineJoin: 'round',
      stroke: '#34d2d8',
      strokeThickness: 4,
      trim: true,
    },
    options: {
    },
  },
  paytablePlay: {
    style: {
      dropShadow: true,
      dropShadowAngle: 1.7,
      dropShadowBlur: 1,
      dropShadowColor: '#c91081',
      dropShadowDistance: 7,
      fill: ['white', '#58ccfe', '#a3fdff', 'white', '#ffeeb3'],
      fillGradientStops: [0.18, 0.24, 0.34, 0.6, 0.9],
      fontFamily: 'thunderstrike, Arial, Helvetica, sans-serif',
      fontSize: 45,
      lineJoin: 'round',
      stroke: '#ff1fb8',
      trim: true,
    },
    options: {
      resolution: 2,
      padding: 12,
    },
    xOffset: -7,
    yOffset: -3,
  },
  tapToContinue: {
    style: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: 40,
      fontWeight: 'bold',
      fill: '#ffffff',
      align: 'center',
    },
    options: {
    },
  },
  paytablePayout: {
    style: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: 20,
      fontWeight: 'bold',
      fill: '#ffffff',
      align: 'center',
      dropShadow: true,
      dropShadowAngle: Math.PI / 3,
      dropShadowBlur: 1,
      dropShadowColor: '#000000',
      dropShadowDistance: 6,
    },
    options: {
      resolution: 2,
    },
  },
  mysteryButtonReward: {
    style: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: 40,
      fontWeight: 'bold',
      fill: '#ffffff',
      align: 'center',
      dropShadow: true,
      dropShadowAngle: Math.PI / 3,
      dropShadowBlur: 1,
      dropShadowColor: '#000000',
      dropShadowDistance: 6,
    },
    options: {
      resolution: 2,
    },
  },
  smallWins: {
    style: {
      dropShadow: true,
      dropShadowAngle: 1.7,
      dropShadowBlur: 1,
      dropShadowColor: '#0affff',
      dropShadowDistance: 4,
      fill: ['white', '#a3fdff', 'white', '#ffeeb3'],
      fillGradientStops: [0.18, 0.34, 0.6, 0.9],
      fontFamily: 'Arial Black',
      fontSize: 50,
      lineJoin: 'round',
      stroke: '#34d2d8',
      strokeThickness: 4,
      trim: true,
    },
    options: {
      resolution: 2,
    },
  },
};
