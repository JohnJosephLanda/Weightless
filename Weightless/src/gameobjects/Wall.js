import { GameObjects, Physics } from "phaser";

export class Wall extends Physics.Arcade.Image {
    constructor(x, y, num, {scene}) {
        super(scene, x, y, "wall"+num);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }
}