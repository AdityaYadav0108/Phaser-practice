import * as Phaser from "phaser";
import { config } from "../utils";

export class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "background"
    );
    this.background.setOrigin(0, 0);
    this.ship1 = this.add.sprite(
      config.width / 2 - 50,
      config.height / 2,
      "ship"
    );
    this.ship2 = this.add.sprite(config.width / 2,
      config.height / 2,
      "ship2");

    this.ship3 = this.add.sprite(
      config.width / 2 + 50,
      config.width / 2,
      "ship3"
    );

    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    })

    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");
  }
  update() {
    this.moveShip(this.ship, 3);
    this.moveShip(this.ship2, 5);
    this.moveShip(this.ship3, 7);
    this.background.tilePositionY -= 2;
  }

  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > config.height) {
      ship.y = 0;
      this.resetShipPosi(ship);
    }
  }

  resetShipPosi(ship) {
    ship.x = Phaser.Math.Between(0, config.width);
  }
}
