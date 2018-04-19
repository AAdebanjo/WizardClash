var demo = {};
var centreX = 1920 / 2;
var centreY = 1080 / 2;
var wizard;
var charSpeed = 5;

var shield;
var shieldDuration = 0;
var shieldTime = 0;
var usingShield = false;

var fireballs;

var fireballTime = 0;
var potionTime = 0;

var coin;

var fireIcon;
var shieldIcon;
var runIcon;
var potionIcon;

var fireTimer;
var shieldTimer;
var runTimer;

var directionalUp;
var directionalDown;
var directionalLeft;
var directionalRight;

var up = false;
var down = false;
var left = false;
var right = false;

var fireButtonPressed = false;
var shieldButtonPressed = false;
var potionButtonPressed = false;
var runButtonPressed = false;


var playerIsDead = false;


WizardClash.Game = function() {
    this.coinRate = 2000;
    this.coinTimer = 0;

    this.enemyRate = 1000;
    this.enemyTimer = 0;

    this.health = 100;
    this.stamina = 100;
    this.score = 0;

    this.potionAmount = 3;
};



WizardClash.Game.prototype = {
    create: function() {
//Code for the level's world and its bounds

        foreground = game.add.tileSprite(0, 0, 15360, game.height, 'foreground');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#8B0000';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        addChangeStateEventListeners(); //used for testing purposes
        game.world.setBounds(0, 0, 4000, 1080);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
//--------------------------------------------------------------------------------------------------------------------------
//WIZARD INITIALIZATION

        wizard = this.game.add.sprite(centreX, centreY, 'wizard'); //the character has been taken from a spritesheet
        wizard.anchor.setTo(0.5, 0.5);
        wizard.scale.setTo(0.67, 0.67);
        game.physics.enable(wizard);
        wizard.body.collideWorldBounds = true; //prevents the character from leaving the bounds of the level
        wizard.body.setSize(101, 160, 106, 80); //for collision - the individual sprites for the character have a lot of "whitespace", this statement makes interaction between other objects more believable 
        
//--------------------------------------------------------------------------------------------------------------------------
//WIZARD ANIMATIONS

        wizard.animations.add('idle', [0]);
        wizard.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8]);
        wizard.animations.add('run', [10, 11, 12, 13, 14, 15, 16]);
        wizard.animations.add('attack', [17, 18, 19, 20]);
        wizard.animations.add('die', [23, 24, 25, 26, 27]);
        
//--------------------------------------------------------------------------------------------------------------------------
//GAME BUTTON INITIALIZATION
        
        fireIcon = this.game.add.button(1780, 750, 'fireicon');
        fireIcon.fixedToCamera = true;
        fireIcon.scale.setTo(1.5, 1.5);

        shieldIcon = this.game.add.button(1650, 810, 'shieldicon');
        shieldIcon.fixedToCamera = true;
        shieldIcon.scale.setTo(1.5, 1.5);

        runIcon = this.game.add.button(1760, 900, 'runbutton');
        runIcon.fixedToCamera = true;
        runIcon.scale.setTo(1.75, 1.75);

        potionIcon = this.game.add.button(1590, 940, 'healthicon');
        potionIcon.fixedToCamera = true;
        potionIcon.scale.setTo(1.5, 1.5);
        
//--------------------------------------------------------------------------------------------------------------------------
//DIRECTIONAL PAD INITIALIZATION


        directionalUp = this.game.add.button(100, 800, 'directionalpadup', null, this, 0, 1, 0, 1);
        directionalUp.fixedToCamera = true;
        directionalUp.scale.setTo(2, 2);
        directionalUp.alpha = 0.75;

        directionalLeft = this.game.add.button(18, 885, 'directionalpadleft', null, this, 0, 1, 0, 1);
        directionalLeft.fixedToCamera = true;
        directionalLeft.scale.setTo(2, 2);
        directionalLeft.alpha = 0.75;

        directionalRight = this.game.add.button(170, 885, 'directionalpadright', null, this, 0, 1, 0, 1);
        directionalRight.fixedToCamera = true;
        directionalRight.scale.setTo(2, 2);
        directionalRight.alpha = 0.75;

        directionalDown = this.game.add.button(100, 955, 'directionalpaddown', null, this, 0, 1, 0, 1);
        directionalDown.fixedToCamera = true;
        directionalDown.scale.setTo(2, 2);
        directionalDown.alpha = 0.75;
        
