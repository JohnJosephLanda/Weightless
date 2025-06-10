import { Scene } from "phaser";
import { Player } from "../gameobjects/Player";

export class Level1 extends Scene {
    player = null;
    cursors = null;
    background = null;

    // waiting after gravity flip
    waitingAfterFlip = 0;

    constructor() {
        super("Level1");
    }

    init() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.scene.launch("MenuScene");
    }

    create() {
        this.background = this.add.image(0, 0, "background").setDisplaySize(960,540).setOrigin(0,0);

        // Player
        this.player = new Player({ scene: this });

        // Cursor keys 
        this.cursors = this.input.keyboard.createCursorKeys();

        // This event comes from MenuScene
        this.game.events.on("start-game", () => {
            this.scene.stop("MenuScene");
            this.player.start();
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