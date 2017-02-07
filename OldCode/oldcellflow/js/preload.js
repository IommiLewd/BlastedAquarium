class Preload extends Phaser.State {
    preload() {
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.load.script('neutralCell', 'js/Entity/neutralCell.js');
        this.load.script('hostileCell', 'js/Entity/hostileCell.js');
        this.load.script('MainWindow', 'js/MainFile/MainWindow.js');
        this.load.script('CameraTarget', 'js/Entity/CameraTarget.js');
        
        
        
        
        
        this.load.image('backgroundimage', 'img/background1.png');
        this.load.image('backgroundOverlay', 'img/background2.png');
        this.load.image('CameraTarget', 'img/cameraTarget.png');
        this.load.spritesheet('intruderCell', 'img/intruderCellSpritesheet.png', 36, 36, 10);
        this.load.spritesheet('neutralCell', 'img/dogCellSpritesheet.png', 36, 36, 10);
        //this.load.image('hostileCell', 'img/hostileCell.png');
        this.load.image('hostileCell', 'img/hostileCell.png');
        //this.load.image('neutralCell', 'img/NeutralCell.png');
        this.load.image('rangeIndicator', 'img/rangeIndicator.png');
    }
    create() {
        
        console.log("Preload.js:  Preload.create-> load_Level");
        this.game.state.add('MainWindow', MainWindow);
        this.game.state.start('MainWindow');

    }

}