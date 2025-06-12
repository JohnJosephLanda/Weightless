import { GameObjects, Physics } from "phaser";

export class StableBox extends Physics.Arcade.Image {
    constructor(x, y, scaleX, scaleY, gravityDir, {scene}) {
        super(scene, x, y, "stablebox");

        this.scene = scene;
        this.setScale(scaleX,scaleY);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true, 0, 0);
        this.setGravityY(gravityDir*20);
        this.setMaxVelocity(100);
    }

    update() {
        this.setVelocityX(0);
    }
}

export class FlippingBox extends Physics.Arcade.Image {
    gravityDir = 60;

    constructor(x, y, scaleX, scaleY, {scene}) {
        super(scene, x, y, "flippingbox");

        this.scene = scene;
        this.setScale(scaleX,scaleY);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true, 0, 0);
        this.setGravityY(this.gravityDir);
        this.setMaxVelocity(100);
    }

    update() {
        this.setVelocityX(0);
    }

    gravityChange() {
        this.setVelocityY(this.gravityDir/2);
        this.gravityDir = this.gravityDir*-1;
        this.setGravityY(this.gravityDir);
    }
}