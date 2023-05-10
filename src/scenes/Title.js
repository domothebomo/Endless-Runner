class Title extends Phaser.Scene {
  constructor() {
      super('titleScene');
  }

  preload() {
    this.load.image('button', './assets/bullet.png');
  }

  create() {

    // PLAY BUTTON
    this.playButton = this.add.sprite(game.config.width / 2, game.config.height / 2, 'button').setScale(10, 5);
    this.playButtonText = this.add.text(this.playButton.x, this.playButton.y, 'PLAY', {color: '#000000'}).setOrigin(0.5, 0.5);
    this.playButton.setInteractive({
      useHandCursor: true
    });
    this.playButton.on('pointerdown', () => {
      this.scene.start('playScene');
    });

  }

  button() {

  }

}