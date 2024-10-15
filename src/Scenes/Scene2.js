import * as Phaser from "phaser";
import { config, gameSettings } from "../utils";
import { Beam } from "../Handlers/Beam.js";
import { Explosion } from "../Handlers/Explosion.js";

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
    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");

    this.ship3 = this.add.sprite(
      config.width / 2 + 50,
      config.width / 2,
      "ship3"
    );

    this.beamSound = this.sound.add("beamAudio");
    this.explosionSound = this.sound.add("explosionAudio");
    this.pickupSound = this.sound.add("pickupAudio");
    console.log(this.pickupSound)

    this.ships = this.physics.add.group();
    this.ships.add(this.ship1);
    this.ships.add(this.ship2);
    this.ships.add(this.ship3);

    this.score = 0;
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE:", 20);
    this.scoreLabel.text = "SCORE:" + String(this.score);

    this.powerUps = this.physics.add.group();
    let maxObjects = 4;

    for (let i = 0; i < maxObjects; i++) {
      let powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, config.width, config.height);

      if (Math.random() > 0.5) {
        powerUp.play("red");
      } else {
        powerUp.play("grey");
      }

      powerUp.setVelocity(100, 100);
      powerUp.setCollideWorldBounds(true, 1, 1);
    }

    this.player = this.physics.add.sprite(
      config.width / 2 - 8,
      config.height - 64,
      "player"
    );
    this.player.setCollideWorldBounds(true);

    this.player.play("thrust");
    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.projectiles = this.add.group();

    this.physics.add.collider(
      this.projectiles,
      this.powerUps,
      function (projectile, powerUp) {
        projectile.destroy();
      }
    );
    this.physics.add.overlap(
      this.player,
      this.powerUps,
      this.powerUp,
      this.removePowerUps,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.ships,
      this.hurtPlayer,
      null,
      this
    );
    this.physics.add.overlap(
      this.projectiles,
      this.ships,
      this.killEnemy,
      null,
      this
    );
  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    this.background.tilePositionY -= 1;
    this.movePlayer();

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if (this.player.active) {
        this.shootBeam();
      }
    }

    for (let i = 0; i < this.projectiles.getChildren().length; i++) {
      let beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  }

  movePlayer() {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed);
    } else if (!this.cursorKeys.left.isDown) {
      this.player.setVelocityX(0);
    } else if (!this.cursorKeys.right.isDown) {
      this.player.setVelocityX(0);
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed);
    } else if (!this.cursorKeys.up.isDown) {
      this.player.setVelocityY(0);
    } else if (!this.cursorKeys.down.isDown) {
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
    ship.y = -100;
  }

  shootBeam() {
    let beam = new Beam(this);
    this.beamSound.play();
  }

  removePowerUps(player, powerUp) {
    powerUp.disableBody(true, true);
  }

  hurtPlayer(player, ship) {
    this.resetShipPosi(ship);

    if (player.alpha < 1) {
      return;
    }
    
    let explosion = new Explosion(this, player.x, player.y);
    player.disableBody(true, true);
    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false,
    });
  }
  killEnemy(projectile, ship) {
    projectile.destroy();
    let explosion = new Explosion(this, ship.x, ship.y);
    this.explosionSound.play();
    this.resetShipPosi(ship);
    this.score += 10;
    this.scoreLabel.text = "SCORE:" + String(this.score);
  }

  resetPlayer() {
    this.player.enableBody(
      true,
      config.width / 2 - 8,
      config.height - 64,
      true,
      true
    );
    this.player.alpha = 0.5;

    this.tween = this.tweens.add({
      targets: this.player,
      y: config.height - 64,
      ease: 'Power1',
      duration: 1500,
      repeat: 0,
      onComplete: () => {
        this.player.alpha = 1;
      },
      callbackScope: this
    })
  }
}
