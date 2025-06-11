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

    constructor({scene}) {
        super(scene, -190, 100, "player");
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setMaxVelocity(100);
        this.setScale(.13,.13);
    }

    start() {
        this.setGravityY(this.gravityDirection);
        this.state = "can_move";
        this.x = 200;
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
        if (this.willCollideWith(LevelEnd)) {
            this.game.events.emit("level-end");
        }
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