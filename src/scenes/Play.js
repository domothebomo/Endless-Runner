class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('highway', './assets/highway.png');
        this.load.image('skyline', './assets/skyline.png');
        this.load.image('player', './assets/cyclist3.png');

        this.load.spritesheet('player_idle', './assets/cyclist_idle.png', {frameWidth: 64, frameHeight: 48, startFrame: 0, endFrame: 1});
        this.load.spritesheet('enemy_idle', './assets/grunt_idle.png', {frameWidth: 64, frameHeight: 48, startFrame: 0, endFrame: 1});
    }
  
    create() {
        
        // BACKGROUND SPRITES
        this.background = this.add.tileSprite(0, 0, 960, 640, 'skyline').setOrigin(0,0);
        this.highway = this.add.tileSprite(0, 0, 960, 640, 'highway').setOrigin(0,0);

        // ANIMATIONS
        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNumbers('player_idle', {start: 0, end: 1, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'enemy_idle',
            frames: this.anims.generateFrameNumbers('enemy_idle', {start: 0, end: 1, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        // PLAYER
        this.player = new Player(this, 30, 470, 'player').setOrigin(0,1);

        //this.enemy = this.physics.add.sprite(960, 470, 'enemy_idle', 0).setOrigin(0,1);
        //this.enemy.anims.play('enemy_idle');
        this.enemy = new Enemy(this, 1).setOrigin(0,1);
    }

    update() {
        // UPDATE BACKGROUND
        this.highway.tilePositionX += 10;
        this.background.tilePositionX += 1;

        // UPDATE PLAYER
        this.player.update();

        this.enemy.setVelocity(-300, 0);
    }
  
  }