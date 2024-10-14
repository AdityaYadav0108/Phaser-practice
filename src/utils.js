import { Physics } from "phaser";

export const config = {
  width: 256,
  height: 272,
  bakgroundColor: 0x000000,
  pixelArt: true,
  physics:{
    default: "arcade",
    arcade:{
      debug: false
    }
  }
}

export const gameSettings = {
  playerSpeed: 200,
}