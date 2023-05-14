class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.audio('music', './assets/sunset-rider.mp3');

        this.load.image('highway', './assets/highway.png');
        this.load.image('skyline', './assets/skyline.png');
        this.load.image('player', './assets/cyclist3.png');

        this.load.spritesheet('player_idle', './assets/cyclist_idle2.png', {frameWidth: 64, frameHeight: 48, startFrame: 0, endFrame: 1});
        this.load.spritesheet('enemy_idle', './assets/grunt_idle2.png', {frameWidth: 64, frameHeight: 48, startFrame: 0, endFrame: 1});
    }
  
    create() {
        
        // BACKGROUND SPRITES
        this.background = this.add.tileSprite(0, 0, 960, 640, 'skyline').setOrigin(0,0);
        this.highway = this.add.tileSprite(0, 0, 960, 640, 'highway').setOrigin(0,0);

        // ANIMATIONS
        if (!this.anims.exists('player_idle')) {
            this.anims.create({
                key: 'player_idle',
                frames: this.anims.generateFrameNumbers('player_idle', {start: 0, end: 1, first: 0}),
                frameRate: 10,
                repeat: -1
            });
        }

        if (!this.anims.exists('enemy_idle')) {
            this.anims.create({
                key: 'enemy_idle',
                frames: this.anims.generateFrameNumbers('enemy_idle', {start: 0, end: 1, first: 0}),
                frameRate: 10,
                repeat: -1
            });
        }

        this.music = this.sound.add("music", {
            volume: 0.1,
            loop: true
        });
        this.music.play();

        // CONTROLS
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // PLAYER
        this.player = new Player(this, 30, 470, 'player').setOrigin(0,1);

        // ENEMIES
        this.enemies = [];
        //this.enemyCount = 1;
        //for (let i = 0; i < 3; i++) {
        //this.enemies.push(new Enemy(this, game.config.startSpeed).setOrigin(0,1));
        this.enemyCount = 1;
        this.enemySpeedMod = game.config.startSpeed;
        this.enemies.push(new Enemy(this).setOrigin(0,1));
        //}
        //this.enemy = new Enemy(this, game.config.startSpeed).setOrigin(0,1);

        // TIMER
        //this.timeCount
        this.level = 0;
        this.timer = this.time.addEvent({delay: 5000, callback: this.newTimer, callbackScope: this, repeat: -1});
        //this.level = 0;
        //this.timer.addEvent()

        this.timeDisplay = this.add.text(50, 50, '0', {});
    }

    update() {

        if (!this.player.crashed) {

            this.timeDisplay.text = Math.floor((this.timer.elapsed + 5000 * this.level) / 1000);

            // UPDATE BACKGROUND
            this.highway.tilePositionX += 6 * this.enemySpeedMod;
            this.background.tilePositionX += 1 * this.enemySpeedMod;

            // UPDATE PLAYER
            this.player.update();

            // UPDATE ENEMIES
            //this.enemy.update();

            // UPDATE ENEMIES
            for (let i = 0; i < this.enemyCount; i++) {
                this.enemies[i].update();

                // CHECK COLLISIONS
                if (this.player.lane == this.enemies[i].lane) {
                    this.physics.world.overlap(this.player, this.enemies[i], this.crash, null, this);
                }
            }
        }
    }

    newTimer() {
        //console.log('yo');
        this.level += 1;
        this.enemySpeedMod += game.config.increment;
        if (this.enemyCount < 3) {
            this.enemies.push(new Enemy(this, game.config.startSpeed).setOrigin(0,1));
            this.enemyCount += 1;
        }
        //console.log(this.level);
        //this.timer = this.time.addEvent({delay: 5000, callback: this.newTimer});
    }

    crash() {
        this.music.stop();
        this.player.crashed = true;
        this.player.setVelocityY(0);
        //console.log('bruh');
        this.timer.destroy();

        this.navButtons();


    }

    navButtons() {
        // RESTART BUTTON
        this.restartButton = this.add.sprite(game.config.width / 2, game.config.height / 2, 'button');
        this.restartButtonText = this.add.text(this.restartButton.x, this.restartButton.y, 'RESTART', {color: '#000000'}).setOrigin(0.5, 0.5);
        this.restartButton.setInteractive({
        useHandCursor: true
        });
        this.restartButton.on('pointerdown', () => {
        this.scene.restart();
        });

        // RESTART BUTTON
        this.quitButton = this.add.sprite(game.config.width / 2, game.config.height / 2 + 58, 'button');
        this.quitButtonText = this.add.text(this.quitButton.x, this.quitButton.y, 'QUIT', {color: '#000000'}).setOrigin(0.5, 0.5);
        this.quitButton.setInteractive({
        useHandCursor: true
        });
        this.quitButton.on('pointerdown', () => {
        this.scene.start('titleScene');
        });
    }
  
  }