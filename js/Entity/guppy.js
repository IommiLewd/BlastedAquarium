class Guppy extends Phaser.Sprite {
    constructor(game, posx, posy, sex) {
        super(game, posx, posy, 'anchor', sex);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5);
        this.inputEnabled = true;
        this.fishCurrentValue = 10;
        this.sex = sex;
        //Define Sex of goldfish
        if (this.sex === undefined) {
            this.sex = Math.random() * (2 - 0) + 0;
            this.sex = Math.floor(this.sex);
        }

        this.anchor.setTo(0.5);
        this.modelSize = 0.3;
        this.hunger = 90;
        this.foodPosition = [];
        this.foodPresent = false;
        this.capturedX = 100;
        this.capturedY = 480;
        this.hasEaten = false;
        this._assignName();
        this._initModel();
        this._initInfoBox();
 this.lifeSpan = 0;
        this._randomMovement();
        this.gameMinute = 20;

       
        this.pregnant = false;
        this.endOfPregnancy = 0;
        this.events.fishBirth = new Phaser.Signal();
        this.events.addGold = new Phaser.Signal();
        this._lifeTimer();
        this.typeOfFish = 3; // 1 is goldfish, 2 is neonFish, 3 is guppy.
        this.goldFishMalesPresent = 1;
        this.neonFishMalesPresent = 1;
        this.guppyMalesPresent = 1;
        this.fishNotDead = true;
        this.fishInTank = [];
        this.sellFish = 0;
        this.clickTimer = 300;
        this.sellTimer = 0;
        this.fishSold = false;

    }

    _assignName() {
        this.femaleNames = ['Paisley', 'Hazel', 'Lucy', 'Mackenzie', 'Gianna', 'Victoria', 'Elena', 'Grace', 'Sarah', 'Addison', 'Nora', 'Hailey', 'Ella', 'Kaylee', 'Abigail', 'Chloe', 'Aubrey', 'Emily', 'Amelia', 'Lily', 'Zoe', 'Aria', 'Isabella', 'Olivia', 'Emma', 'Sophia', 'Priscilla', 'Rosa', 'Luna', 'Aura'];
        this.maleNames = ['Bryson', 'Daffyd', 'Dave', 'Tommy', 'Haddock', 'Bjorn', 'Doug', 'Morgan', 'Lucas', 'Liam', 'Elijah', 'Logan', 'Caleb', 'Ryan', 'Luke', 'Connor', 'Isaac', 'Brayden', 'Samuel', 'Joseph', 'Hunter', 'Mateo', 'Max', 'Adrian', 'Cooper', 'Hudson', 'Asher', 'Ezra', 'Chase', 'Harrison', 'Felix'];
        if (this.sex === 0) {
            this.chosenName = this.femaleNames[Math.floor(Math.random() * this.femaleNames.length)];
        } else if (this.sex === 1) {
            this.chosenName = this.maleNames[Math.floor(Math.random() * this.maleNames.length)];
        }
        console.log(this.chosenName);
    }

    _lifeTimer() {
        this.lifeSpan++;
        this.hunger -= 2;
        this._scaleModel();
        this._lifeCycle();
        this._updateFishInfo();
        this._updateFishValue();
        console.log(this.chosenName + ' + 1. Lifespan is: ' + this.lifeSpan + '. pregnant is = ' + this.pregnant + '. FishInTank is: ' + this.fishInTank);
        if (this.lifeSpan < 351) {
            this.lifeCounter = this.game.time.events.add(Phaser.Timer.SECOND * this.gameMinute, this._lifeTimer, this);
        } else {
            this.destroy();
        }
    }

    _lifeCycle() {
        this.pregnancyChance = Math.random() * (10 - 1) + 1;
        this.pregnancyChance = Math.floor(this.pregnancyChance);
        if (this.lifeSpan > 30 && this.lifeSpan < 140 && this.pregnant === false && this.lifespan + this.endOfPregnancy < this.lifeSpan && this.pregnancyChance === 5 && this.sex === 0 /* && this.hunger < 40*/ && this.fishInTank < 25) {
            this._pregnancy();
            console.log(this.chosenName + 'Pregnancy Fired! <-------------------------- ');
        }
        if (this.lifeSpan > this.birthDate && this.pregnant === true) {
            this._birth();
            console.log(this.chosenName + ' is now pregnant!');
            this.pregnant = false;
        }
        var deathChance = Math.random() * (99 - 1) + 1;
        if (this.lifeSpan - 170 > deathChance || this.hunger <= 0) {
            console.log(this.chosenName + ' Has died!');
            this.kill();
            this.lifeSpan = 350;
        }

    }

