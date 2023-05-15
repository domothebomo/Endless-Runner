let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    physics: {
        default: 'arcade'
    },
    scene: [ Title, Play ]
}

let game = new Phaser.Game(config);
let keySPACE, keyESC;
let highestTime = 0;
let tutorial = false;
