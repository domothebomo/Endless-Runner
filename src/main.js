let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    scene: [ Title, Play ]
}

let game = new Phaser.Game(config);
