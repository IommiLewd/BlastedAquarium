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


    _collisionHandler() {
        this.game.physics.arcade.collide(this.barrier, this.foodGroup);
    }
    _initStage() {
        this.background = this.add.image(0, 0, 'backgroundImage');
    }
    _addFish(x, y, type) {
        this.fish = new Fish(this.game, x, y, type);
        this.fishGroup.add(this.fish);

    }
    _disablePhysics() {

    }
    _fishBirthing(locationX, locationY) {
        //        this.locationX = locationX;
        //        this.locationY = locationY;
        //        console.log('LocationX is = ' + this.locationX);
        //        console.log('LocationY is = ' + this.locationY);
        console.log('Fishies Giving birth');
        this._addFish(locationX, locationY, undefined);
        //this.fish = new Fish(this.game, this.locationX, this.locationY);
    }

    _spawnFood() {
        if (this.game.time.now > this.foodSpawnTimer) {
            this.foodSpawnTimer = this.game.time.now + this.foodCounter;
            this.foodChip = this.game.add.sprite(this.game.input.mousePointer.x, -15, 'foodChip');
            this.game.physics.arcade.enable(this.foodChip);
            this.foodChip.collideWorldBounds = true;
            this.foodGroup.add(this.foodChip);
        }
    }
    _initBarrier() {
        this.barrier = this.game.add.tileSprite(0, 490, 960, 50, 'yellowpx');
        this.game.physics.arcade.enable(this.barrier);
        this.barrier.body.moves = false;
        this.barrier.body.immovable = true;
        this.barrier.allowGravity = 0;
    }
    create() {
        this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        }
        this.foodSpawnTimer = 0;
        this.foodCounter = 750;
        this.game.physics.arcade.gravity.y = 100;
        this._aquariumQuality = 73;
        this._initStage();
        this._initBarrier();
        this.fishGroup = this.add.group();
        this.foodGroup = this.add.group();
        this._addFish(200, 200, 1);
        this._addFish(200, 200, 0);
        this._addFish(200, 200, 0);
        this.testSignal = this.fish.events.fishBirth.add(this._fishBirthing, this, 0, this.locationX, this.locationY);
    }


    update() {
        if (this.game.input.activePointer.leftButton.isDown) {
            this.fishGroup.forEach(function (fish, capturedX, capturedY) {
                fish.capturedX = this.game.input.mousePointer.x;
                fish.capturedY = this.game.input.mousePointer.y;
                fish._moveTo();
            }, this, true);


        }
        if (this.game.input.activePointer.rightButton.isDown) {
            console.log('chow!');
            this._spawnFood();
        }
        this._collisionHandler();
    }
}