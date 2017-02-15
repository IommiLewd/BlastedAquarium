class goldFish extends Phaser.Sprite {
    constructor(game, posx, posy, sex) {
        super(game, posx, posy, 'anchor', sex);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5);
        this.inputEnabled = true;
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

        this._randomMovement();
        this.gameMinute = 20;
        
        this.lifeSpan = 0;
        this.pregnant = false;
        this.endOfPregnancy = 0;
        this.events.fishBirth = new Phaser.Signal();
        this._lifeTimer();
        this.typeOfFish = 1; // 1 is goldfish, 2 is neonFish, 3 is guppy.
        this.goldFishMalesPresent = 1;
        this.neonFishMalesPresent = 1;
        this.guppyMalesPresent = 1;
         this.fishNotDead = true;
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
        console.log(this.chosenName + ' has grown a timeUnit. Current Lifespan is: ' + this.lifeSpan + ' pregnant is = ' + this.pregnant);
  
        if(this.lifeSpan < 350){
         this.lifeCounter = this.game.time.events.add(Phaser.Timer.SECOND * this.gameMinute, this._lifeTimer, this);   
        }
        
        //this.lifeCounter = this.game.time.events.add(Phaser.Timer.SECOND * this.gameMinute, this._lifeTimer, this);
        
        
        
        
    }

    _lifeCycle() {
        this.pregnancyChance = Math.random() * (45 - 1) + 1;
        this.pregnancyChance = Math.floor(this.pregnancyChance);
        if (this.lifeSpan > 50 && this.lifeSpan < 150 && this.pregnant === false && this.lifespan + this.endOfPregnancy < this.lifeSpan && this.pregnancyChance === 5 && this.sex === 0 && this.hunger < 70) {
            this._pregnancy();
            console.log(this.chosenName + 'Pregnancy Fired! <-------------------------- ');
        }

        if (this.lifeSpan > this.birthDate && this.pregnant === true) {
            this._birth();
            console.log(this.chosenName + 's Birth Fired!');
            this.pregnant = false;
        }

        if (this.lifeSpan === this.endOfPregnancy) {
            console.log(this.chosenName + 'EndOvPregnancy');
        }

        var deathChance = Math.random() * (99 - 1) + 1;
        if (this.lifeSpan - 200 > deathChance || this.hunger <= 0) {
          //  this.game.time.events.remove(this.lifeCounter);
            console.log('deathevent fired');
           //this.game.time.events.remove(this.lifeCounter);
            //this.lifeCounter.stop(false);
         
            this.kill();

        }

    }

    _scaleModel() {
        if (this.modelSize <= 1.0) {
            this.modelSize += 0.017;
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
        this.birthDate = this.lifeSpan + 30;
        this.endOfPregnancy = this.lifeSpan + 40;

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
            this.model = this.game.add.sprite(0, 0, 'goldFish1');
        } else {
            this.model = this.game.add.sprite(0, 0, 'goldFish2');
        }
        this.addChild(this.model);
        this.model.anchor.setTo(0.5);
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
            align: "left",
            fill: "#d4ae53"
        };
        this.ageStyle = {
            font: "14px Press Start 2P",
            align: "right",
            fill: "#d4ae53"
        };
        this.nameText = this.game.add.text(-6, -109, this.chosenName, this.defaultStyle);
        this.typeText = this.game.add.text(-6, -86, "Goldfish", this.goldStyle);
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
        this.hungerPixel.animations.add('red', [2], 1, true);

        this.nameText.anchor.setTo(0.5);
        this.typeText.anchor.setTo(0.5);
        this.ageText.anchor.setTo(0.5);
        this.ageTextNumber.anchor.setTo(0.5);
        this.hungerText.anchor.setTo(0.5);
        this.sexIcon.anchor.setTo(0.5);
        this.pregnantIcon.anchor.setTo(0.5);
        this.deathIcon.anchor.setTo(0.5);

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
        this.game.time.events.add(Phaser.Timer.SECOND * this.seededTimer, function () {
            if (this.chanceOfFeeding > this.hunger && this.hasEaten === false && this.foodPosition.length > 0) {
                this._moveTo();
            } else {
                this._randomMovement();
            }

        }, this);
        var bubbleChance = Math.random() * (5 - 1) + 1;
        bubbleChance = Math.floor(bubbleChance);
        if (bubbleChance === 4) {
            this._spawnBubble();
        }
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
        }
    }
    update() {
        this._pointerOver();
        this._movementUpdate();
    }
}
