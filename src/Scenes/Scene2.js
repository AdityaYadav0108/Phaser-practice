import * as Phaser from "phaser";
import { config, gameSettings } from "../utils";
import { Beam } from "../Handlers/Beam.js";

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
    
    this.powerUps = this.physics.add.group();
    let maxObjects = 4;
    
    for(let i=0; i<maxObjects; i++){
      let powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, config.width, config.height);

      if(Math.random() > 0.5){
        powerUp.play("red");
      }else{
        powerUp.play("grey");
      }

      powerUp.setVelocity(100, 100);
      powerUp.setCollideWorldBounds(true, 1, 1);
    }

    this.player = this.physics.add.sprite(config.width/2 -8, config.height - 64, "player");
    this.player.setCollideWorldBounds(true)

    this.player.play("thrust");
    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.input.on('gameobjectdown', this.destroyShip, this);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.projectiles = this.add.group();
  } 

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    this.background.tilePositionY -= 1;
    this.movePlayer();

    if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
      this.shootBeam();
    }

    for(let i=0; i< this.projectiles.getChildren().length; i++){
      let beam = this.projectiles.getChildren()[i];
      beam.update();
    }


  }

  movePlayer() {
    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-gameSettings.playerSpeed);
    }else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
    }else if(!this.cursorKeys.left.isDown){
      this.player.setVelocityX(0);
    }else if(!this.cursorKeys.right.isDown){
      this.player.setVelocityX(0);
    }

    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-gameSettings.playerSpeed);
    }else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(gameSettings.playerSpeed);
    }else if(!this.cursorKeys.up.isDown){
      this.player.setVelocityY(0);
    }else if(!this.cursorKeys.down.isDown){
      this.player.setVelocityY(0);
    }
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

  destroyShip(pointer, gameObject){
    gameObject.setTexture('explosion');
    gameObject.play('explode');
  }

  shootBeam(){
    let beam = new Beam(this);
  }

}
