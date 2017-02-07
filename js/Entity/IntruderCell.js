
class HostileCell extends Phaser.Sprite {
    constructor(game, posx, posy, tilemap) {
        super(game, posx, posy, 'hostileCell', 0);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this._randomMovement();
        this._targetingReticule();
        this.seededTimer = 0;
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5);
        this.body.bounce.set(1.0);
        console.log('HostileCell fired');
        
    }
    _targetingReticule() {
        this.targetingReticule = this.game.add.image(0, 0, 'rangeIndicator');
        this.targetingReticule.anchor.setTo(0.5);
           this.addChild(this.targetingReticule);
        
    }
    _movementFunction() {
        this.seededTimer = Math.random() * (8 - 1) + 1;
        this.game.time.events.add(Phaser.Timer.SECOND * this.seededTimer, this._randomMovement, this);
    }

    _randomMovement() {
        this.randomspeed = Math.random() * (13 - 2) + 2;
        this.randomangle = Math.random() * (361 - 0) + 0;
        console.log('Random Movement fired. Speed is : ' + this.randomspeed + 'Angle is: ' + this.randomangle);
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