class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('background', './assets/starfield.png');
    }
  
    create() {
        //console.log('bruh');
        //this.scene.start('playScene');
        //this.text = this.add.text(game.config.width / 2, game.config.height / 2, 'PLAY', {});
        this.background = this.add.tileSprite(0, 0, 960, 640, 'background').setOrigin(0,0);
        //this.text = this.add.text(game.config.width / 2, game.config.height / 2, 'PLAY', {});
    }

    update() {
        this.background.tilePositionX += 10;
    }
  
  }