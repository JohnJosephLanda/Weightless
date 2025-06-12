import { GameObjects, Physics } from "phaser";

export class Box extends Physics.Arcade.Image {
    constructor(x, y, scaleX, scaleY, gravityDir, {scene}) {
        super(scene, x, y, "box");

        this.scene = scene;
        this.setScale(scaleX,scaleY);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true, 0, 0);
        this.setGravityY(gravityDir*20);
    }

    update() {
        this.setVelocityX(0);
    }
}