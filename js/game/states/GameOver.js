WizardClash.GameOver = function() {};

var buttonPressed = false;

WizardClash.GameOver.prototype = {
  create: function() {
      
      
    this.background = game.add.tileSprite(0, 0, game.width, game.height, 'gameover');
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
      
    



  }, 
    
update: function() {
    if(this.game.input.activePointer.justPressed()) {
        buttonPressed = true;
        
        if(buttonPressed === true) {
        this.game.state.start('MainMenu');
            buttonPressed = false;
            
        }
    }
}
};



