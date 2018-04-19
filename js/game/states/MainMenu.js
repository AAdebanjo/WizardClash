WizardClash.MainMenu = function() {};

var startButtonPressed;
var helpButtonPressed;

WizardClash.MainMenu.prototype = {
  create: function() { 
      this.background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
      this.background.autoScroll(-100, 0)
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
     this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
     this.splash.anchor.setTo(0.5);
      
      this.startText = this.game.add.bitmapText(0, 0, 'minecraftia', 'Click a button.', 32);
      this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
      this.startText.y = this.game.height / 2 + this.splash.height / 2;
    
      this.startButton = this.game.add.button(730, 700, 'startbutton');
      this.startButton.scale.setTo(0.75, 0.75);
      
      this.helpButton = this.game.add.button(730, 880, 'helpbutton');
      this.helpButton.scale.setTo(0.75, 0.75);
      
       this.startButton.events.onInputOver.add(function() {
            startButtonPressed = true;
        });
        this.startButton.events.onInputOut.add(function() {
            startButtonPressed = false;
        });
        this.startButton.events.onInputDown.add(function() {
            startButtonPressed = true;
        });
        this.startButton.events.onInputUp.add(function() {
            startButtonPressed = false;
        });
       
       this.helpButton.events.onInputOver.add(function() {
            helpButtonPressed = true;
        });
        this.helpButton.events.onInputOut.add(function() {
            helpButtonPressed = false;
        });
        this.helpButton.events.onInputDown.add(function() {
            helpButtonPressed = true;
        });
        this.helpButton.events.onInputUp.add(function() {
            helpButtonPressed = false;
        });
  }, 
    
update: function() {
    if(startButtonPressed) {
        this.game.state.start('Difficulty');
        startButtonPressed = false;
        
    } 
    
    if(helpButtonPressed) {
        this.game.state.start('Help');
        helpButtonPressed = false;
    }
}
};



