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
    this.ship1.scale = 2;

    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
    this.ship2.scale = 2;

    this.ship3 = this.add.sprite(
      config.width / 2 + 50,
      config.width / 2,
      "ship3"
    );
    this.ship3.scale = 2;

    this.planet1 = this.add.sprite(
      config.width / 2 + 50,
      config.width / 2,
      "planet1"
    );

    this.planet2 = this.add.sprite(
      config.width / 2 + 50,
      config.width / 2,
      "planet2"
    );

    this.planet3 = this.add.sprite(
      config.width / 2 + 50,
      config.width / 2,
      "planet3"
    );

    this.planet4 = this.add.sprite(
      config.width / 2 + 50,
      config.width / 2,
      "planet4"
    );

    this.beamSound = this.sound.add("beamAudio");
    this.explosionSound = this.sound.add("explosionAudio");
    this.pickupSound = this.sound.add("pickupAudio");
    console.log(this.pickupSound);

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);
    this.enemies.add(this.planet1);
    this.enemies.add(this.planet2);
    this.enemies.add(this.planet3);
    this.enemies.add(this.planet4);
    
    this.score = 0;
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE:", 20);
    

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
      this.enemies,
      this.hurtPlayer,
      null,
      this
    );
    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      this.killEnemy,
      null,
      this
    );
  }

  update() {
    this.moveEnemy(this.ship1, Math.random() * 5);
    this.moveEnemy(this.ship2, Math.random() * 5);
    this.moveEnemy(this.ship3, Math.random() * 5);
    this.moveEnemy(this.planet1, Math.random() * 5);
    this.moveEnemy(this.planet2, Math.random() * 5);
    this.moveEnemy(this.planet3, Math.random() * 5);
    this.moveEnemy(this.planet4, Math.random() * 5);

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

    this.setScore(this.score);
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

  moveEnemy(enemy, speed) {
    enemy.y += speed;
    if (enemy.y > config.height) {
      enemy.y = 0;
      this.score -= 10;
      this.resetEnemyPosi(enemy);
    }
  }

  resetEnemyPosi(enemy) {
    enemy.x = Phaser.Math.Between(0, config.width);
    enemy.y = -100;
  }

  shootBeam() {
    let beam = new Beam(this);
    this.beamSound.play();
  }

  removePowerUps(player, powerUp) {
    powerUp.disableBody(true, true);
  }

  hurtPlayer(player, enemy) {
    this.resetEnemyPosi(enemy);

    if (player.alpha < 1) {
      return;
    }
    if(this.score>100){
      this.score -=100;
    }else{
      this.score = 0;
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
  killEnemy(projectile, enemy) {
    projectile.destroy();
    let explosion = new Explosion(this, enemy.x, enemy.y);
    this.explosionSound.play();
    this.resetEnemyPosi(enemy);
    this.score += 10;
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
      ease: "Power1",
      duration: 1500,
      repeat: 0,
      onComplete: () => {
        this.player.alpha = 1;
      },
      callbackScope: this,
    });
  }

  setScore(score){
    this.scoreLabel.text = "SCORE:" + String(score);
  }

}
