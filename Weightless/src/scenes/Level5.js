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
        this.platform1 = new Wall(300,400,5,.5,{scene: this});
        this.physics.add.collider(this.platform1, this.player);

        this.platform2 = new Wall(50,230,1.5,.5,{scene: this});
        this.physics.add.collider(this.platform2, this.player);

        this.platform3 = new Wall(890,400,1.5,.5,{scene: this});
        this.physics.add.collider(this.platform3, this.player);

        this.platform4 = new Wall(640,230,5,.5,{scene: this});
        this.physics.add.collider(this.platform4, this.player);

        this.box1 = new StableBox(400,480,0.75,0.75,1,{scene:this});
        this.physics.add.collider(this.box1, this.player);
        
        this.box2 = new StableBox(500,320,0.75,0.75,1,{scene:this});
        this.physics.add.collider(this.box2, this.player);
        this.physics.add.collider(this.box2, this.platform1);
        this.physics.add.collider(this.box2, this.platform2);

        this.end = new LevelEnd(860,120,{scene:this});
        this.physics.add.collider(this.end,this.player,() => {
            this.scene.start("EndScene");
        });

        // Instructions
        const start_msg1 = this.add.bitmapText(
            100,
            this.scale.height / 2 + 130,
            "pixelfont",
            "BOXES ARE PUSHABLE",
            24
        ).setOrigin(0.1, 0.5);
    }

    update() {
        this.player.update();
        this.box1.update();
        this.box2.update();

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