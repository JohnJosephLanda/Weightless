import { GameObjects, Physics } from "phaser";

export class Player extends Physics.Arcade.Image {
    
    // Player states: waiting, start, can_move
    state = "waiting";
    scene = null;

    constructor({scene}) {
        super(scene, -190, 100, "player");
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    start() {
        this.state = "can_move";
        this.x = 200;
    }

    move(direction) {
        if(this.state === "can_move") {
            if (direction === "left" && this.x - 10 > 0) {
                this.x -= 5;
            } else if (direction === "right" && this.x + 10 < this.scene.scale.width) {
                this.x += 5;
            }
        }
    }

    update() {
    }

}