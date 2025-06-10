import { GameObjects, Physics } from "phaser";

export class Player extends Physics.Arcade.Image {
    
    // Player states: waiting, start, can_move
    state = "waiting";
    scene = null;
    gravityDirection = 40;

    constructor({scene}) {
        super(scene, -190, 100, "player");
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setGravityY(this.gravityDirection);
        this.setMaxVelocity(100);
    }

    start() {
        this.state = "can_move";
        this.x = 200;
    }

    move(direction) {
        if(this.state === "can_move") {
            if (direction === "left" && this.x - 10 > 0) {
                this.x -= 2;
            } else if (direction === "right" && this.x + 10 < this.scene.scale.width) {
                this.x += 2;
            }
        }
    }

    update() {
        
    }

    gravityChange() {
        this.setVelocityY(this.gravityDirection/2);
        this.gravityDirection = this.gravityDirection*-1;
        this.setGravityY(this.gravityDirection);
    }

}