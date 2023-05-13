class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);

        this.currentScene = scene;
        this.currentScene.add.existing(this);
        this.currentScene.physics.add.existing(this);
        this.cursors = this.currentScene.input.keyboard.createCursorKeys();
        this.moveSpeed = 400;
        this.lane = 2;
        //this.originalY = y;
        this.moving = false;
        this.laneY = [365, 415, 470, 520, 570, 630];
        //this.laneY = [375, 415, 470, 520, 570, 630];
        this.setOrigin(0,1);
        
    }

    update() {
        //let playerDirection = new Phaser.Math.Vector2(0, 0);
        //if(this.cursors.left.isDown) {
        //    playerDirection.x = -1;
        //    this.setFlip(true, false);
        //}
        //if(this.cursors.right.isDown) {
        //    playerDirection.x = 1;
        //    this.resetFlip();
        //}
        //this.setVelocity(0, 0);
        if (!this.moving) {
            this.setVelocity(0, 0);
            if(this.cursors.up.isDown && this.lane != 0) {
                //playerDirection.y = -1;
                this.moving = true;
                this.direction = -1;
                //this.originalY = this.y;
                this.lane -= 1;
            }
            if(this.cursors.down.isDown && this.lane != 5) {
                //playerDirection.y = 1;
                this.moving = true;
                this.direction = 1;
                //this.originalY = this.y;
                this.lane += 1;
            }
        } else {
            //this.setVelocity(0, this.direction * this.moveSpeed);
            // Moving Up
            if (this.direction == -1 && this.y <= this.laneY[this.lane] + 10) {
                this.moving = false;
                this.setVelocity(0, 0);
            // Moving Down
            } else if (this.direction == 1 && this.y >= this.laneY[this.lane] - 10) {
                this.moving = false;
                this.setVelocity(0, 0);
            } else {
                this.setVelocity(0, this.direction * this.moveSpeed);
            }
        }
        
        //if (playerDirection.x != 0 || playerDirection.y != 0) {
            //this.player.anims.play('walk', true);
            //if (this.walking === false) {
            //    this.footsteps.play();
            //    this.walking = true;
            //}
        //} else {
        //    this.player.anims.play('idle', true);
        //    this.footsteps.stop();
        //    this.walking = false;
        //}
        //playerDirection.normalize();

        //this.setVelocity(playerDirection.x * this.moveSpeed, playerDirection.y * this.moveSpeed);
    }
}