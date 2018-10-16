// Enemies our player must avoid
var Enemy = function(startingY, randomSpeed) {

    //X and Y axis positions of the enemy on the canvas
    this.x = -100;
    this.y = startingY;

    //The enemies can have one of eight randomly defined speeds: 
    //(put speeds here)
    this.speed = randomSpeed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    
    if(this.x<800) this.x += dt*this.speed;
    else{
        this.x = -100;
        this.speed = Math.floor((Math.random() * 8) + 1) * 120;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    //image/sprite for the player character
    this.sprite;

    //X and Y axis starting position for the player on the canvas
    this.x = 200;
    this.y = 300;
};

//Will check if the player has colided or won the game, and update
//its position accordingly
Player.prototype.update = function() {
    player.checkCollisions();
    player.checkWin();
};

//Increases the win counter and takes the player back to its starting
//position in case it reaches the water
Player.prototype.checkWin = function() {
        if(player.y<30){
            score+=10;
            player.goToStart();
        }
};

//Checks if the player is occupying the same space as an enemy. If so,
//takes the player back to the starting position and increases the 
//death counter
Player.prototype.checkCollisions = function() {
    for (const enemy of allEnemies){
        if((player.x-50 <= enemy.x) && (player.x+50 >= enemy.x) && (player.y-50<=enemy.y) && (player.y+50 >= enemy.y)){
            if(score>0) score -= 10;
            player.goToStart();
        }
    }
};

//Takes the player back to the starting position of the game
Player.prototype.goToStart = function() {
    this.x = 200;
    this.y = 300;
};

//Makes the player move a certain amount of pixels on the correct
//axis, depending on the key that was pressed
Player.prototype.handleInput = function(keyPressed) {
    switch(keyPressed){
        case 'left':
            if(this.x>=100) this.x-=100;
            break;
        case 'right':
            if(this.x<400) this.x+=100;
            break;
        case 'up':
            this.y-=85;
            break;
        case 'down':
            if(this.y<350) this.y+=85;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Selector = function(){
    this.x = 203;
    this.y = 294;
    this.sprite = 'images/Selector.png';
};

Selector.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Selector.prototype.handleSelectorInput = function(keyPressed){
    switch(keyPressed){
        case 'left':
            if(selector.x>=100) selector.x-=101;
            break;
        case 'right':
            if(selector.x<400) selector.x+=101;
            break;
        case 'enter':
            isCharacterSelected = true;
            switch(selector.x){
                case 1:
                    player.sprite = 'images/char-boy.png';
                    break;
                case 102:
                    player.sprite = 'images/char-cat-girl.png';
                    break;
                case 203:
                    player.sprite = 'images/char-horn-girl.png';
                    break;
                case 304:
                    player.sprite = 'images/char-pink-girl.png';
                    break;
                case 405:
                    player.sprite = 'images/char-princess-girl.png';
                    break;
            }

            document.removeEventListener('keyup', function(e){
                const allowedKeys = {
                    37: 'left',
                    39: 'right',
                    13: 'enter'
                }   

                selector.handleSelectorInput(allowedKeys[e.keyCode]);
            });

            document.addEventListener('keyup', function(e) {
                const allowedKeys = {
                    37: 'left',
                    38: 'up',
                    39: 'right',
                    40: 'down'
                };
                
                player.handleInput(allowedKeys[e.keyCode]);
            });
            
            startingTime = Date.now();
        }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();

let allEnemies = [];

let isCharacterSelected = false;

let selector = new Selector();

let startingTime;

//Counts the amount of times the player has reached the water
let score = 0;

allEnemies = [
    new Enemy(55, Math.floor((Math.random() * 8) + 1) * 120),
    new Enemy(138, Math.floor((Math.random() * 8) + 1) * 120),
    new Enemy(220, Math.floor((Math.random() * 8) + 1) * 120),
    new Enemy(55, Math.floor((Math.random() * 8) + 1) * 120),
    new Enemy(138, Math.floor((Math.random() * 8) + 1) * 120),
    new Enemy(220, Math.floor((Math.random() * 8) + 1) * 120)
];

document.addEventListener('keyup', function(e){
    const allowedKeys = {
        37: 'left',
        39: 'right',
        13: 'enter'
    }

    selector.handleSelectorInput(allowedKeys[e.keyCode]);
});