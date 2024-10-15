import { Scale } from "phaser"


export const config = {
  type: Phaser.AUTO,
  width: innerWidth,
  height: innerHeight,
  scale: {
    mode: Phaser.Scale.FIT,      // Makes the game scale to fit the screen
    autoCenter: Phaser.Scale.CENTER_BOTH, // Centers the game on the screen
    width: window.innerWidth,    // Adjusts the width based on the screen size
    height: window.innerHeight   // Adjusts the height based on the screen size
},
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