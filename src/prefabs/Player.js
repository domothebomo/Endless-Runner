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
        this.moving = false;
        this.crashed = false;
        this.clubDurability = 0;
        this.swinging = false;
        this.laneY = [365, 415, 470, 520, 570, 630];
        this.anims.play('player_idle');
        
    }

    update() {

        // IF WIELDING A CLUB
        if (this.clubDurability > 0) {
            if (!this.swinging) {
                this.anims.play('player_idleclub', true);
            } else {
                // When swinging, swish sprite follows player and hits enemies
                this.swish.y = this.y;
                for (let i = 0; i < this.currentScene.enemyCount; i++) {
                    this.currentScene.physics.world.overlap(this.swish, this.currentScene.enemies[i], () => {this.hit(this.currentScene.enemies[i])}, null, this);
                }
            }
            // SWING YOUR WEAPON
            if (!this.swinging && Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.swinging = true;
                this.currentScene.swing.play();

                if (this.swish) {
                    this.swish.destroy();
                }
                this.swish = this.currentScene.physics.add.sprite(this.x + this.width, this.y - 5, 'swish').setOrigin(0,1);
                this.swish.anims.play('swish');

                this.anims.play('player_clubswing');
                this.currentScene.time.delayedCall(400, () => {
                    this.swinging=false;
                    this.swish.destroy();
                }, null, this);

            }
        } else {
            if (this.swish) {
                this.swish.destroy();
            }
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

    hit(enemy) {
        if (!enemy.crashed) {
            this.clubDurability -= 1;
            if (this.clubDurability > 0) {
                this.currentScene.bonk.play();
            } else {
                this.currentScene.break.play();
            }
            
            enemy.crashed = true;
            enemy.setVelocity(-150, 0);
            enemy.anims.play('enemy_knockout');
            this.currentScene.time.delayedCall(3000, () => {
                enemy.reset();
            }, null, this);
        }
    }
}