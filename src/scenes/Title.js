class Title extends Phaser.Scene {
  constructor() {
      super('titleScene');
  }

  create() {
    this.scene.start('playScene');
  }

}