import { GameObjects, Physics } from "phaser";

export class Box extends Physics.Arcade.Image {
    constructor(x, y, num, {scene}) {
        super(scene, x, y, "box"+num);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    move(direction) {
        if (direction === "left" && this.x - 10 > 0) {
            this.x -= 2;
        } else if (direction === "right" && this.x + 10 < this.scene.scale.width) {
            this.x += 2;
        }
    }
}