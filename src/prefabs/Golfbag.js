class GolfBag extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        let lanes = [365, 415, 470, 520, 570, 630];
        let randomLane = Phaser.Math.Between(0, 5);
        super(scene, 960, lanes[randomLane], 'golfbag');

        // PARAMETERS
        this.currentScene = scene;

        // ADD ENEMY TO SCENE
        this.currentScene.add.existing(this);
        this.currentScene.physics.add.existing(this);

        // ATTRIBUTES
        this.moveSpeed = 200;
        this.lane = randomLane;
        this.laneY = lanes;

        // CONFIG
        this.setVelocity(-this.moveSpeed, 0);
        
    }

}