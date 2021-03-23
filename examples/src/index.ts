import * as PIXI from "pixi.js";

import { main } from "./main";

const app = new PIXI.Application({ width: 1024, height: 2048 });

document.body.innerHTML = ''
document.body.appendChild(app.view);

main(app);

