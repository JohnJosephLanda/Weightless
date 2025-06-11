import { Game } from "phaser";
import { Preloader } from "./preloader";
import { Level1 } from "./scenes/Level1";
import { Level2 } from "./scenes/Level2";
import { Level3 } from "./scenes/Level3";
import { Level4 } from "./scenes/Level4";
import { MenuScene } from "./scenes/MenuScene";
import { EndScene } from "./scenes/EndScene";

// More information about config: https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    width: 960,
    height: 540,
    backgroundColor: "#1c172e",
    pixelArt: true,
    roundPixel: false,
    max: {
        width: 800,
        height: 600,
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [
        Preloader,
        Level1,
        Level2,
        Level3,
        Level4,
        MenuScene,
        EndScene
    ]
};

new Game(config);