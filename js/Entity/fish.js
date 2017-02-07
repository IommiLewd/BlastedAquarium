class Fish extends Phaser.Sprite {
        constructor(game, posx, posy) {
            super(game, posx, posy, 'anchor', 0);
            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.collideWorldBounds = true;
            this.anchor.setTo(0.5);
            this.inputEnabled = true;
            this._assignName();
            this._randomMovement();
            this._initInfoBox();
            this.capturedX = 0;
            this.capturedY = 0;
            this.hunger = 100;
            this.model = this.game.add.sprite(0, 0, 'fish');
            this.addChild(this.model);
            this.model.anchor.setTo(0.5);
       
        }

        _initInfoBox() {
            this.infoBox = this.game.add.image(0, -80, 'infoBox');
            this.addChild(this.infoBox);
            this.infoBox.anchor.setTo(0.5);
            this.defaultStyle = { font: "14px Press Start 2P", align: "left", fill: "#7e7e85" };
            this.goldStyle = { font: "14px Press Start 2P", align: "left", fill: "#d4ae53" };
            
            this.nameText = this.game.add.text(-6, -109, this.chosenName, this.defaultStyle);
            this.typeText = this.game.add.text(-6, -86, "The Guppy", this.goldStyle);
            this.ageText = this.game.add.text(-46, -66, "Age", this.defaultStyle);
            this.ageTextNumber = this.game.add.text(50, -66, "0", this.goldStyle);
            this.hungerText = this.game.add.text(-26, -46, "Hunger", this.defaultStyle);
            this.hungerBar = this.game.add.sprite(22, -51, 'hungerBar');
            this.hungerPixel = this.game.add.tileSprite(26, -49, 30, 2, 'hungerPixel');
            
            this.nameText.anchor.setTo(0.5);
            this.typeText.anchor.setTo(0.5);
            this.ageText.anchor.setTo(0.5);
            this.ageTextNumber.anchor.setTo(0.5);
            this.hungerText.anchor.setTo(0.5);
            
            this.addChild(this.nameText);
            this.addChild(this.typeText);
            this.addChild(this.ageText);
            this.addChild(this.ageTextNumber);
            this.addChild(this.hungerText);
            this.addChild(this.hungerBar);
            this.addChild(this.hungerPixel);
            }


            _timerFunction() {
                this.seededTimer = Math.random() * (8 - 1) + 1;
                this.game.time.events.add(Phaser.Timer.SECOND * this.seededTimer, this._randomMovement, this);
            }
            
            _assignName() {
                this.names = ['Bob', 'Dave', 'Priscilla', 'Rosa', 'Tommy', 'Haddock', 'Bjorn', 'Ida', 'Lone', 'Reed', 'Morgan'];
                this.chosenName = this.names[Math.floor(Math.random() * this.names.length)];
                console.log(this.chosenName);
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
                } else {
                    this.infoBox.visible = false;
                     this.typeText.visible = false;
                    this.ageText.visible = false;
                         this.ageTextNumber.visible = false;
                    this.hungerText.visible = false;
                    this.nameText.visible = false;
                    this.hungerBar.visible = false;
                    this.hungerPixel.visible = false;
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

            }
        */