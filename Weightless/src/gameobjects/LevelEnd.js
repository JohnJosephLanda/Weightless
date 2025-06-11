import { GameObjects, Physics } from "phaser";

export class LevelEnd extends Physics.Arcade.Image {
    constructor(x, y, num, {scene}) {
        super(scene, x, y, "LevelEnd");
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }
}