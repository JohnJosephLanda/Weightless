import { GameObjects, Physics } from "phaser";
import { Wall } from "./Wall";
import { Box } from "./Box";

export class Player extends Physics.Arcade.Image {
    
    // Player states: waiting, start, can_move
    state = "waiting";
    scene = null;
    gravityDirection = 60;
    currRotation = 0;

    constructor({scene}) {
        super(scene, -190, 100, "player");
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setMaxVelocity(100);
        this.addCollidesWith(Wall);
        this.addCollidesWith(Box);
    }

    start() {
        this.setGravityY(this.gravityDirection);
        this.state = "can_move";
        this.x = 200;
    }

    move(direction) {
        if(this.state === "can_move") {
            if (direction === "left" && !this.willCollideWith(Wall)) {
                this.x -= 2;
                if (this.willCollideWith(Box)) {
                    Box.move("left");
                }
            } else if (direction === "right" && !this.willCollideWith(Wall)) {
                this.x += 2;
                if (this.willCollideWith(Box)) {
                    Box.move("Right");
                }
            }
        }
    }

    update() {
    }

    gravityChange() {
        this.setVelocityY(this.gravityDirection/2);
        this.gravityDirection = this.gravityDirection*-1;
        this.setGravityY(this.gravityDirection);
        this.currRotation = (this.currRotation+Math.PI)%(2*Math.PI);
        this.setRotation(this.currRotation);
    }

}