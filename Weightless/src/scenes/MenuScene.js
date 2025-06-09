import { Scene } from "phaser";

export class MenuScene extends Scene {
    constructor() {
        super("MenuScene");
    }

    init() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {

        this.add.rectangle(
            this.scale.width / 4 ,
            this.scale.height / 2 - 15,
            this.scale.width / 2,
            70,
            0x000000
        ).setAlpha(.8).setOrigin(0, 0.5);
        this.add.rectangle(
            this.scale.width / 3 ,
            this.scale.height / 2 + 80,
            this.scale.width / 3,
            50,
            0x000000
        ).setAlpha(.8).setOrigin(0, 0.5);

        // Logo
        const logo_game = this.add.bitmapText(
            this.scale.width / 2,
            this.scale.height / 2,
            "pixelfont",
            "WEIGHTLESS",
            52,
            1
        )
        logo_game.setOrigin(0.5, 0.5);
        logo_game.postFX.addShine();

        const start_msg = this.add.bitmapText(
            this.scale.width / 2,
            this.scale.height / 2 + 85,
            "pixelfont",
            "CLICK TO START",
            24
        ).setOrigin(0.5, 0.5);

        // Send start-game event when user clicks
        this.input.on("pointerdown", () => {
            this.game.events.emit("start-game");
        });
    }
}