var Enemy = function(game, x, y, key, frame) {
    key = 'dragon';
    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.scale.x = -1;

    this.animations.add('fly');

    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;

    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;

    this.events.onRevived.add(this.onRevived, this);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.onRevived = function() {
    //this.body.velocity.x = -600;
    this.animations.play('fly', 12, true);
    this.body.setSize(160, 60, 40, 80);
    //this.game.physics.arcade.angleBetween(nuke, this.alien)
    


};