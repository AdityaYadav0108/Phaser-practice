import * as Phaser from "phaser";
export class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("background", "../../assets/exp/background.png");
    this.load.spritesheet("ship", "../../assets/spritesheets/ship.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("ship2", "../../assets/spritesheets/ship2.png", {
      frameWidth: 32,
      frameHeight: 16,
    });
    this.load.spritesheet("ship3", "../../assets/spritesheets/ship3.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("planet1", "../../assets/exp/planet_1.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("planet2", "../../assets/exp/planet_2.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("planet3", "../../assets/exp/planet_3.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("planet4", "../../assets/exp/planet_4.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    // this.load.spritesheet("planet5", "../../assets/exp/planet_5.png", {
    //   frameWidth: 48,
    //   frameHeight: 48
    // });
    // this.load.spritesheet("planet6", "../../assets/exp/planet_6.png", {
    //   frameWidth: 48,
    //   frameHeight: 48
    // });
    
    this.load.spritesheet(
      "explosion",
      "../../assets/exp/explosion.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );
    this.load.spritesheet(
      "power-up",
      "../../assets/spritesheets/power-up.png",
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    );

    this.load.spritesheet("player", "../../assets/exp/player.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.spritesheet("beam", "../../assets/spritesheets/beam.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.bitmapFont(
      "pixelFont",
      "../../assets/font/font.png",
      "../../assets/font/font.xml"
    );

    this.load.audio("beamAudio", "../../assets/audio/beam.mp3");
    this.load.audio("explosionAudio", "../../assets/audio/explosion.mp3");
    this.load.audio("pickupAudio", "../../assets/audio/pickup.mp3");
    console.log("audio loaded");
  }

  create() {
    this.add.text(20, 20, "Wait Loading...");
    

    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });
    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1,
      }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: "grey",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 30,
      repeat: -1,
    });

    this.scene.start("playGame");
  }
}
