class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);

        this.currentScene = scene;

        this.currentScene.add.existing(this);
        this.currentScene.physics.add.existing(this);

        this.cursors = this.currentScene.input.keyboard.createCursorKeys();
        keySPACE = this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.moveSpeed = 400;
        this.lane = 2;
        //this.originalY = y;
        this.moving = false;
        this.crashed = false;
        this.clubDurability = 0;
        this.laneY = [365, 415, 470, 520, 570, 630];
        //this.laneY = [375, 415, 470, 520, 570, 630];

        //this.setOrigin(0,1);
        this.anims.play('player_idle');
        
    }

    update() {

        if (this.clubDurability > 0) {
            this.anims.play('player_idleclub', true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.currentScene.swing.play();
            }
        } else {
            this.anims.play('player_idle', true);
        }

        if (!this.moving) {
            this.setVelocity(0, 0);
            if(this.cursors.up.isDown && this.lane != 0) {
                this.moving = true;
                this.direction = -1;
                this.lane -= 1;
            }
            if(this.cursors.down.isDown && this.lane != 5) {
                this.moving = true;
                this.direction = 1;
                this.lane += 1;
            }
        } else {
            // Reaching Higher Lane
            if (this.direction == -1 && this.y <= this.laneY[this.lane] + 10) {
                this.moving = false;
                this.setVelocity(0, 0);
            // Reaching Lower Lane
            } else if (this.direction == 1 && this.y >= this.laneY[this.lane] - 10) {
                this.moving = false;
                this.setVelocity(0, 0);
            } else {
                this.setVelocity(0, this.direction * this.moveSpeed);
            }
        }
        
    }
}