//--------------------------------------------------------------------------------------------------------------------------
//DIRECTIONAL BUTTON(S) TOUCH CONTROLS

        
        directionalUp.events.onInputOver.add(function() {
            up = true;
        });
        directionalUp.events.onInputOut.add(function() {
            up = false;
        });
        directionalUp.events.onInputDown.add(function() {
            up = true;
        });
        directionalUp.events.onInputUp.add(function() {
            up = false;
        });


        directionalLeft.events.onInputOver.add(function() {
            left = true;
        });
        directionalLeft.events.onInputOut.add(function() {
            left = false;
        });
        directionalLeft.events.onInputDown.add(function() {
            left = true;
        });
        directionalLeft.events.onInputUp.add(function() {
            left = false;
        });


        directionalRight.events.onInputOver.add(function() {
            right = true;
        });
        directionalRight.events.onInputOut.add(function() {
            right = false;
        });
        directionalRight.events.onInputDown.add(function() {
            right = true;
        });
        directionalRight.events.onInputUp.add(function() {
            right = false;
        });



        directionalDown.events.onInputOver.add(function() {
            down = true;
        });
        directionalDown.events.onInputOut.add(function() {
            down = false;
        });
        directionalDown.events.onInputDown.add(function() {
            down = true;
        });
        directionalDown.events.onInputUp.add(function() {
            down = false;
        });


//--------------------------------------------------------------------------------------------------------------------------
//GAME BUTTON TOUCH CONTROLS 


        fireIcon.events.onInputOver.add(function() {
            fireButtonPressed = true;
        });
        fireIcon.events.onInputOut.add(function() {
            fireButtonPressed = false;
        });
        fireIcon.events.onInputDown.add(function() {
            fireButtonPressed = true;
        });
        fireIcon.events.onInputDown.add(function() {
            fireButtonPressed = false;
        });


        shieldIcon.events.onInputOver.add(function() {
            shieldButtonPressed = true;
        });
        shieldIcon.events.onInputOut.add(function() {
            shieldButtonPressed = false;
        });
        shieldIcon.events.onInputDown.add(function() {
            shieldButtonPressed = true;
        });
        shieldIcon.events.onInputDown.add(function() {
            shieldButtonPressed = false;
        });


        potionIcon.events.onInputOver.add(function() {
            potionButtonPressed = true;
        });
        potionIcon.events.onInputOut.add(function() {
            potionButtonPressed = false;
        });
        potionIcon.events.onInputDown.add(function() {
            potionButtonPressed = true;
        });
        potionIcon.events.onInputDown.add(function() {
            potionButtonPressed = false;
        });


        runIcon.events.onInputOver.add(function() {
            runButtonPressed = true;
        });
        runIcon.events.onInputOut.add(function() {
            runButtonPressed = false;
        });
        runIcon.events.onInputDown.add(function() {
            runButtonPressed = true;
        });
        runIcon.events.onInputDown.add(function() {
            runButtonPressed = false;
        });


//--------------------------------------------------------------------------------------------------------------------------
//GROUP INITIALIZATION

        fireballs = game.add.group();
        fireballs.enableBody = true;
        fireballs.physicsBodyType = Phaser.Physics.ARCADE;
        fireballs.createMultiple(20, 'fireball');
        fireballs.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetFireball);
        fireballs.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
        fireballs.setAll('checkWorldBounds', true);

        this.coins = this.game.add.group();
        this.enemies = this.game.add.group();

