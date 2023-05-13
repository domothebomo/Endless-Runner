class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('highway', './assets/highway.png');
        this.load.image('skyline', './assets/skyline.png');
        this.load.image('player', './assets/cyclist2.png');
    }
  
    create() {
        //console.log('bruh');
        //this.scene.start('playScene');
        //this.text = this.add.text(game.config.width / 2, game.config.height / 2, 'PLAY', {});
        this.background = this.add.tileSprite(0, 0, 960, 640, 'skyline').setOrigin(0,0);
        this.highway = this.add.tileSprite(0, 0, 960, 640, 'highway').setOrigin(0,0);

        //this.text = this.add.text(game.config.width / 2, game.config.height / 2, 'PLAY', {});

        //this.player = this.add.sprite(50, 340, 'player');
        this.player = new Player(this, 50, 340, 'player');
    }

    update() {
        //this.highway.tilePositionX += 600 / game.loop.actualFps;
        //this.background.tilePositionX += 240 / game.loop.actualFps;
        this.highway.tilePositionX += 10;
        this.background.tilePositionX += 1;
        console.log(game.loop.actualFps);
        this.player.update();
    }
  
  }