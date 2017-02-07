/**
 * base class for a simple game level.
 *
 * @constructor  {}
 * @method   :
 * @property :
 * startPosition {} (x,y)
 */

class MainWindow extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
    }


    _collisionHandler() {
    }
    _initStage(){
        this.background = this.add.image(0, 0, 'backgroundImage');
    }
    _addFish(){
        this.fish = new Fish(this.game, 200, 200);
//        this.fish = new Fish(this.game, 200, 200);
//        this.fish = new Fish(this.game, 200, 200);
        
    }
_fishBirthing() {
    console.log('fishies giving birth');
}
    create() {
        this._initStage();
        this._addFish();
        this.fish.events.fishBirth.add(this._fishBirthing, this);
    }


    update() {
                if (this.game.input.activePointer.leftButton.isDown) {
                    this.fish.capturedX = 30;
                    this.fish.capturedY = 30;
                    this.fish._moveTo();
                        
        }
        
        this._collisionHandler();
    }
}