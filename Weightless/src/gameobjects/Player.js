import { GameObjects, Physics } from "phaser";
import { Wall } from "./Wall";
import { Box } from "./Box";
import { LevelEnd } from "./LevelEnd";

export class Player extends Physics.Arcade.Image {
    
    // Player states: waiting, start, can_move
    state = "waiting";
    scene = null;
    gravityDirection = 60;
    currRotation = 0;

    constructor(x,y,{scene}) {
        super(scene, x, y, "player");
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setMaxVelocity(100);
        this.setScale(.13,.13);
    }

    start(x) {
        this.setGravityY(this.gravityDirection);
        this.state = "can_move";
        this.x = x;
    }

    move(direction) {
        if(this.state === "can_move") {
            if (direction === "left") {
                this.setVelocityX(-100);
            } else if (direction === "right") {
                this.setVelocityX(100);
            }
        }
    }

    update() {
        this.setVelocityX(0);
    }

    gravityChange() {
        this.setVelocityY(this.gravityDirection/2);
        this.gravityDirection = this.gravityDirection*-1;
        this.setGravityY(this.gravityDirection);
        this.currRotation = (this.currRotation+Math.PI)%(2*Math.PI);
        this.setRotation(this.currRotation);
    }
}