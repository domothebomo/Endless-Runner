class Title extends Phaser.Scene {
  constructor() {
      super('titleScene');
  }

  preload() {
    this.load.image('button', './assets/button.png');
  }

  create() {

    // NORMAL MODE BUTTON
    this.playButton = this.add.sprite(game.config.width / 2 - 69, game.config.height / 2, 'button');
    this.playButtonText = this.add.text(this.playButton.x, this.playButton.y, 'NORMAL', {color: '#000000'}).setOrigin(0.5, 0.5);
    this.playButton.setInteractive({
      useHandCursor: true
    });
    this.playButton.on('pointerdown', () => {
      game.config.startSpeed = 1;
      game.config.increment = 0.1;
      this.scene.start('playScene');
    });

    // HARD MODE BUTTON
    this.hardButton = this.add.sprite(game.config.width / 2 + 69, game.config.height / 2, 'button');
    this.hardButtonText = this.add.text(this.hardButton.x, this.hardButton.y, 'HARD', {color: '#000000'}).setOrigin(0.5, 0.5);
    this.hardButton.setInteractive({
      useHandCursor: true
    });
    this.hardButton.on('pointerdown', () => {
      game.config.startSpeed = 4;
      game.config.increment = 0.0;
      this.scene.start('playScene');
    });

    // PLAY BUTTON
    this.playButton = this.add.sprite(game.config.width / 2, game.config.height / 2 + 58, 'button').setScale(2.1, 1);
    this.playButtonText = this.add.text(this.playButton.x, this.playButton.y, 'PLAY', {color: '#000000'}).setOrigin(0.5, 0.5);
    this.playButton.setInteractive({
      useHandCursor: true
    });
    this.playButton.on('pointerdown', () => {
      game.config.startSpeed = 1;
      game.config.increment = 0.1;
      this.scene.start('playScene');
    });

    // PLAY BUTTON
    this.playButton = this.add.sprite(game.config.width / 2, game.config.height / 2 + 116, 'button').setScale(2.1, 1);
    this.playButtonText = this.add.text(this.playButton.x, this.playButton.y, 'PLAY', {color: '#000000'}).setOrigin(0.5, 0.5);
    this.playButton.setInteractive({
      useHandCursor: true
    });
    this.playButton.on('pointerdown', () => {
      game.config.startSpeed = 1;
      game.config.increment = 0.1;
      this.scene.start('playScene');
    });

  }

  button() {

  }

}