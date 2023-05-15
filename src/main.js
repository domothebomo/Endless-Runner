/**
 * Dominic Fanaris
 * Title: NIGHT RIDER
 * Hours Spent: ~30 hours
 * Creative Tilt:
 * - Technical: Something technically interesting that took me some time and outside research to implement was the tooltip dialogue. When
 *              tooltips are enabled, special dialogue plays during the game to inform the player on controls. The technical investment
 *              for this feature comes from the dialogue boxes, for which I used tweens to animate them opening and closing, and the dialogue
 *              text, for which I implemented code that allows the text to incrementally appear letter-by-letter, to visually mimic speaking.
 *
 * - Visual: I am particularly proud of the art and animations I created for this project. Both the player and enemies
 *           have unique animations when idle, when attacking, and when being hit. The player even has alternate animations
 *           depending on whether or not they are holding a Golf Club, an item that can be picked up during the game.
 * 
 */

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
