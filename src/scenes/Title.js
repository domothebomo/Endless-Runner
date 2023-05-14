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
      game.config.maxEnemies = 4;
      this.scene.start('playScene');
    });

    // HARD MODE BUTTON
    this.hardButton = this.add.sprite(game.config.width / 2 + 69, game.config.height / 2, 'button');
    this.hardButtonText = this.add.text(this.hardButton.x, this.hardButton.y, 'HARD', {color: '#000000'}).setOrigin(0.5, 0.5);
    this.hardButton.setInteractive({
      useHandCursor: true
    });
    this.hardButton.on('pointerdown', () => {
      game.config.startSpeed = 3;
      game.config.increment = 0.0;
      game.config.maxEnemies = 6;
      this.scene.start('playScene');
    });

    // TUTORIAL BUTTON
    this.tutorialButton = this.add.sprite(game.config.width / 2, game.config.height / 2 + 58, 'button').setScale(2.1, 1);
    this.tutorialButtonText = this.add.text(this.tutorialButton.x, this.tutorialButton.y, 'HOW TO PLAY', {color: '#000000'}).setOrigin(0.5, 0.5);
    this.tutorialButton.setInteractive({
      useHandCursor: true
    });
    this.tutorialButton.on('pointerdown', () => {

    });

    this.creditsText = this.add.text(game.config.width / 2, game.config.height / 2 + 116, 'created by Dominic Fanaris\nMusic: Sunset Rider - FASSounds', {}).setOrigin(0.5,0.5);

  }

  button() {

  }

}