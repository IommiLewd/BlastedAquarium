class Fish extends Phaser.Sprite {
    constructor(game, posx, posy, sex) {
        super(game, posx, posy, 'anchor', sex);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5);
        this.inputEnabled = true;
        this.capturedX = 0;
        this.capturedY = 0;
        this.hunger = 100;
        this.isHungry = false;
        this.sex = sex;
        if (this.sex === undefined) {
            this.sex = Math.random() * (2 - 0) + 0;
            this.sex = Math.floor(this.sex);
            console.log(this.sex);
        }
        this.model = this.game.add.sprite(0, 0, 'fish');
        this.addChild(this.model);
        this.model.anchor.setTo(0.5);
        //Insert custom variables for scaling here
        this.events.fishBirth = new Phaser.Signal();
        this.fishAge = 0;
        this._assignName();
        this._initInfoBox();
        this._randomMovement();
        this._ageCounter();
        //this.model.scale.setTo(10,10);
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

    _ageCounter() {
        this.game.time.events.add(Phaser.Timer.SECOND * 6, function () {
            this.fishAge++;
            if (this.hunger >= 2) {
                this.hunger -= 2;
            }
            this.fishGameAge = this.fishAge / 10;
            this.fishGameAge = Math.floor(this.fishGameAge);
            this.ageTextNumber.setText(this.fishGameAge);
            console.log(this.chosenName + ' Has grown, it is now = ' + this.fishAge + ' Units. Its Hunger is = ' + this.hunger);
            this._fishFood();
            this._ageCounter();
            this.locationX = 30;
            this.locationY = 30;
              this.events.fishBirth.dispatch(this, this.locationX, this.locationY); 
        }, this);
    }




    _fishFood() {
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
        this.typeText = this.game.add.text(-6, -86, "The Guppy", this.goldStyle);
        this.ageText = this.game.add.text(-33, -64, "Months", this.defaultStyle);
        this.ageTextNumber = this.game.add.text(46, -64, "0", this.ageStyle);
        this.hungerText = this.game.add.text(-26, -46, "Hunger:", this.defaultStyle);
        this.hungerBar = this.game.add.sprite(22, -51, 'hungerBar');
        this.hungerPixel = this.game.add.tileSprite(26, -49, 30, 2, 'tiledColor');

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

        this.addChild(this.nameText);
        this.addChild(this.typeText);
        this.addChild(this.ageText);
        this.addChild(this.ageTextNumber);
        this.addChild(this.hungerText);
        this.addChild(this.hungerBar);
        this.addChild(this.hungerPixel);
        this.addChild(this.sexIcon);
    }

    _timerFunction() {
        this.seededTimer = Math.random() * (8 - 1) + 1;
        this.game.time.events.add(Phaser.Timer.SECOND * this.seededTimer, this._randomMovement, this);
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
        this._timerFunction();
    }

    _moveTo() {
        //this.game.physics.arcade.moveToXY(this, this.capturedX, this.capturedY, 12, undefined);
        console.log('Move To Fired!');
    }

    _movementUpdate() {
        if (this.body.velocity.x > 0) {
            this.model.scale.setTo(-1, 1);

        } else {
            this.model.scale.setTo(1, 1);
        }
        if (this.x < 110) {
            this.body.velocity.x = 15;
        }
        if (this.x > 840) {
            this.body.velocity.x = -15;
        }
        if (this.y < 120) {
            this.body.velocity.y = 5;
        }
        if (this.y > 420) {
            this.body.velocity.y = -5;
        }
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

        }
    }

    update() {
        this._pointerOver();
        this._movementUpdate();
    }
}

/*

  _initHealthIndicator() {
        this.healthBar = this.game.add.tileSprite(0, -56, 76, 16, 'DHPixel');
        this.healthBar.anchor.setTo(0.5);
        this.addChild(this.healthBar);
        this.healthStatus = this.game.add.tileSprite(-35, -56, 70, 10, 'HPixel');
        this.healthStatus.anchor.setTo(0.0, 0.5);
        //this.healthStatus.anchor.setTo(0.5);
        this.addChild(this.healthStatus);

    _initHealthBar() {
        console.log('healthBar fired!');
        this._healthBar = this.game.add.image(4, 4, 'healthBar');
        this._healthBar.fixedToCamera = true;
        this._health_pixel = this.game.add.tileSprite(18, 12, 268, 12, 'healthPixel');
        this._health_pixel.fixedToCamera = true;
    }
    _initEnergyBar() {
        console.log('energyBar fired!');
        this._energyBar = this.game.add.image(4, 38, 'energyBar');
        this._energyBar.fixedToCamera = true;
          this._energy_pixel = this.game.add.tileSprite(12, 44, 184, 12, 'energyPixel');
        this._energy_pixel.fixedToCamera = true;
    }
    update() {
        this._energy_pixel.width  = this._player_energy / 100 * 184;
        this._health_pixel.width = this._player_health / 100 * 268;
    if(this._player_energy < 100 && this._energy_regen) {
        this._player_energy += 0.15;
    }




    }
*/