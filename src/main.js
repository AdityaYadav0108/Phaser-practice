import * as Phaser from "phaser";
import { Scene1 } from "./Scenes/Scene1";
import { Scene2 } from "./Scenes/Scene2";
import { config } from "./utils";

window.onload = () => {
  config.scene = [Scene1, Scene2];
  let game = new Phaser.Game(config);
};
