class Preload extends Phaser.State {
    preload() {
       
        this.load.script('MainWindow', 'js/MainFile/MainWindow.js');
        this.load.script('Fish', 'js/Entity/fish.js');
        this.load.image('backgroundImage', 'img/alphaBackground.png');
        this.load.image('anchor', 'img/anchorPoint.png');
        this.load.image('fish', 'img/fish/guppy.png');
        this.load.image('infoBox', 'img/userInterface/infoBox.png');
        this.load.image('hungerBar', 'img/userInterface/bar.png');
        this.load.image('hungerPixel', 'img/userInterface/yellowpx.png');
        this.load.image('A1', 'img/A1.png');

    }
    create() {
        
        console.log("Preload.js:  Preload.create-> load_Level");
        this.game.state.add('MainWindow', MainWindow);
        this.game.state.start('MainWindow');

    }

}