// Class to preload all the assets
// Remember you can load this assets in another scene if you need it
export class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: "Preloader" });
    }

    preload() {
        // Load all the assets
        this.load.setPath("assets");
        this.load.image("logo", "logo.png");
        this.load.image("background", "background.png");

        this.load.image("player", "player/player.png");
        this.load.image("stablebox", "box.png");
        this.load.image("flippingbox", "box.png");
        this.load.image("wall", "wall.png");
        this.load.image("LevelEnd", "LevelEnd.png");

        // Fonts
        this.load.bitmapFont("pixelfont", "fonts/pixelfont.png", "fonts/pixelfont.xml");

        // Event to update the loading bar
        this.load.on("progress", (progress) => {
            console.log("Loading: " + Math.round(progress * 100) + "%");
        });
    }

    create() {
        // When all the assets are loaded go to the next scene
        this.scene.start("Level1");
    }
}