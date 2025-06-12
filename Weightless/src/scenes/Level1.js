import { Scene } from "phaser";
import { Player } from "../gameobjects/Player";
import { Wall } from "../gameobjects/Wall";
import { LevelEnd } from "../gameobjects/LevelEnd";

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
        this.player = new Player(-190, 100, { scene: this });
        this.player.body.setCollideWorldBounds(true, 0, 0);

        // Cursor keys 
        this.cursors = this.input.keyboard.createCursorKeys();

        // This event comes from MenuScene
        this.game.events.on("start-game", () => {
            this.scene.stop("MenuScene");
            this.player.start(200);
        });

        // Creating what's in the level
        this.platform = new Wall(100,300,5,1,{scene: this});
        this.physics.add.collider(this.platform, this.player);

        this.end = new LevelEnd(100,460,{scene:this});
        this.physics.add.collider(this.end,this.player,() => {
            this.scene.start("Level2");
        });

        // Instructions
        const start_msg = this.add.bitmapText(
            100,
            this.scale.height / 2,
            "pixelfont",
            "ARROW KEYS TO MOVE",
            24
        ).setOrigin(0.1, 0.5);
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
        if (this.waitingAfterFlip == 0 &&  (this.cursors.down.isDown || this.cursors.up.isDown)) {
            this.player.gravityChange();
            this.waitingAfterFlip = 70;
        }
    }
}