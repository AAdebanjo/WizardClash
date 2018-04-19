var WizardClash = function() {};

WizardClash.Boot = function() {};

WizardClash.Boot.prototype = {
  preload: function() {
      this.load.image('logo', 'assets/sprites/logo.png');
      this.load.image('preloadbar', 'assets/sprites/preloader-bar.png');
  },
    create: function() {
        
         game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        
        this.game.stage.backgroundColor = '#000';
        
        this.input.maxPointers = 1;
        
        if (this.game.device.desktop) {
            this.scale.pageAlignHorizontally = true;
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 640;
            this.scale.minHeight = 480;
            this.scale.maxWidth = 1920;
            this.scale.maxHeight = 1080;
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize(true);
        }
        
        this.state.start('Preload');
        //this.state.start('Preloader');
    }
};