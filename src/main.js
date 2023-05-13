let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    scene: [ Title, Play ]
}

let game = new Phaser.Game(config);
