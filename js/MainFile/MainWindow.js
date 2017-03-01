/**
 * base class for a simple fish.
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
        this.game.physics.arcade.overlap(this.fishGroup, this.foodGroup, this._fishEatEvent, null, this);
    }
    _initStage() {
        this.background = this.add.image(0, 0, 'backgroundImage');
    }
    _autoFeed() {
        this._spawnMeal(1);
        this.game.time.events.add(Phaser.Timer.SECOND * 80, this._autoFeed, this);
        this._checkCapacity();
    }
    _fishEatEvent(fish, foodChip) {
        if (fish.hasEaten === false) {
            foodChip.kill();
            fish.hunger += 15;
            fish.hasEaten = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 7, function () {
                fish.hasEaten = false;
            }, this);
        }
        fish._updateFishInfo();
        this._foodHandler();
    }
    _addFish(x, y, type) {
        this.spawnX = x;
        this.spawnY = y;
        this.verticalSpawn = Math.random() * (850 - 140) + 140;
        this.horizontalSpawn = Math.random() * (440 - 150) + 150;
        if (this.spawnX === undefined) {
            this.spawnX = this.verticalSpawn;
        }
        if (this.spawnY === undefined) {
            this.spawnY = this.horizontalSpawn;
        }
        this.fish = new Guppy(this.game, this.spawnX, this.spawnY, type);
        this.fishGroup.add(this.fish);
        this.goldSignal = this.fish.events.addGold.add(this._addCredits, this, 0, this.fishCurrentValue);
        this.testSignal = this.fish.events.fishBirth.add(this._fishBirthing, this, 0, this.locationX, this.locationY);
    }
    _checkforMales() {
        this.fishGroup.forEachAlive(function (fish) {
            var males = [];
            if (fish.sex === 1) {
                males.push('X');
            }
            if (fish.sex === 0) {
                fish.fishInTank = [];
                fish.fishInTank.push(males);
                console.log(fish.fishInTank.length);
            }
        }, this);
    }
    _checkCapacity() {
        console.log('Capacity Check fired, groupLength is: ' + this.fishGroup.length);
        this._capacity = this.fishGroup.length;
        this.fishGroup.forEachAlive(function (fish) {
            fish.fishInTank = this._capacity;
        }, this);
    }
    _fishBirthing(locationX, locationY) {
        console.log('fishbirthing fired!!!');
        var randomPregnancyRate = Math.random() * (4 - 1) + 1;
        randomPregnancyRate = Math.floor(randomPregnancyRate);
        for (this.i = 0; this.i < randomPregnancyRate; this.i++) {
            this._addFish(locationX, locationY);
            console.log('maximum fishbirth!!!');
        }
        this.testSignal = this.fish.events.fishBirth.add(this._fishBirthing, this, 0, this.locationX, this.locationY);
        this._checkCapacity();
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
    _addCredits(fishCurrentValue){
        console.log('addcreditsfired');
        this.currentlyHeldGold += fishCurrentValue;
        this.creditsText.setText(this.currentlyHeldGold);
        this.goldSignal = this.fish.events.addGold.add(this._addCredits, this, 0, fishCurrentValue);
    }
    _spawnMeal(type) {
        if (this.game.time.now > this.foodSpawnTimer) {
            this.foodSpawnTimer = this.game.time.now + this.foodCounter;
            for (this.i = 0; this.i < this.fishGroup.length; this.i++) {
                if (type === 0) {
                    var foodRange = Math.random() * (60 + this.game.input.mousePointer.x - this.game.input.mousePointer.x - 10) + this.game.input.mousePointer.x - 10;
                } else if (type === 1) {
                    var foodRange = Math.random() * (120 + 500 - 540 - 0) + 540 - 0;
                }
                var foodY = Math.random() * (-50 - 15) - 15;
                this.foodChip = this.game.add.sprite(foodRange, foodY, 'foodChip');
                this.game.physics.arcade.enable(this.foodChip);
                this.foodChip.collideWorldBounds = true;
                this.foodGroup.add(this.foodChip);
            }
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
    _initMoneyBar(){
        this.moneyBar = this.game.add.sprite(0,0, 'moneyBar');
                     this.goldHeaderStyle = {
            font: "14px Press Start 2P",
            align: "right",
            fill: "#d4ae53",
            boundsAlignH: "right"
        };
   this.creditsText = this.game.add.text(58, 26, this.currentlyHeldGold, this.goldHeaderStyle);
        this.creditsText.anchor.setTo(0.5, 1.0);
    }
    create() {
        this.currentlyHeldGold = 50;
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
        this._addFish(undefined, undefined, 1);
        this._addFish(undefined, undefined, 1);
        this._addFish(undefined, undefined, 0);
        this._addFish(undefined, undefined, 0);
        this.stage.disableVisibilityChange = true;
        this.foodPosition = [];
        this._autoFeed();
        this._initMoneyBar();
        this.testSignal = this.fish.events.fishBirth.add(this._fishBirthing, this, 0, this.locationX, this.locationY);
        
    }
    update() {
        if (this.game.input.activePointer.rightButton.isDown && this.game.input.mousePointer.x < 700 && this.game.input.mousePointer.x > 260) {
            this._spawnMeal(0);
        }
        this._collisionHandler();
    }
}