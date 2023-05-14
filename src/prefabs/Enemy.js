class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, modifier) {
        let lanes = [365, 415, 470, 520, 570, 630];
        let randomLane = Phaser.Math.Between(0, 5);
        super(scene, 960, lanes[randomLane], 'enemy_idle');

        this.currentScene = scene;
        this.currentScene.add.existing(this);
        this.currentScene.physics.add.existing(this);
        this.moveSpeed = 300;
        this.lane = randomLane;
        this.laneY = lanes;
        this.anims.play('enemy_idle');
        this.setVelocity(-this.moveSpeed * modifier, 0);
        
    }

}