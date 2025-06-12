import { Scene } from "phaser";
import { Player } from "../gameobjects/Player";
import { Wall } from "../gameobjects/Wall";
import { StableBox, FlippingBox } from "../gameobjects/Box";
import { LevelEnd } from "../gameobjects/LevelEnd";

export class Level5 extends Scene {
    player = null;
    cursors = null;
    background = null;

    // waiting after gravity flip
    waitingAfterFlip = 0;

    constructor() {
        super("Level5");
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
        this.platform1 = new Wall(800,80,3,2,{scene: this});
        this.physics.add.collider(this.platform1, this.player);

        this.platform2 = new Wall(800,480,3,2,{scene: this});
        this.physics.add.collider(this.platform2, this.player);

        this.stablebox = new StableBox(200,40,1.5,1.5,-1,{scene:this});
        this.physics.add.collider(this.stablebox, this.player);
        this.physics.add.collider(this.platform1, this.player);
        
        this.flippingbox = new FlippingBox(250,480,1.5,1.5,{scene:this});
        this.physics.add.collider(this.flippingbox, this.player);
        this.physics.add.collider(this.flippingbox, this.platform1);
        this.physics.add.collider(this.flippingbox, this.platform2);
        this.physics.add.collider(this.flippingbox, this.stablebox);

        this.end = new LevelEnd(860,300,{scene:this});
        this.physics.add.collider(this.end,this.player,() => {
            this.scene.start("EndScene");
        });
    }

    update() {
        this.player.update();
        this.stablebox.update();
        this.flippingbox.update();

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
            this.flippingbox.gravityChange();
            this.waitingAfterFlip = 70;
        }
    }
}