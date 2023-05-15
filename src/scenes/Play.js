class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {

        // AUDIO
        this.load.audio('music', './assets/sunset-rider.mp3');
        this.load.audio('explosion', './assets/explosion.wav');
        this.load.audio('pickup', './assets/pickupclub.wav')
        this.load.audio('swing', './assets/swing.wav');
        this.load.audio('bonk', './assets/bonk.wav');
        this.load.audio('break', './assets/break.wav');

        // IMAGES
        this.load.image('highway', './assets/highway.png');
        this.load.image('skyline', './assets/skyline.png');
        this.load.image('player', './assets/cyclist3.png');
        this.load.image('golfbag', './assets/golfbag.png');

        // ATLASES
        this.load.atlas('player_atlas', './assets/sprites/cyclist_atlas.png', './assets/sprites/cyclist_atlas.json');
        this.load.atlas('grunt_atlas', './assets/sprites/grunt_atlas.png', './assets/sprites/grunt_atlas.json');

        // SPRITESHEETS
        this.load.spritesheet('swish', './assets/swish.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 3});
    }
  
    create() {
        
        // BACKGROUND SPRITES
        this.background = this.add.tileSprite(0, 0, 960, 640, 'skyline').setOrigin(0,0);
        this.highway = this.add.tileSprite(0, 0, 960, 640, 'highway').setOrigin(0,0);

        // ANIMATIONS
        {
            // PLAYER IDLE
            if (!this.anims.exists('player_idle')) {
                this.anims.create({
                    key: 'player_idle',
                    frames: this.anims.generateFrameNames('player_atlas', {prefix: 'cyclist_idle', start: 1, end: 2}),
                    frameRate: 10,
                    repeat: -1
                });
            }
            // PLAYER CRASH
            if (!this.anims.exists('player_crash')) {
                this.anims.create({
                    key: 'player_crash',
                    frames: this.anims.generateFrameNames('player_atlas', {prefix: 'cyclist_crash', start: 1, end: 8}),
                    frameRate: 10,
                    repeat: 0
                });
            }
            // PLAYER IDLE WITH CLUB
            if (!this.anims.exists('player_idleclub')) {
                this.anims.create({
                    key: 'player_idleclub',
                    frames: this.anims.generateFrameNames('player_atlas', {prefix: 'cyclist_club', start: 1, end: 2}),
                    frameRate: 10,
                    repeat: -1
                });
            }
            // PLAYER SWING
            if (!this.anims.exists('player_clubswing')) {
                this.anims.create({
                    key: 'player_clubswing',
                    frames: this.anims.generateFrameNames('player_atlas', {prefix: 'cyclist_swing', start: 1, end: 4}),
                    frameRate: 15,
                    repeat: 0
                });
            }

            // ENEMY IDLE
            if (!this.anims.exists('enemy_idle')) {
                this.anims.create({
                    key: 'enemy_idle',
                    frames: this.anims.generateFrameNames('grunt_atlas', {prefix: 'grunt_idle', start: 1, end: 2}),
                    frameRate: 10,
                    repeat: -1
                });
            }
            // ENEMY SLICE
            if (!this.anims.exists('enemy_slice')) {
                this.anims.create({
                    key: 'enemy_slice',
                    frames: this.anims.generateFrameNames('grunt_atlas', {prefix: 'grunt_slice', start: 1, end: 3}),
                    frameRate: 10,
                    repeat: 0
                });
            }
            // ENEMY KNOCKOUT
            if (!this.anims.exists('enemy_knockout')) {
                this.anims.create({
                    key: 'enemy_knockout',
                    frames: this.anims.generateFrameNames('grunt_atlas', {prefix: 'grunt_knockout', start: 1, end: 3}),
                    frameRate: 10,
                    repeat: 0
                });
            }

            // SWISH
            if (!this.anims.exists('swish')) {
                this.anims.create({
                    key: 'swish',
                    frames: this.anims.generateFrameNumbers('swish', {start: 0, end: 3, first: 0}),
                    frameRate: 15,
                    repeat: 0
                });
            }
        }
        
        // AUDIO
        {
            this.explosion = this.sound.add("explosion", {
                volume: 0.5
            });

            this.pickup = this.sound.add("pickup", {
                volume: 0.5
            });

            this.swing = this.sound.add("swing", {
                volume: 0.5
            })

            this.bonk = this.sound.add("bonk", {
                volume: 0.5
            })

            this.break = this.sound.add("break", {
                volume: 0.5
            })

            this.music = this.sound.add("music", {
                volume: 0.1,
                loop: true
            });
            this.music.play();
        }

        // CONTROLS
        //keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // PLAYER
        //this.player = new Player(this, 30, 470, 'player').setOrigin(0,1);
        this.player = new Player(this, 100, 470, 'player').setOrigin(0,1);

        this.golfBag = null;

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

        this.add.rectangle(20, 20, game.config.width - 600, 30, 0xbbbbbb).setOrigin(0,0);

        this.UIConfig = {
            color: '#000000',
            fontFamily: 'Verdana',
            fontSize: '15px',
            align: 'center'
        };

        this.timeDisplay = this.add.text(50, 25, 'TIME: 0:00:00', this.UIConfig);

        let timeElapsed = highestTime;
        let timeSeconds = timeElapsed % 60;
            if (timeSeconds < 10) {
                timeSeconds = '0'+timeSeconds;
            }
        let timeMinutes = Math.floor((timeElapsed / 60)) % 60;
            if (timeMinutes < 10) {
                timeMinutes = '0'+timeMinutes;
            }
        let timeHours = Math.floor((timeElapsed / 60) / 60);
            if (timeHours < 10) {
                timeHours = '0'+timeHours;
            }
        this.bestTimeDisplay = this.add.text(200, 25, 'RECORD: '+timeHours+':'+timeMinutes+':'+timeSeconds, this.UIConfig);

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

            let timeElapsed = Math.floor((this.timer.elapsed + 5000 * this.level) / 1000);
            let timeSeconds = timeElapsed % 60;
            if (timeSeconds < 10) {
                timeSeconds = '0'+timeSeconds;
            }
            let timeMinutes = Math.floor((timeElapsed / 60)) % 60;
            if (timeMinutes < 10) {
                timeMinutes = '0'+timeMinutes;
            }
            let timeHours = Math.floor((timeElapsed / 60) / 60);
            if (timeHours < 10) {
                timeHours = '0'+timeHours;
            }
            //this.timeDisplay.text = Math.floor((this.timer.elapsed + 5000 * this.level) / 1000);
            this.timeDisplay.text = 'TIME: '+timeHours+':'+timeMinutes+':'+timeSeconds;
            if (timeElapsed > highestTime) {
                highestTime = timeElapsed;
                this.bestTimeDisplay.text = 'RECORD: '+timeHours+':'+timeMinutes+':'+timeSeconds;
            }

            // UPDATE BACKGROUND
            this.highway.tilePositionX += 6 * this.enemySpeedMod;
            this.background.tilePositionX += 1 * this.enemySpeedMod;

            // UPDATE PLAYER
            this.player.update();

            // UPDATE GOLFBAG
            if (this.golfBag) {
                if (this.golfBag.x < 0 - this.golfBag.width) {
                     this.golfBag.destroy();
                     this.golfBag = null;
                } else if (this.player.lane == this.golfBag.lane) {
                    this.physics.world.overlap(this.player, this.golfBag, () => {
                        this.golfBag.destroy();
                        this.golfBag = null;
                        this.pickup.play();
                        this.player.clubDurability = 3;
                    }, null, this);
                }
            }

            // UPDATE ENEMIES
            for (let i = 0; i < this.enemyCount; i++) {
                if (!this.enemies[i].crashed) {
                    this.enemies[i].update();

                    // CHECK COLLISIONS
                    if (this.player.lane == this.enemies[i].lane) {
                        this.physics.world.overlap(this.player, this.enemies[i], () => {this.crash(this.enemies[i])}, null, this);
                    }
                }
            }
        }
    }

    newTimer() {
        //console.log('yo');
        this.level += 1;
        if (this.level % 3 == 0) {
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
        this.restartButtonText = this.add.text(this.restartButton.x, this.restartButton.y, 'RESTART', this.UIConfig).setOrigin(0.5, 0.5);
        this.restartButton.setInteractive({
        useHandCursor: true
        });
        this.restartButton.on('pointerdown', () => {
            //this.music.stop();
            this.scene.restart();
        });

        // QUIT BUTTON
        this.quitButton = this.add.sprite(game.config.width / 2, game.config.height / 2 + 58, 'button');
        this.quitButtonText = this.add.text(this.quitButton.x, this.quitButton.y, 'QUIT', this.UIConfig).setOrigin(0.5, 0.5);
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

        this.player.setVelocity(0,0);
        if (this.golfBag) {
            this.golfBag.setVelocity(0,0);
        }
        for (let i = 0; i < this.enemyCount; i++) {
            this.enemies[i].setVelocity(0,0);
        }

        // RESUME BUTTON
        this.resumeButton = this.add.sprite(game.config.width / 2, game.config.height / 2 - 58, 'button');
        this.resumeButtonText = this.add.text(this.resumeButton.x, this.resumeButton.y, 'RESUME', this.UIConfig).setOrigin(0.5, 0.5);
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

        if (this.golfBag) {
            this.golfBag.setVelocity(-this.golfBag.moveSpeed, 0);
        }
    }
  
  }