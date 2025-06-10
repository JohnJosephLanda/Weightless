import { GameObjects, Physics } from "phaser";

export class Box extends Physics.Arcade.Image {
    constructor(x, y, num, {scene}) {
        super(scene, x, y, "box"+num);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }
}