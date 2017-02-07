//var game = new Phaser.Game(840, 560, Phaser.AUTO, 'phaser-example', null, false, false);
var game = new Phaser.Game(960, 540, Phaser.AUTO, 'phaser-example', null, false, false);
class Boot extends Phaser.State {

    preload() {
          this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

      //assets we'll use in the loading screen
      //game.load.image('preloadbar', 'img/preloader-bar.png');
      //TODO: change the splash screen
    //  game.load.image('splash','img/backgroundImage.jpg');
      game.load.script('preload','js/preload.js');
    }
    create() {

      game.state.add('Preload', Preload);
      game.state.start('Preload');
    }
}


game.state.add('Boot', Boot);
//game.state.add("boot", boot);
game.state.start('Boot');
