class Preload extends Phaser.State {
    preload() {

        this.load.script('MainWindow', 'js/MainFile/MainWindow.js');
        this.load.script('Fish', 'js/Entity/fish.js');
        this.load.image('backgroundImage', 'img/alphaBackground.png');
        this.load.image('anchor', 'img/anchorPoint.png');
        this.load.image('fish', 'img/fish/guppy.png');
        this.load.image('femaleFish', 'img/fish/guppyFemale.png');

        this.load.image('infoBox', 'img/userInterface/infoBox.png');
        this.load.image('hungerBar', 'img/userInterface/bar.png');
        this.game.load.spritesheet('tiledColor', 'img/userInterface/tileColors.png', 2, 2, 3);
        this.load.image('foodChip', 'img/foodChip.png');
        this.load.image('yellowpx', 'img/yellowpx.png');

        //Fish Status Icons
        this.load.image('maleIcon', 'img/userInterface/maleIcon.png');
        this.load.image('femaleIcon', 'img/userInterface/femaleIcon.png');
        this.load.image('deathIcon', 'img/userInterface/deathIcon.png');
        this.load.image('pregnantIcon', 'img/userInterface/pregnantIcon.png');


    }
    create() {

        console.log("Preload.js:  Preload.create-> load_Level");
        this.game.state.add('MainWindow', MainWindow);
        this.game.state.start('MainWindow');

    }

}