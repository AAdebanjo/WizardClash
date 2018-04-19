
var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, '');


game.global = {
    wizard
}


game.state.add('Boot', WizardClash.Boot);
game.state.add('Preload', WizardClash.Preload);
game.state.add('MainMenu', WizardClash.MainMenu);
game.state.add('Difficulty', WizardClash.Difficulty);
game.state.add('Game', WizardClash.Game);
game.state.add('GameHard', WizardClash.GameHard);
game.state.add('Help', WizardClash.Help);
game.state.add('GameOver', WizardClash.GameOver);

game.state.start('Boot');


/*
game.state.add('state0', demo.state0);
game.state.add('state1', demo.state1);
game.state.add('state2', demo.state2);
game.state.add('state3', demo.state3);
game.state.add('state4', demo.state4);
game.state.add('state5', demo.state5);
game.state.add('state6', demo.state6);
game.state.add('state7', demo.state7);
game.state.add('state8', demo.state8);
game.state.add('state9', demo.state9);

*/

