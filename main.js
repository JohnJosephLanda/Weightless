import Phaser from 'phaser'

import TitleScreen from './scenes/TitleScreen'
import LevelSelect from './scenes/LevelSelect'

const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    backgroundColor: '#333333',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 200
            },
            debug: false
        }
    },

    scale: {
        mode: Phaser.Scale.RESIZE,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
}

const game = new Phaser.Game(config)

// "global" screens
game.scene.add('titlescreen',TitleScreen)
game.scene.add('levelselect',LevelSelect)

game.scene.start("titlescreen");