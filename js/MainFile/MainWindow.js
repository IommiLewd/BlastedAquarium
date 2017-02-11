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
        //this.game.physics.arcade.collide(this.fishGroup, this.foodGroup);

        //                   this.physics.arcade.overlap(this.foodGroup, this.fishGroup,  function (fish, foodChip) {
        //             console.log('Nomnom');
        //            },null,  this);
        this.game.physics.arcade.overlap(this.fishGroup, this.foodGroup, this._fishEatEvent, null, this);
    }
    _initStage() {
        this.background = this.add.image(0, 0, 'backgroundImage');
    }

    _fishEatEvent(fish, foodChip) {
        if (fish.hasEaten === false) {
            foodChip.kill();
            fish.hunger += 10;
            console.log('nomnom!');
            fish.hasEaten = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 12, function () {
                fish.hasEaten = false;
            }, this);
        } else {
            console.log('No food today slut');
        }

        this._foodHandler();
        console.log(this.foodPosition);
    }
    _addFish(x, y, type) {
        this.fish = new goldFish(this.game, x, y, type);
        this.fishGroup.add(this.fish);

    }
    _fishBirthing(locationX, locationY) {
        //        this.locationX = locationX;
        //        this.locationY = locationY;
        //        console.log('LocationX is = ' + this.locationX);
        //        console.log('LocationY is = ' + this.locationY);
        console.log('Fishies Giving birth');
        this._addFish(locationX, locationY, undefined);
        this._addFish(locationX, locationY, undefined);
        //this.fish = new Fish(this.game, this.locationX, this.locationY);
    }

    _initBubbles() {
        this.filterPump = this.game.add.sprite(116, 126, 'filterPumpAnim');
        this.filterPump.animations.add('base', [0, 1, 2, 3], 8, true);
        this.filterPump.animations.play('base');
        this.bubbleEmitter = this.game.add.emitter(20, 20);
        this.bubbleEmitter.makeParticles('bubble');
        this.bubbleEmitter.setRotation(0, 0);
        this.bubbleEmitter.setAlpha(0.1, 2, 3000);
        this.bubbleEmitter.setScale(0.1, 0.4, 0.1, 0.4, 3000, Phaser.Easing.Quintic.Out);
        this.bubbleEmitter.gravity = -500;
        this.bubbleEmitter.minParticleSpeed.set(0, -20);
        this.bubbleEmitter.maxParticleSpeed.set(0, -60);
        this.bubbleEmitter.start(false, 400, 200);
        this.bubbleEmitter.width = 20;
        this.bubbleEmitter.emitX = 2;
        this.bubbleEmitter.x = 132;
        this.bubbleEmitter.y = 260;
    }


    _foodHandler() {
        this.foodPosition = [];
        this.foodGroup.forEachAlive(function (foodChip) {
            this.foodPosition.push(foodChip.x);
        }, this);
        this.fishGroup.forEachAlive(function (fish) {
            fish.foodPosition = this.foodPosition;
        }, this);

    }
    _spawnMeal() {
        if (this.game.time.now > this.foodSpawnTimer) {
            this.foodSpawnTimer = this.game.time.now + this.foodCounter;

        }
    }
    _spawnFood() {
        if (this.game.time.now > this.foodSpawnTimer) {
            this.foodSpawnTimer = this.game.time.now + this.foodCounter;
            this.foodChip = this.game.add.sprite(this.game.input.mousePointer.x, -15, 'foodChip');
            this.game.physics.arcade.enable(this.foodChip);
            this.foodChip.collideWorldBounds = true;
            this.foodGroup.add(this.foodChip);
            this._foodHandler();

        }


    }
    _initBarrier() {
        this.barrier = this.game.add.tileSprite(0, 500, 960, 40, 'yellowpx');
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
        this._initStage();
        this._initBarrier();
        this._initBubbles();
        this.fishGroup = this.add.group();
        this.foodGroup = this.add.group();
        this._addFish(200, 200, 1);
        this._addFish(200, 200, 1);
        this._addFish(200, 200, 0);
        this._addFish(200, 200, 0);
        this.foodPosition = [];

    }


    update() {
        if (this.game.input.activePointer.rightButton.isDown) {
            console.log('chow!');
            this._spawnFood();
        }
        this._collisionHandler();
    }
}