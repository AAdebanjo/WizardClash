WizardClash.Preload = function() {
    this.ready = false;
};

WizardClash.Preload.prototype = {
    preload: function() {

        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo'); //splash image is displayed
        this.splash.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar'); //preloadBar is displayed
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar); //tell preload to use preloadbar as the sprite to show progress
        //phaser will automatically adjust the clipping of the preload image to be the same size as the percent of data we need to load and have already loaded

        this.load.image('background', 'assets/backgrounds/menubackground.png');
        this.load.image('foreground', 'assets/backgrounds/forestredone2.png'); //tell state to load images, spritesheets and audio
        this.load.image('helpscreen', 'assets/backgrounds/helpscreen2.png');
        this.load.image('gameover', 'assets/backgrounds/gameover.png');

        this.load.spritesheet('wizard', 'assets/spritesheets/wizard_1.png', 320, 320);
        this.load.spritesheet('fireball', 'assets/spritesheets/fireball.png', 100, 100);
        this.load.spritesheet('shield', 'assets/spritesheets/shield.png', 300, 300);
        this.load.spritesheet('coin', 'assets/spritesheets/coin.png', 100, 100);
        this.load.spritesheet('dragon', 'assets/spritesheets/dragon.png', 200, 200);

        this.load.image('heart', 'assets/sprites/heart.png');
        this.load.image('shieldicon', 'assets/sprites/shieldicon.png');
        this.load.image('fireicon', 'assets/sprites/fireicon.png');
        this.load.image('runbutton', 'assets/sprites/runbutton.png');
        this.load.image('healthicon', 'assets/sprites/healthicon.png');
        this.load.image('directionalpad', 'assets/sprites/directionalpad.png');
        
        this.load.image('directionalpadup', 'assets/sprites/directionalpadup.png');
        this.load.image('directionalpaddown', 'assets/sprites/directionalpaddown.png');
        this.load.image('directionalpadleft', 'assets/sprites/directionalpadleft.png');
        this.load.image('directionalpadright', 'assets/sprites/directionalpadright.png');
        
        this.load.image('backbutton', 'assets/sprites/backbutton.png');
        this.load.image('easybutton', 'assets/sprites/easybutton.png');
        this.load.image('normalbutton', 'assets/sprites/normalbutton.png');
        this.load.image('hardbutton', 'assets/sprites/hardbutton.png');
        this.load.image('helpbutton', 'assets/sprites/helpbutton.png');
        this.load.image('normalbutton', 'assets/sprites/helpbutton.png');
        this.load.image('startbutton', 'assets/sprites/startbutton.png');

        this.load.audio('introMusic', ['assets/audio/gameintro.mp3', 'assets/audio/gameintro.ogg']);
        this.load.audio('level1', ['assets/audio/level1music.mp3', 'assets/audio/level1music.ogg']);

        this.load.audio('coin', ['assets/audio/coin.mp3', 'assets/audio/coin.ogg']);
        this.load.audio('fireball', ['assets/audio/fireball.mp3', 'assets/audio/fireball.ogg']);
        this.load.audio('heart', ['assets/audio/heart.mp3', 'assets/audio/heart.ogg']);
        this.load.audio('jewel', ['assets/audio/jewel.mp3', 'assets/audio/jewel.ogg']);
        this.load.audio('castspell', ['assets/audio/magic1.mp3', 'assets/audio.magic1.ogg']);
        this.load.audio('shield', ['assets/audio/magicshield.mp3', 'assets/audio/magicshield.ogg']);
        this.load.audio('hit', ['assets/audio/hit.mp3', 'assets/audio/hit.ogg']);
        this.load.audio('explosion', ['assets/audio/explosion.mp3', 'assets/audio/explosion.ogg']);


        this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia/minecraftia.png', 'assets/fonts/minecraftia/minecraftia.xml');

        this.load.onLoadComplete.add(this.onLoadComplete, this);
        //when everything is fully loaded, call the onLoadComplete funciton


    },
    create: function() {
        this.preloadBar.cropEnabled = false; //makes sure that the preload bar doesnt get out of hand once we decode everything
    },
    update: function() {
        if (this.cache.isSoundDecoded('introMusic') && this.ready === true) { //when update runs, it will check to see if the sound is decoedd and whether or not we are ready to play the game based on how many assets we have loaded. When all of this is ready, the game will start the "Main Menu" state.
            this.state.start('MainMenu');
        }
    },
    onLoadComplete: function() {
        this.ready = true; //sets ready to true
    }

};