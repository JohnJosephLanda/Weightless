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
        this.player = new Player(-190, 480, { scene: this });
        this.player.body.setCollideWorldBounds(true, 0, 0);
        this.player.start(100);

        // Cursor keys 
        this.cursors = this.input.keyboard.createCursorKeys();

        // Creating what's in the level
        this.platform = new Wall(400,400,2,3,{scene: this});
        this.physics.add.collider(this.platform, this.player);

        this.end = new LevelEnd(700,480,{scene:this});
        this.physics.add.collider(this.end,this.player,() => {
            this.scene.start("Level3");
        });

        // Instructions
        const start_msg1 = this.add.bitmapText(
            315,
            this.scale.height / 2 + 40,
            "pixelfont",
            "UP/DOWN TO",
            24
        ).setOrigin(0.1, 0.5);
        const start_msg2 = this.add.bitmapText(
            315,
            this.scale.height / 2 + 70,
            "pixelfont",
            "FLIP GRAVITY",
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
        if (this.waitingAfterFlip == 0 && (this.cursors.down.isDown || this.cursors.up.isDown)) {
            this.player.gravityChange();
            this.waitingAfterFlip = 70;
        }
    }
}