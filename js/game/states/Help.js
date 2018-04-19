
WizardClash.Help = function() {};


var startButtonPressed;
var backButtonPressed;




WizardClash.Help = function() {
   this.stamina = 100;
    this.potionAmount = 3;
    
}

WizardClash.Help.prototype = {
  create: function() {
      
      
            //this.background = game.add.tileSprite(0, 0, game.width, game.height, 'helpscreen');
      this.background = game.add.sprite(0, 0, 'helpscreen');
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
      this.directionalPad = game.add.sprite(100, 300, 'directionalpad');
      
      this.runIcon = game.add.sprite(100, 540, 'runbutton');
      this.fireIcon = game.add.sprite(1300, 200, 'fireicon');
      this.shieldIcon = game.add.sprite(1500, 200, 'shieldicon');
      this.healthIcon = game.add.sprite(1400, 500, 'healthicon');
      
      
      this.staminaText = this.game.add.bitmapText(360, 550, 'minecraftia', 'Stamina: 100', 32);
       this.potionAmountText = this.game.add.bitmapText(1470, 550, 'minecraftia', '3', 32);
      
      this.wizardwalk = game.add.sprite(200, 250, 'wizard');
      this.wizardwalk.scale.setTo(0.67, 0.67);
      
      this.wizardrun = game.add.sprite(200, 475, 'wizard');
      this.wizardrun.scale.setTo(0.67, 0.67);
      
      this.dragon = game.add.sprite(150, 720, 'dragon');
      this.dragon2 = game.add.sprite(200, 720, 'dragon');
      this.dragon3 = game.add.sprite(250, 720, 'dragon');
      this.coin = game.add.sprite(150, 950, 'coin');
      this.coin2 = game.add.sprite(180, 950, 'coin');
      this.coin3 = game.add.sprite(210, 950, 'coin');
      
      this.wizardwalk.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8]);
      
      this.wizardrun.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8]);
      this.wizardrun.animations.add('run', [10, 11, 12, 13, 14, 15, 16]);
      
      this.dragon.animations.add('fly');
      this.dragon2.animations.add('fly');
      this.dragon3.animations.add('fly');
      
      this.coin.animations.add('coinSpin');
      this.coin2.animations.add('coinSpin');
      this.coin3.animations.add('coinSpin');
      
      
      this.backButton = this.game.add.button(1200, 900, 'backbutton');
      this.backButton.scale.setTo(0.67, 0.67);
      this.backButton.tint = 0x8B0000;
      
      this.startButton = this.game.add.button(1550, 900, 'startbutton');
      this.startButton.scale.setTo(0.67, 0.67);
      this.startButton.tint = 0x8B0000;
      
      
      
      
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
      
    
     
      
      
      
      this.backButton.events.onInputOver.add(function() {
            backButtonPressed = true;
        });
        this.backButton.events.onInputOut.add(function() {
            backButtonPressed = false;
        });
        this.backButton.events.onInputDown.add(function() {
            backButtonPressed = true;
        });
        this.backButton.events.onInputUp.add(function() {
            backButtonPressed = false;
        });
        
        
      
      
      
      
      
      
    
      

   


  }, 
    
update: function() {
    
     this.wizardwalk.animations.play('walk', 12, true);
    
     this.wizardrun.animations.play('run', 12, true);
    
    this.dragon.animations.play('fly', 12, true);
    this.dragon2.animations.play('fly', 12, true);
    this.dragon3.animations.play('fly', 12, true);
    
    this.coin.animations.play('coinSpin', 12, true);
    this.coin2.animations.play('coinSpin', 12, true);
    this.coin3.animations.play('coinSpin', 12, true);
    
  
    
    this.staminaText.text = 'Stamina: ' + parseInt(this.stamina);
    
    this.stamina = this.stamina - 0.125;
    
    if(this.stamina < 0) {
        this.stamina = 0;
        this.wizardrun.animations.play('walk', 12, true);
    }
    
    
    
    if(startButtonPressed) {
        this.stamina = 100;
        this.game.state.start('Game');
        startButtonPressed = false;
    }
    
    
    if(backButtonPressed) {
        this.stamina = 100;
       this.game.state.start('MainMenu');
        backButtonPressed = false;
    }
    
    
}

};