//--------------------------------------------------------------------------------------------------------------------------
//HUD SETUP

        this.scoreText = this.game.add.bitmapText(10, 10, 'minecraftia', 'Score: 0', 40);
        this.healthText = this.game.add.bitmapText(10, 70, 'minecraftia', 'Health: 100', 40);
        this.staminaText = this.game.add.bitmapText(10, 120, 'minecraftia', 'Stamina: 100', 40);
        this.potionAmountText = this.game.add.bitmapText(1700, 1000, 'minecraftia', '3', 40);


        var containerScore = this.game.add.sprite(); //converts the bitmap to a sprite and "fixes" it to the camera - it will always stay in the same position on the hud
        containerScore.fixedToCamera = true; 

        var containerStamina = this.game.add.sprite();
        containerStamina.fixedToCamera = true;

        var containerHealth = this.game.add.sprite();
        containerHealth.fixedToCamera = true;

        var containerPotion = this.game.add.sprite();
        containerPotion.fixedToCamera = true;


        containerScore.addChild(this.scoreText); 
        containerStamina.addChild(this.staminaText);
        containerHealth.addChild(this.healthText);
        containerPotion.addChild(this.potionAmountText);

//--------------------------------------------------------------------------------------------------------------------------
//BACKGROUND MUSIC AND SFX INITIALIZATION

        this.coinSound = this.game.add.audio('coin');
        shieldSound = this.game.add.audio('shield');
        fireballSound = this.game.add.audio('fireball');
        castSound = this.game.add.audio('castspell');
        heartSound = this.game.add.audio('heart');
        hurtSound = this.game.add.audio('hit');
        enemyhitSound = this.game.add.audio('explosion');
        backgroundSound = this.game.add.audio('level1');
        
        backgroundSound.play();
        backgroundSound.volume = 0.4;


//--------------------------------------------------------------------------------------------------------------------------

        game.camera.follow(wizard); //the camera will always follow the "wizard" sprite
        game.camera.deadzone = new Phaser.Rectangle(centreX - 500, 0, 600, 720); //if the "wizard" sprite is outside of the deadzone, the camera will stop following it
        