_updateFishValue(){
    if(this.lifeSpan < 130){
        this.fishCurrentValue += 1;
    } else {
        this.fishCurrentValue--;
    }

    this.fishValue.setText(this.fishCurrentValue);
}


    _scaleModel() {
        if (this.sex === 0 && this.modelSize <= 1.1) {
            this.modelSize += 0.022;
        } else if (this.sex === 1 && this.modelSize <= 0.95) {
            this.modelSize += 0.022;
        }
    }
    _birth() {
        this.locationX = this.body.x;
        this.locationY = this.body.y;
        console.log('Birthday!');
        this.events.fishBirth.dispatch(this.locationX, this.locationY);
    }
    _pregnancy() {
        this.pregnant = true;
        this.birthDate = this.lifeSpan + 20;
        this.endOfPregnancy = this.lifeSpan + 30;

    }

    _updateFishInfo() {
        this.fishMonths = this.lifeSpan / 10;
        this.fishMonths = Math.floor(this.fishMonths);
        this.ageTextNumber.setText(this.fishMonths);
        this.hungerPixel.width = this.hunger / 100 * 30;
        if (this.hunger < 30) {
            this.hungerPixel.animations.play('red');
            this.isHungry = true;
        } else if (this.hunger > 70) {
            this.hungerPixel.animations.play('green');
            this.isHungry = false;
        } else {
            this.hungerPixel.animations.play('yellow');
            this.isHungry = true;
        }
        if (this.hunger > 100) {
            this.hunger = 100;
        }
    }
    _moveTo() {
        var rand = this.foodPosition[Math.floor(Math.random() * this.foodPosition.length)];
        this.game.physics.arcade.moveToXY(this, rand, this.capturedY, 90, undefined);
        this._movementTimer();
    }
    _spawnBubble() {
        var randomNumber = Math.floor(Math.random() * 16) - 15;
        this.randomSize = Math.random() * (0.3 - 0.1) + 0.3;
        this.bubble = this.game.add.sprite(randomNumber, 0, 'bubble');
        this.bubble.anchor.setTo(0.5);
        this.addChild(this.bubble);
        this.game.physics.enable(this.bubble);
        this.bubble.scale.setTo(this.randomSize, this.randomSize);
        this.bubble.body.allowGravity = false;
        this.bubble.body.velocity.y = -40;
        this.bubbleTween = this.game.add.tween(this.bubble).to({
            alpha: 0
        }, 1000, "Linear", true);
        this.bubbleTween.onComplete.add(function () {
            this.bubble.kill();
        }, this);
    }

    _initModel() {
        if (this.sex === 0) {
            this.model = this.game.add.sprite(0, 0, 'femaleGuppy');
        } else {
            this.model = this.game.add.sprite(0, 0, 'maleGuppy');
        }
        this.addChild(this.model);
        this.model.anchor.setTo(0.5);
    }

    _sellFunction() {
        if (this.game.time.now > this.sellTimer) {
            this.sellTimer = this.game.time.now + this.clickTimer;
 
       this.sellFish++;
            console.log('sell function initiated, current gold is: ' + this.fishCurrentValue + 'SellFish is ' + this.sellFish);
    console.log(this.chosenName + 's sellfish value is ' + this.sellFish);
   
            if (this.sellFish === 1) {
                this.sellButton.animations.play('over');
            } else if (this.sellFish === 2) {
                this.sellButton.animations.play('down');
              
                this.fishSold = true;
            } else if (this.sellFish === 3) {
                  this._dispatchGold()
                this.kill();
                this.lifeSpan = 350;
            }
                 
        }

    }
    _dispatchGold(){
      // this.fishValue = Math.floor(this.fishValue);
        console.log('gold dispatched, fish current value is ' + this.fishCurrentValue);
          this.events.addGold.dispatch(this.fishCurrentValue);
    }

    _initInfoBox() {
        this.infoBox = this.game.add.image(0, -80, 'infoBox');
        this.addChild(this.infoBox);
        this.infoBox.anchor.setTo(0.5);
        this.defaultStyle = {
            font: "14px Press Start 2P",
            align: "left",
            fill: "#7e7e85"
        };
        this.goldStyle = {
            font: "14px Press Start 2P",
            align: "center",
            fill: "#d4ae53"
        };
        this.ageStyle = {
            font: "14px Press Start 2P",
            align: "right",
            fill: "#d4ae53",
            boundsAlignV: "right"
        };

        this.blingStyle = {
            font: "14px Press Start 2P",
            align: "right",
            fill: "#d4ae53",
            boundsAlignH: "right"
        };
        this.nameText = this.game.add.text(-6, -109, this.chosenName, this.defaultStyle);
        this.typeText = this.game.add.text(-6, -86, "Guppy", this.goldStyle);
        this.ageText = this.game.add.text(-33, -64, "Months", this.defaultStyle);
        this.ageTextNumber = this.game.add.text(46, -64, "0", this.ageStyle);
        this.hungerText = this.game.add.text(-26, -46, "Hunger:", this.defaultStyle);
        this.hungerBar = this.game.add.sprite(22, -51, 'hungerBar');
        this.hungerPixel = this.game.add.tileSprite(26, -49, 30, 2, 'tiledColor');
        this.pregnantIcon = this.game.add.image(88, -82, 'pregnantIcon');
        this.deathIcon = this.game.add.image(88, -50, 'deathIcon');
        if (this.sex === 1) {
            this.sexIcon = this.game.add.image(88, -114, 'maleIcon');
        } else {
            this.sexIcon = this.game.add.image(88, -114, 'femaleIcon');
        }
        this.hungerPixel.animations.add('green', [0], 1, true);
        this.hungerPixel.animations.add('yellow', [1], 1, true);
        this.sellButton = this.game.add.sprite(56, -14, 'sellSprite');
        this.sellButton.animations.add('up', [0], 1, true);
        this.sellButton.animations.add('over', [1], 1, true);
        this.sellButton.animations.add('down', [2], 1, true);
        this.sellButton.animations.play('up');



        this.moneyBox = this.game.add.sprite(8, 20, 'moneyBox');
        //  this.fishCurrentValue = 20;
        this.fishValue = this.game.add.text(42, 36, this.fishCurrentValue, this.blingStyle);
        //this.fishValue.setText(this.fishCurrentValue);
        this.nameText.anchor.setTo(0.5);
        this.typeText.anchor.setTo(0.5);
        this.ageText.anchor.setTo(0.5);
        this.ageTextNumber.anchor.setTo(0.5);
        this.hungerText.anchor.setTo(0.5);
        this.sexIcon.anchor.setTo(0.5);
        this.pregnantIcon.anchor.setTo(0.5);
        this.deathIcon.anchor.setTo(0.5);
        this.sellButton.anchor.setTo(0.5);
        this.fishValue.anchor.setTo(0.5);

        //makethreeconditions and change the sprite accordingly click once for sell two for confirm resetti if mouse moves away

        this.addChild(this.nameText);
        this.addChild(this.typeText);
        this.addChild(this.ageText);
        this.addChild(this.ageTextNumber);
        this.addChild(this.hungerText);
        this.addChild(this.hungerBar);
        this.addChild(this.hungerPixel);
        this.addChild(this.sexIcon);
        this.addChild(this.pregnantIcon);
        this.addChild(this.deathIcon);
        this.addChild(this.sellButton);
        this.addChild(this.moneyBox);
        this.addChild(this.fishValue);
    }

    _movementUpdate() {
        if (this.body.velocity.x > 0) {
            this.model.scale.setTo(-this.modelSize, this.modelSize);
        } else {
            this.model.scale.setTo(this.modelSize, this.modelSize);
        }
        if (this.x < 118 + this.model.width / 2) {
            this.body.velocity.x = 15;
        }
        if (this.x > 848 + this.model.width / 2) {
            this.body.velocity.x = -15;
        }
        if (this.y < 164) {
            this.body.velocity.y = 5;
        }
        if (this.y > 480) {
            this.body.velocity.y = -5;
        }
    }


    _movementTimer() {
        this.seededTimer = Math.random() * (8 - 1) + 1;
        this.chanceOfFeeding = Math.random() * (99 - 0) + 0;
        if(this.lifeSpan < 350){
        this.game.time.events.add(Phaser.Timer.SECOND * this.seededTimer, function () {
            if (this.chanceOfFeeding > this.hunger && this.hasEaten === false && this.foodPosition.length > 0) {
                this._moveTo();
                console.log('feeding');
            } else {
                this._randomMovement();
                console.log('movement');
            }
        }, this);
        var bubbleChance = Math.random() * (5 - 1) + 1;
        bubbleChance = Math.floor(bubbleChance);
        if (bubbleChance === 4) {
            this._spawnBubble();
        }}
    }

    _randomMovement() {
        this.randMovement = Math.random() * (3 - 1) + 1;
        this.randMovement = Math.floor(this.randMovement);
        this.randSpeed = Math.random() * (50 - 15) + 15;
        if (this.randMovement === 2) {
            this.body.velocity.x = this.randSpeed;
        } else {
            this.body.velocity.x = -this.randSpeed;
        }
        this.randHeight = Math.random() * (3 - 1) + 1;
        this.randHeight = Math.floor(this.randMovement);
        this.randY = Math.random() * (15 - 3) + 3;
        if (this.randMovement === 1) {
            this.body.velocity.y = this.randY;
        } else if (this.randMovement === 2) {
            this.body.velocity.y = -this.randY;
        } else {}
        this._movementTimer();
    }

    _pointerOver() {
        if (this.input.pointerOver()) {
            this.bringToTop();
            this.infoBox.visible = true;
            this.typeText.visible = true;
            this.ageText.visible = true;
            this.ageTextNumber.visible = true;
            this.hungerText.visible = true;
            this.nameText.visible = true;
            this.hungerBar.visible = true;
            this.hungerPixel.visible = true;
            this.sexIcon.visible = true;
            if (this.pregnant) {
                this.pregnantIcon.visible = true;
            }
            if (this.lifeSpan > 150) {
                this.deathIcon.visible = true;
            }
            this.sellButton.visible = true;
            this.moneyBox.visible = true;
            this.fishValue.visible = true;
        } else {
            this.infoBox.visible = false;
            this.typeText.visible = false;
            this.ageText.visible = false;
            this.ageTextNumber.visible = false;
            this.hungerText.visible = false;
            this.nameText.visible = false;
            this.hungerBar.visible = false;
            this.hungerPixel.visible = false;
            this.sexIcon.visible = false;
            this.pregnantIcon.visible = false;
            this.deathIcon.visible = false;
            this.sellButton.visible = false;
            this.moneyBox.visible = false;
            this.fishValue.visible = false;
            this.sellButton.animations.play('up');
            this.sellFish = 0;
        }
    }
    update() {
        if (this.game.input.activePointer.leftButton.isDown) {
            this._sellFunction();
        }
        this._pointerOver();
        this._movementUpdate();
    }
}