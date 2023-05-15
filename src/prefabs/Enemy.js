class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        let lanes = [365, 415, 470, 520, 570, 630];
        let randomLane = Phaser.Math.Between(0, 5);
        super(scene, 960, lanes[randomLane], 'enemy_idle');

        // PARAMETERS
        this.currentScene = scene;
        this.modifier = this.currentScene.enemySpeedMod;

        // ADD ENEMY TO SCENE
        this.currentScene.add.existing(this);
        this.currentScene.physics.add.existing(this);

        // ATTRIBUTES
        //this.moveSpeed = 300;
        this.moveSpeed = Phaser.Math.Between(400, 500);
        this.lane = randomLane;
        this.laneY = lanes;
        this.crashed = false;

        // CONFIG
        this.anims.play('enemy_idle');
        this.setVelocity(-this.moveSpeed * this.modifier, 0);
        
    }

    update() {
        this.setVelocity(-this.moveSpeed * this.modifier, 0);

        // RESET ON REACHING END OF SCREEN
        if (this.x < 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.anims.play('enemy_idle');
        this.lane = Phaser.Math.Between(0, 5);
        this.y = this.laneY[this.lane];
        this.x = 960;
        this.crashed = false;
        //if (this.modifier >= 5.0) {
        //    this.modifier = 5.0;
        //} else {
        //    this.modifier += mod;
        //}
        this.modifier = this.currentScene.enemySpeedMod;
        //console.log(this.modifier);
        this.setVelocity(-this.moveSpeed * this.modifier, 0);
    }

}