//--------------------------------------------------------------------------------------------------------------------------




    },
    
    

    update: function() {
        
        
        
        
        
        if (this.health <= 0) {
            
            playerIsDead = true;
        }
        
        if(playerIsDead === true) {
            
            backgroundSound.stop();
            this.game.state.start("GameOver");
            this.health = 100;
            this.stamina = 100;
            playerIsDead = false;
        }
        

 //--------------------------------------------------------------------------------------------------------------------------       

        this.stamina = this.stamina + 0.0625; //slowly refills the stamina gauge if the player is not running
        this.staminaText.text = 'Stamina: ' + parseInt(this.stamina); //converts the stamina variable from double to int

        if (this.stamina >= 100) {
            this.stamina = 100; //limits the maximum amount of stamina that the player can have
        }


        if ((game.input.keyboard.isDown(Phaser.Keyboard.S)) || (runButtonPressed)) {
            runIcon.alpha = 0.5; //provides some form of visual feedback for smartphone/tablet players
        } else {
            runIcon.alpha = 1;
        }

//--------------------------------------------------------------------------------------------------------------------------
        //PLAYER MOVEMENT

        if ((!game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) && (!game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) && (!game.input.keyboard.isDown(Phaser.Keyboard.UP)) && (!game.input.keyboard.isDown(Phaser.Keyboard.DOWN))) { //the character can only cast spells and use items if they are not moving
            if ((game.input.keyboard.isDown(Phaser.Keyboard.A)) || (fireButtonPressed)) { //if either the "A" keyboard button or the virtual "fire" button are pressed...
                wizard.animations.play('attack', 12, false);
                fireFireball();
            } else if ((game.input.keyboard.isDown(Phaser.Keyboard.D)) || (shieldButtonPressed)) {
                shieldUp();

            } else if (((game.input.keyboard.isDown(Phaser.Keyboard.H)) || (potionButtonPressed)) && (this.potionAmount > 0)) { //places a limit on the amount of potions that the player can use in a single playthrough
                this.usePotion();

            } else {
                wizard.animations.play('idle');
            }
        }



        if ((game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) || (right)) {

            if ((game.input.keyboard.isDown(Phaser.Keyboard.S) || (runButtonPressed)) && (this.stamina >= 0)) {


                this.stamina = this.stamina - 0.25;

                this.staminaText.text = 'Stamina: ' + parseInt(this.stamina);

                wizard.scale.setTo(0.67, 0.67);
                wizard.animations.play('run', 12, true); //player can only run if they have stamina
                wizard.x += charSpeed * 2;
            } else {
                wizard.scale.setTo(0.67, 0.67);
                wizard.x += charSpeed;
                wizard.animations.play('walk', 12, true);

            }



        } else if ((game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) || (left)) {

            if ((game.input.keyboard.isDown(Phaser.Keyboard.S) || (runButtonPressed)) && (this.stamina >= 0)) {

                this.stamina = this.stamina - 0.25;

                this.staminaText.text = 'Stamina: ' + parseInt(this.stamina);

                wizard.scale.setTo(-0.67, 0.67);
                wizard.animations.play('run', 12, true);
                wizard.x -= charSpeed * 2;
            } else {
                wizard.scale.setTo(-0.67, 0.67);
                wizard.x -= charSpeed;
                wizard.animations.play('walk', 12, true);

            }

        }


        if ((game.input.keyboard.isDown(Phaser.Keyboard.UP)) || (up)) {
            if ((game.input.keyboard.isDown(Phaser.Keyboard.S) || (runButtonPressed)) && (this.stamina >= 0)) {


                this.stamina = this.stamina - 0.25;

                this.staminaText.text = 'Stamina: ' + parseInt(this.stamina);

                wizard.animations.play('run', 12, true);
                wizard.y -= charSpeed * 2;
            } else {
                wizard.y -= charSpeed;
                wizard.animations.play('walk', 12, true);

            }

            if (wizard.y < 175) {
                wizard.y = 175;
            }
        } else if ((game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) || (down)) {
            if ((game.input.keyboard.isDown(Phaser.Keyboard.S) || (runButtonPressed)) && (this.stamina >= 0)) {


                this.stamina = this.stamina - 0.25;

                this.staminaText.text = 'Stamina: ' + parseInt(this.stamina);

                wizard.animations.play('run', 12, true);
                wizard.y += charSpeed * 2;
            } else {
                wizard.y += charSpeed;
                wizard.animations.play('walk', 12, true);

            }

            if (wizard.y > 750) {
                wizard.y = 750;
            }
        }


//--------------------------------------------------------------------------------------------------------------------------
        //GROUP MEMBER GENERATION

        if (this.coinTimer < this.game.time.now) {
            this.createCoin(); //if a certain amount of time passes, a new coin will be generated
            this.coinTimer = this.game.time.now + this.coinRate;
        }


        if (this.enemyTimer < this.game.time.now) {
            this.createEnemy(); //if a certain amount of time passes, and there are less than 10 enemies in the game, a new enemy will be generated
            this.enemyTimer = this.game.time.now + this.enemyRate;
        }
        
//--------------------------------------------------------------------------------------------------------------------------
        //COLLISION

        this.game.physics.arcade.overlap(this.coins, wizard, this.coinHit, null, this); //the coinHit function handles the player colliding with a coin

        this.game.physics.arcade.overlap(this.enemies, wizard, this.enemyHit, null, this); //the enemyHit function handles the player colliding with an enemy

        this.game.physics.arcade.overlap(this.enemies, fireballs, this.fireballHit, null, this); //the fireballHit function handles the player's fireball colliding with an enemy


//--------------------------------------------------------------------------------------------------------------------------

    },

    createCoin: function() {
        var x = 4500;
        var y = this.game.rnd.integerInRange(175, 700); //a generated coin will have a random y position; the minimum/maximum values are within the bounds of the "road" that the wizard is restricted to movement-wise

        coin = this.coins.getFirstExists(false);



        if (!coin) {
            coin = new Coin(this.game, 0, 0);
            this.coins.add(coin); //adds a new coin to the "coins" group
        }



        coin.reset(x, y);
        coin.revive();
    },



    createEnemy: function() {
        var x = 4000; //enemies will generate here
        var y = this.game.rnd.integerInRange(175, 700);

        var enemy = this.enemies.getFirstExists(false);
        var enemiesAlive = this.enemies.countLiving();



        if (enemiesAlive < 10) { //prevents the game from slowing down as a result of a potentially infinite amount of enemies

            if (!enemy) {
                enemy = new Enemy(this.game, 0, 0);
                this.enemies.add(enemy);

            }




            enemy.reset(x, y);
            enemy.revive();


        }

        this.enemies.forEach(function(enemy) {
            game.physics.arcade.moveToObject(enemy, wizard.body, 620); //enemies will follow the player at all times
        });




    },


    coinHit: function(player, coin) {
        this.score = this.score + 10; //the "score" value will increase by 10 everytime a coin is collected
        this.coinSound.play(); //a sound effect will play if the player collides with a coin

        coin.kill(); //the coin will disappear after it has been collected

        this.coins.remove(coin); //the coin will be removed from the group

        this.scoreText.text = 'Score: ' + this.score; //this ensures that the score value will update with the "new" score
    },


    enemyHit: function(player, enemy) {
        if (!wizard.invincible) { //if the player's invincibility frames are not currently playing the moment the player collides with an enemy
            hurtSound.play(); //a sound effect will play

            this.toggleInvincible(); //the player's invincibility frames will be activated; this gives the player time to recover after it has been hit
            this.shake(); //visual feedback
            wizard.tint = 0x8B0000; 
            wizard.alpha = 0.2; //while the player is invincible, the sprites will be slightly transparent

            if (usingShield === true) {
                this.health = this.health - 5; //if the player happened to be inside a shield at the time of collision, damage to its health will be reduced
            } else {
                this.health = this.health - 10;
            }
            this.healthText.text = 'Health: ' + this.health;
            game.time.events.add(2000, this.toggleInvincible, this); //if the player is hit by an enemy, it will be invincible for two seconds before its normal properties are retained
            game.time.events.add(2000, this.restoreTint, this); //this function restores the player's tint at the same time that the player loses its invincibility state



        }
    },




    toggleInvincible: function() {
        wizard.invincible = !wizard.invincible; //if the player is not invisible when it collides with an enemy, the sprite will instantly turn invisible. After two seconds, the player loses its invincibility status
    },

    restoreTint: function() {
        wizard.tint = 0xFFFFFF; //Phaser code used to get rid of a tint in Phaser
        wizard.alpha = 1; //disables the wizard sprite's transparency
    },

    stageReload: function() {
        game.state.start(game.state.current);

    },




    fireballHit: function(fireball, enemy) {
        this.score = this.score + 100; //if the fireball hits an enemy, 100 points will be added to the player's list
        enemyhitSound.play(); //a sound effect will play

        fireball.kill(); //the fireball will disappear
        fireballs.remove(fireball); //the fireball will be removed from the "fireballs" group

        enemy.kill(); //the enemy will disappear
        this.enemies.remove(enemy); //the enemy will be removed from the "enemies" group

        this.scoreText.text = 'Score: ' + this.score; //updates the score
    },



    shake: function() {
        game.camera.shake(0.05, 200); //causes the camera to shake; this will only happen if the player gets hit by an enemy, and the event will last for 200 milliseconds
    },


    usePotion: function() {

        if (game.time.now > potionTime) {

            wizard.tint = 0x32CD32; //the player sprite will turn green

            potionIcon.alpha = 0.5; //the button will also become transparent

            heartSound.play(); // a sound effect will play

            this.potionAmount--; 
            this.potionAmountText.text = this.potionAmount; //the text will change to display the player's remaining potions

            this.health = this.health + 50; //the player's health will increase by 50 points, and the on-screen text will be updated to show this information
            this.healthText.text = 'Health: ' + this.health;

            potionTime = this.game.time.now + 1000; 
            game.time.events.add(Phaser.Timer.SECOND * 1, resetPotionTimer, this); //one second is required to pass before the potion button can be pressed again
            game.time.events.add(Phaser.Timer.SECOND * 1, this.restoreTint, this); //one second is required to pass before the wizard's green tint is removed
        }
    },



    render: function() {
        /*
USED FOR TESTING PURPOSES ONLY
               game.debug.bodyInfo(wizard, 32, 32);

               game.debug.body(wizard);

               this.coins.forEach(this.game.debug.body, this.game.debug);
               this.enemies.forEach(this.game.debug.body, this.game.debug);

               fireballs.forEach(this.game.debug.body, this.game.debug);



           */
    }
};




