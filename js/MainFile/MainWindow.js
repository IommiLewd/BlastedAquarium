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

    preload() {}


    _collisionHandler() {}
    _initStage() {
        this.background = this.add.image(0, 0, 'backgroundImage');
    }
    _addFish() {
        this.fish = new Fish(this.game, 200, 200);
        //        this.fish = new Fish(this.game, 200, 200);
        //        this.fish = new Fish(this.game, 200, 200);

    }
    _fishBirthing(locationX, locationY) {
        this.locationX = locationX;
        this.locationY = locationY;
        console.log('LocationX is = ' + this.locationX);
        console.log('LocationY is = ' + this.locationY);
        console.log('Fishies Giving birth');
        this.fish = new Fish(this.game, this.locationX, this.locationY);
    }
    create() {
        this._aquariumQuality = 73;
        this._initStage();
        this._addFish();
        this.testSignal = this.fish.events.fishBirth.add(this._fishBirthing, this, 0, this.locationX, this.locationY);
        
        //this.testSignal = this.fish.events.fishBirth.add(this._fishBirthing, this, 0, this.locationX, this.locationY);
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