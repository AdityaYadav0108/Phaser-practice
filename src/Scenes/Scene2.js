import * as Phaser from "phaser";
import { config } from "../utils";

export class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);
    this.ship = this.add.image(
      config.width / 2 - 50,
      config.height / 2,
      "ship"
    );
    this.ship2 = this.add.image(config.width / 2, config.height / 2, "ship2");
    this.ship3 = this.add.image(
      config.width / 2 + 50,
      config.width / 2,
      "ship3"
    );
    this.add.text(config.width/2 - 20, 20, "GO!!!", {
      font: "25px Arial",
      fill: "yellow",
    });
  }
  update(){
    this.moveShip(this.ship, 3);
    this.moveShip(this.ship2, 5);
    this.moveShip(this.ship3, 7);
    this.background.tilePositionY -= 2;
  }

  moveShip(ship, speed){
    ship.y += speed;
    if(ship.y > config.height){
      ship.y = 0;
      this.resetShipPosi(ship);
    }
  }

  resetShipPosi(ship){
    ship.x = Phaser.Math.Between(0, config.width);
  }
}
