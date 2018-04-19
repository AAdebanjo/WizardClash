WizardClash.Difficulty = function() {};

var normalButtonPressed;
var hardButtonPressed;

WizardClash.Difficulty.prototype = {
  create: function() {
      
      
            this.background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
      this.background.autoScroll(-100, 0)
                    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
      
      
      
      this.normalButton = this.game.add.button(200, 700, 'normalbutton');
      this.normalButton.scale.setTo(0.75, 0.75);
      
      this.hardButton = this.game.add.button(1400, 700, 'hardbutton');
      this.hardButton.scale.setTo(0.75, 0.75);
      
       this.normalButton.events.onInputOver.add(function() {
            normalButtonPressed = true;
        });
        this.normalButton.events.onInputOut.add(function() {
            normalButtonPressed = false;
        });
        this.normalButton.events.onInputDown.add(function() {
            normalButtonPressed = true;
        });
        this.normalButton.events.onInputUp.add(function() {
            normalButtonPressed = false;
        });
      
      
       this.hardButton.events.onInputOver.add(function() {
            hardButtonPressed = true;
        });
        this.hardButton.events.onInputOut.add(function() {
            hardButtonPressed = false;
        });
        this.hardButton.events.onInputDown.add(function() {
            hardButtonPressed = true;
        });
        this.hardButton.events.onInputUp.add(function() {
            hardButtonPressed = false;
        });



  }, 
    
update: function() {
    if(normalButtonPressed) {
        this.game.state.start('Game');
        normalButtonPressed = false;
        
    } 
    
    if(hardButtonPressed) {
        this.game.state.start('GameHard');
        hardButtonPressed = false;
    }
}
};



