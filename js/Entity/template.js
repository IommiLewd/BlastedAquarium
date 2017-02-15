class userInterface extends Phaser.Sprite {
    constructor(game, posx, posy, effectType) {
        super(game, posx, posy, 'anchor', effectType;
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5);
       
    }

    update() {

    }
}

