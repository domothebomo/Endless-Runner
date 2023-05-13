class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);

        this.currentScene = scene;
        this.currentScene.add.existing(this);
        this.currentScene.physics.add.existing(this);
        this.cursors = this.currentScene.input.keyboard.createCursorKeys();
        this.moveSpeed = 200;
        
    }

    update() {
        let playerDirection = new Phaser.Math.Vector2(0, 0);
        //if(this.cursors.left.isDown) {
        //    playerDirection.x = -1;
        //    this.setFlip(true, false);
        //}
        //if(this.cursors.right.isDown) {
        //    playerDirection.x = 1;
        //    this.resetFlip();
        //}
        if(this.cursors.up.isDown) {
            playerDirection.y = -1;
        }
        if(this.cursors.down.isDown) {
            playerDirection.y = 1;
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
        this.setVelocity(playerDirection.x * this.moveSpeed, playerDirection.y * this.moveSpeed);
    }
}