function resetFireball(fireball) {
    fireball.kill(); //kills the fireball as soon as it collides with an enemy
}



function fireFireball() {

    if (game.time.now > fireballTime) {


        var fireball = fireballs.getFirstExists(false);
        if (fireball) { //if a fireball has been generated
            fireballSound.play("", 0, 0.5, false); //a sound effect will play

            fireball.reset(wizard.x + 60, wizard.y + 25); //the fireball is positioned so that it is directly "on top" of the wizard's staff
            fireball.animations.add('fireShot', [0, 1]); //this animation for the fireball will play
            fireball.animations.play('fireShot', 12, true);
            fireball.body.setSize(65, 47, 20, 25); //for collision purposes


            if (wizard.scale.x < 0) { //if the player is facing left, the fireball's movement and initial coordinates will change
                fireball.reset(wizard.x - 80, wizard.y + 25);
                fireball.scale.x = -1;
                fireball.body.velocity.x = -500;
                fireballTime = game.time.now + 1000; //one second is required to pass before the player is able to cast another fireball

            } else {
                fireball.reset(wizard.x + 60, wizard.y + 25);
                fireball.scale.x = 1;
                fireball.body.velocity.x = 500;
                fireballTime = game.time.now + 1000;
            }
            fireIcon.alpha = 0.5; //the "fire" button will become transparent after a fireball is casted
            game.time.events.add(Phaser.Timer.SECOND, resetFireTimer, this); //a second will pass before the button's transparency is removed
        }

    }
}

