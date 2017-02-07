class HostileCell extends Phaser.Sprite {
    constructor(game, posx, posy, tilemap) {
        super(game, posx, posy, 'rangeIndicator', 0);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.engaging = false;
        this.seededTimer = 0;
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5);
        this.body.bounce.set(1.0);
        console.log('HostileCell fired');
        this.targetCellX = 0;
        this.targetCellY = 0;
        this.movementSpeed = 11;
        
        //this.animations.add('ladderDown', [15, 14, 13, 12], 7, true);
        
       
        this._targetingReticule();

    }
    _assimilationEvent2() {
        //this.game.physics.arcade.velocityFromAngle(this.randomangle, this.randomspeed, this.body.velocity);
        this.game.physics.arcade.moveToXY(this, this.targetCellX, this.targetCellY, 12, undefined);
        console.log('assimilationeventfired' + this.targetCellX + ' ' + this.targetCellY);
        this.engaging = false;
        
        this.game.time.events.add(Phaser.Timer.SECOND * 1, this._movementFunction, this);
        
    }

    _targetingReticule() {
        this.targetingReticule = this.game.add.sprite(0, 0, 'intruderCell');
        this.targetingReticule.animations.add('spawn', [0, 1, 2, 3, 4], 0.8, false);
        this.targetingReticule.animations.add('randomAnim', [5, 6, 7, 8, 9], 0.8, true);
        this.targetingReticule.animations.play('spawn');
        this.targetingReticule.animations.currentAnim.onComplete.add(function () {	 this._randomMovement();
                                                                                 this.targetingReticule.animations.play('randomAnim');
                                                                                 }, this);
        
        this.targetingReticule.anchor.setTo(0.5);
        this.addChild(this.targetingReticule);
    }

    _movementFunction() {
        this.body.moves = true;
        this.seededTimer = Math.random() * (this.movementSpeed - 1) + 1;
        if (this.engaging === false) {
            this.game.time.events.add(Phaser.Timer.SECOND * this.seededTimer, this._randomMovement, this);
        } else {
            // this.game.time.events.add(Phaser.Timer.SECOND * this.seededTimer, this._assimilationEvent2, this);
            this._assimilationEvent2();
        }
    }

    _randomMovement() {

        this.randomspeed = Math.random() * (13 - 2) + 2;
        this.randomangle = Math.random() * (361 - 0) + 0;
        //console.log('Random Movement fired. Speed is : ' + this.randomspeed + 'Angle is: ' + this.randomangle);
        this.game.physics.arcade.velocityFromAngle(this.randomangle, this.randomspeed, this.body.velocity);
        this._movementFunction();
    }

    update() {

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

    }
*/