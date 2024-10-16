import * as Phaser from 'phaser';

export class Beam extends Phaser.GameObjects.Sprite{
  constructor(scene){
    let x = scene.player.x;
    let y = scene.player.y;

    super(scene, x, y, "beam");
    this.scale = 2;
    scene.add.existing(this);
    scene.projectiles.add(this);
    this.play("shoot");
    scene.physics.world.enableBody(this);
    this.body.velocity.y = - 400;
  }

  update(){
    if(this.y < 0){
      this.destroy();
      console.log("beam destroyed")
    }
  }
}