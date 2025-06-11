import { Scene } from "phaser";

export class EndScene extends Scene {
    constructor() {
        super("EndScene");
    }

    init() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {
        this.background = this.add.image(0, 0, "background").setDisplaySize(960,540).setOrigin(0,0);
        
        this.add.rectangle(
            this.scale.width / 8 ,
            this.scale.height / 2 - 15,
            this.scale.width * 3 / 4,
            70,
            0x000000
        ).setAlpha(.8).setOrigin(0, 0.5);
        this.add.rectangle(
            this.scale.width * 3 / 10,
            this.scale.height / 2 + 80,
            this.scale.width * 2 / 5,
            50,
            0x000000
        ).setAlpha(.8).setOrigin(0, 0.5);

        // Logo
        const logo_game = this.add.bitmapText(
            this.scale.width / 2,
            this.scale.height / 2,
            "pixelfont",
            "CONGRATULATIONS",
            52,
            1
        )
        logo_game.setOrigin(0.5, 0.5);
        logo_game.postFX.addShine();

        const start_msg = this.add.bitmapText(
            this.scale.width / 2,
            this.scale.height / 2 + 85,
            "pixelfont",
            "YOU BEAT THE GAME",
            24
        ).setOrigin(0.5, 0.5);

        // Send start-game event when user clicks
        this.input.on("pointerdown", () => {
            this.scene.start("Level1");
        });
    }
}