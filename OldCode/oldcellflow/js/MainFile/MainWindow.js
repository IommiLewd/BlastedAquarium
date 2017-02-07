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

    _spawnIntruder() {
        this.randomX = Math.random() * (1025 - 615) + 615;
        this.randomY = Math.random() * (1025 - 615) + 615;
        this.hostileCell = new HostileCell(this.game, this.randomX, this.randomY);
        this.hostileCellGroup.add(this.hostileCell);

        this.cameraTarget = new CameraTarget(this.game, this.randomX, this.randomY);
        this.camera.follow(this.cameraTarget);

        // this.cameraTarget.body.velocity.y = 30;
    }


    _spawnNeutralCell() {
        this.randomX = Math.random() * (1225 - 15) + 415;
        this.randomY = Math.random() * (1225 - 415) + 415;
        this.neutralCell = new NeutralCell(this.game, this.randomX, this.randomY);
        this.neutralCellGroup.add(this.neutralCell);
    }

    _rangeEvent(hostileCell, neutralCell) {
        console.log('range Event firing!!!!');
        hostileCell.engaging = true;
        neutralCell.body.moves = false;
        hostileCell.targetCellX = neutralCell.x;
        hostileCell.targetCellY = neutralCell.y;
    }


    _assimilationEvent(hostileCell, neutralCell) {
        hostileCell.movementSpeed = 2;
        hostileCell.targetCellX = neutralCell.x;
        hostileCell.targetCellY = neutralCell.y;
        if (hostileCell.x + 5 > neutralCell.x && hostileCell.x - 5 < neutralCell.x) {
            if (hostileCell.y + 5 > neutralCell.y && hostileCell.y - 5 < neutralCell.y) {
                if (neutralCell.notDead) {
                    hostileCell.body.moves = false;
                }
                this.tweenA = this.game.add.tween(this.cameraTarget).to({
                    x: neutralCell.x,
                    y: neutralCell.y
                }, 12000, "Quart.easeOut");
                this.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                    if (neutralCell.alive && neutralCell.notDead) {
                        this.hostileCell = new HostileCell(this.game, neutralCell.x, neutralCell.y);
                        this.tweenA.start();
                        this.hostileCellGroup.add(this.hostileCell);
                        hostileCell.movementSpeed = 15;
                    }
                    neutralCell._destroyFunction();
                }, this);

            }
        }
        if (neutralCell.notDead) {
            hostileCell.engaging = true;
        } else {
            hostileCell.engaging = false;
        }

    }

    _collisionHandler() {
        this.game.physics.arcade.collide(this.neutralCellGroup);
        this.game.physics.arcade.overlap(this.hostileCellGroup, this.neutralCellGroup, this._assimilationEvent, null, this);
    }

    create() {

        //        this.game.world.bounds.setTo(0, 0, 840, 560); //Original
        //        this.camera.world.bounds.setTo(0, 0, 840, 560); //Original
        this.background = this.game.add.tileSprite(0, 0, 1600, 1600, 'backgroundimage'); //Original
        this.backgroundOverlay = this.game.add.tileSprite(0, 0, 1600, 1600, 'backgroundOverlay'); //Overlay
        this.game.world.bounds.setTo(0, 0, 1600, 1600); //testVersion
        this.game.camera.bounds.setTo(0, 0, 1600, 1600); //testVersion

        this.game.physics.setBoundsToWorld();



        this.neutralCellGroup = this.add.group();
        this.hostileCellGroup = this.add.group();
        console.log('MainWindow Fired');
        for (this.i = 0; this.i < 220; this.i++) {
            this._spawnNeutralCell();
        }
        this._spawnIntruder();


        //        this.game.physics.enable(this.cameraTarget);
        this.camera.follow(this.cameraTarget, Phaser.Camera.FOLLOW_TOPDOWN);



    }


    update() {
        this._collisionHandler();
        this.backgroundOverlay.x = this.game.camera.x * 0.3;
        this.backgroundOverlay.y = this.game.camera.y * 0.3;
        //this.game.camera.focusOnXY(this.cameraTarget.x, this.cameraTarget.y);
    }
}