import { Scene } from "phaser";
import { Player } from "../gameobjects/Player";
import { Wall } from "../gameobjects/Wall";
import { Box } from "../gameobjects/Box";
import { LevelEnd } from "../gameobjects/LevelEnd";

export class Level2 extends Scene {
    player = null;
    cursors = null;
    background = null;

    // waiting after gravity flip
    waitingAfterFlip = 0;

    constructor() {
        super("Level2");
    }

    init() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {
        this.background = this.add.image(0, 0, "background").setDisplaySize(960,540).setOrigin(0,0);

        // Player
        this.player = new Player({ scene: this });

        // Cursor keys 
        this.cursors = this.input.keyboard.createCursorKeys();

        // For the end of the level
        this.game.events.on("level-end", () => {
            // this.scene.start("Level3")
        });
    }

    update() {
        this.player.update();

        if (this.waitingAfterFlip > 0) {
            this.waitingAfterFlip--;
        }

        // Player movement entries
        if (this.cursors.right.isDown) {
            this.player.move("right");
        }
        if (this.cursors.left.isDown) {
            this.player.move("left");
        }
        if (this.waitingAfterFlip == 0 && this.cursors.down.isDown) {
            this.player.gravityChange();
            this.waitingAfterFlip = 70;
        }
    }
}