function shieldUp() {

    if (game.time.now > shieldTime) {

        shieldIcon.alpha = 0.5; 
        usingShield = true;

        shield = wizard.addChild(game.add.sprite(wizard.x, wizard.y, 'shield')); //the shield will always follow the player

        shieldSound.play("", 0, 0.5, false); //a sound effect will be played

        shield.reset(-150, -130); //initial coordinates for the generated shield
        shield.alpha = 0.2; //the shield is transparent at all times
        shield.animations.add('shieldUp', [0, 1, 2, 3]) //shield animation
        shield.animations.play('shieldUp', 12, true);
        wizard.addChild(shield);
        shieldTime = this.game.time.now + 20000; //twenty seconds will pass before the player is able to cast another shield
        game.time.events.add(Phaser.Timer.SECOND * 5, resetShield, this); //the shield itself will disappear after five seconds
        game.time.events.add(Phaser.Timer.SECOND * 20, resetShieldTimer, this); //the player will be unable to press the shield button again for another twenty seconds
    }

}

function resetShield() {
    usingShield = false;
    shieldSound.stop();
    shield.destroy(); //the shield will disappear
}

function resetShieldTimer() {
    shieldIcon.alpha = 1; //the icon's transparency will be removed
}

function resetFireTimer() {
    fireIcon.alpha = 1; //the icon's transparency will be removed
}

function resetRunTimer() {
    runIcon.alpha = 1; //the icon's transparency will be removed
}




function resetPotionTimer() {
    if (this.potionAmount > 0) {
        potionIcon.alpha = 1; //the icon's transparency will be removed; if the player doesn't have any more potions, it will stay transparent permanently, and the player will be unable to use any more
    }
}

function changeState(i, stateNum) {
    console.log(i);
    game.state.start('state' + stateNum); //this function starts a new state
}

function addKeyCallback(key, fn, args) {
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners() {
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
    addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
    addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
    addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
    addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
    addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
    addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
    addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);
}