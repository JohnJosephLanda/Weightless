import { GameObjects, Physics } from "phaser";

export class Wall extends Physics.Arcade.Image {
    constructor(x, y, scaleX, scaleY, {scene}) {
        super(scene, x, y, "wall");
        this.scene = scene;
        this.setScale(scaleX,scaleY);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
    }
}