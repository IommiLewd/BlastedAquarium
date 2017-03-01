class Preload extends Phaser.State {
    preload() {

        this.load.script('MainWindow', 'js/MainFile/MainWindow.js');
        this.load.script('goldFish', 'js/Entity/goldFish.js');
        this.load.script('Guppy', 'js/Entity/Guppy.js');
        this.load.image('maleGuppy', 'img/fish/maleGuppy.png');
        this.load.image('femaleGuppy', 'img/fish/femaleGuppy.png');
        //this.load.image('backgroundImage', 'img/alphaBackground.png');
        this.load.image('backgroundImage', 'img/Background.png');
        this.load.image('anchor', 'img/anchorPoint.png');

        this.load.image('goldFish1', 'img/fish/goldFish1.png');
        this.load.image('goldFish2', 'img/fish/goldFish2.png');
        this.load.image('femaleFish', 'img/fish/guppyFemale.png');
        this.load.image('fish', 'img/fish/guppy.png');

        this.load.image('infoBox', 'img/userInterface/infoBox.png');
        this.load.image('hungerBar', 'img/userInterface/bar.png');
        this.game.load.spritesheet('tiledColor', 'img/userInterface/tileColors.png', 2, 2, 3);
        this.game.load.spritesheet('filterPumpAnim', 'img/filterpumpAnim.png', 38, 132, 4);
        this.load.image('foodChip', 'img/foodChip.png');
        this.load.image('yellowpx', 'img/yellowpx.png');
        this.load.image('bubble', 'img/bubble.png');
        this.load.image('moneyBar', 'img/userInterface/moneyBar.png');

        //Fish Status Icons
        this.load.image('maleIcon', 'img/userInterface/maleIcon.png');
        this.load.image('femaleIcon', 'img/userInterface/femaleIcon.png');
        this.load.image('deathIcon', 'img/userInterface/deathIcon.png');
        this.load.image('pregnantIcon', 'img/userInterface/pregnantIcon.png');


        this.load.spritesheet('sellSprite', 'img/userInterface/sellTileSprite.png', 28, 28, 3);
        this.load.image('moneyBox', 'img/userInterface/moneyBox.png');

    }
    create() {

        console.log("Preload.js:  Preload.create-> load_Level");
        this.game.state.add('MainWindow', MainWindow);
        this.game.state.start('MainWindow');

    }

}