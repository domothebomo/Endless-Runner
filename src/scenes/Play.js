class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.audio('music', './assets/sunset-rider.mp3');
        this.load.audio('explosion', './assets/explosion.wav');
        this.load.audio('pickup', './assets/pickupclub.wav')
        this.load.audio('swing', './assets/swing.wav');

        this.load.image('highway', './assets/highway.png');
        this.load.image('skyline', './assets/skyline.png');
        this.load.image('player', './assets/cyclist3.png');
        this.load.image('golfbag', './assets/golfbag.png');

        this.load.spritesheet('player_idle', './assets/cyclist_idle2.png', {frameWidth: 64, frameHeight: 48, startFrame: 0, endFrame: 1});
        this.load.spritesheet('player_crash', './assets/cyclist_crash.png', {frameWidth: 80, frameHeight: 64, startFrame: 0, endFrame: 7});
        this.load.spritesheet('player_idleclub', './assets/cyclist_idleclub.png', {frameWidth: 64, frameHeight: 48, startFrame: 0, endFrame: 1});

        this.load.spritesheet('enemy_idle', './assets/grunt_idle2.png', {frameWidth: 64, frameHeight: 48, startFrame: 0, endFrame: 1});
        this.load.spritesheet('enemy_slice', './assets/grunt_slice.png', {frameWidth: 64, frameHeight: 48, startFrame: 0, endFrame: 2});
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
        if (!this.anims.exists('player_crash')) {
            this.anims.create({
                key: 'player_crash',
                frames: this.anims.generateFrameNumbers('player_crash', {start: 0, end: 7, first: 0}),
                frameRate: 10,
                repeat: 0
            });
        }
        if (!this.anims.exists('player_idleclub')) {
            this.anims.create({
                key: 'player_idleclub',
                frames: this.anims.generateFrameNumbers('player_idleclub', {start: 0, end: 1, first: 0}),
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
        if (!this.anims.exists('enemy_slice')) {
            this.anims.create({
                key: 'enemy_slice',
                frames: this.anims.generateFrameNumbers('enemy_slice', {start: 0, end: 2, first: 0}),
                frameRate: 10,
                repeat: 0
            });
        }
        

        this.explosion = this.sound.add("explosion", {
            volume: 0.5
        });

        this.pickup = this.sound.add("pickup", {
            volume: 0.5
        });

        this.swing = this.sound.add("swing", {
            volume: 0.5
        })

        this.music = this.sound.add("music", {
            volume: 0.1,
            loop: true
        });
        this.music.play();

        // CONTROLS
        //keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // PLAYER
        this.player = new Player(this, 30, 470, 'player').setOrigin(0,1);

        // ENEMIES
        this.enemies = [];
        //this.enemyCount = 1;
        //for (let i = 0; i < 3; i++) {
        //this.enemies.push(new Enemy(this, game.config.startSpeed).setOrigin(0,1));
        this.enemyCount = 0;
        this.enemySpeedMod = game.config.startSpeed;
        //this.enemies.push(new Enemy(this).setOrigin(0,1));
        //}
        //this.enemy = new Enemy(this, game.config.startSpeed).setOrigin(0,1);

        // TIMER
        //this.timeCount
        this.level = 0;
        this.timer = this.time.addEvent({delay: 5000, callback: this.newTimer, callbackScope: this, repeat: -1});
        //this.level = 0;
        //this.timer.addEvent()

        this.timeDisplay = this.add.text(50, 50, '0', {});

        this.gamePaused = false;
    }

    update() {

        if (this.gamePaused) {
            if (Phaser.Input.Keyboard.JustDown(keyESC)) {
                this.unpause();
            }
        }

        if (!this.player.crashed && !this.gamePaused) {

            if (Phaser.Input.Keyboard.JustDown(keyESC)) {
                this.pause();
                return;
            }

            this.timeDisplay.text = Math.floor((this.timer.elapsed + 5000 * this.level) / 1000);

            // UPDATE BACKGROUND
            this.highway.tilePositionX += 6 * this.enemySpeedMod;
            this.background.tilePositionX += 1 * this.enemySpeedMod;

            // UPDATE PLAYER
            this.player.update();

            // UPDATE GOLFBAG
            if (this.golfBag) {
                this.golfBag.update();
                if (this.player.lane == this.golfBag.lane) {
                    this.physics.world.overlap(this.player, this.golfBag, () => {
                        this.golfBag.destroy();
                        this.pickup.play();
                        this.player.clubDurability = 3;
                    }, null, this);
                }
            }

            // UPDATE ENEMIES
            for (let i = 0; i < this.enemyCount; i++) {
                this.enemies[i].update();

                // CHECK COLLISIONS
                if (this.player.lane == this.enemies[i].lane) {
                    this.physics.world.overlap(this.player, this.enemies[i], () => {this.crash(this.enemies[i])}, null, this);
                }
            }
        }
    }

    newTimer() {
        //console.log('yo');
        this.level += 1;
        if (this.level % 2 == 0) {
            this.golfBag = new GolfBag(this).setOrigin(0,1);
        }

        if (this.enemySpeedMod < 3) {
            this.enemySpeedMod += game.config.increment;
        }
        if (this.enemyCount < game.config.maxEnemies) {
            this.enemies.push(new Enemy(this, game.config.startSpeed).setOrigin(0,1));
            this.enemyCount += 1;
        }
        //console.log(this.level);
        //this.timer = this.time.addEvent({delay: 5000, callback: this.newTimer});
    }

    crash(enemy) {
        this.music.stop();

        enemy.anims.play('enemy_slice');

        this.player.crashed = true;
        this.player.setVelocityY(0);
        this.player.anims.play('player_crash');
        this.explosion.play();

        if (this.golfBag) {
            this.golfBag.setVelocity(0,0);
        }
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
            //this.music.stop();
            this.scene.restart();
        });

        // QUIT BUTTON
        this.quitButton = this.add.sprite(game.config.width / 2, game.config.height / 2 + 58, 'button');
        this.quitButtonText = this.add.text(this.quitButton.x, this.quitButton.y, 'QUIT', {color: '#000000'}).setOrigin(0.5, 0.5);
        this.quitButton.setInteractive({
        useHandCursor: true
        });
        this.quitButton.on('pointerdown', () => {
            //this.music.stop();
            this.scene.start('titleScene');
        });
    }

    pause() {
        this.gamePaused = true;
        this.timer.paused = true;
        this.music.pause();

        for (let i = 0; i < this.enemyCount; i++) {
            this.enemies[i].setVelocity(0,0);
        }

        // RESUME BUTTON
        this.resumeButton = this.add.sprite(game.config.width / 2, game.config.height / 2 - 58, 'button');
        this.resumeButtonText = this.add.text(this.resumeButton.x, this.resumeButton.y, 'RESUME', {color: '#000000'}).setOrigin(0.5, 0.5);
        this.resumeButton.setInteractive({
            useHandCursor: true
        });
        this.resumeButton.on('pointerdown', () => {
            this.unpause();
        });

        // QUIT & RESTART BUTTONS
        this.navButtons();
    }

    unpause() {
        this.gamePaused = false;
        this.timer.paused = false;
        this.music.resume();

        this.resumeButton.destroy();
        this.resumeButtonText.destroy();

        this.restartButton.destroy();
        this.restartButtonText.destroy();

        this.quitButton.destroy();
        this.quitButtonText.destroy();
    }
  
  }