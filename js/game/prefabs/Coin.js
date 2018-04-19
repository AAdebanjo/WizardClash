var Coin = function(game, x, y, key, frame) {
    key = 'coin';
    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.animations.add('coinSpin');

    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;

    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;

    this.events.onKilled.add(this.onKilled, this);
    this.events.onRevived.add(this.onRevived, this);
    
    
};

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;



Coin.prototype.onRevived = function() {
    this.body.velocity.x = -700;
    this.animations.play('coinSpin', 12, true);
    this.body.setSize(50, 50, 15, 25);
    
};

Coin.prototype.onKilled = function() {
    this.animations.frame = 0;
}