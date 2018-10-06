// Enemies our player must avoid
var Enemy = function() {

    //X and Y axis positions of the enemy on the canvas
    this.x = -100;
    this.y;

    //The enemies can have one of eight randomly defined speeds: 
    //(put speeds here)
    this.speed = Math.floor((Math.random() * 8) + 1) * 120;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //Establishes the point in time in which the enemy will start moving
    //It's necessary for the game to keep a constant dificulty
    this.timeToMove;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    
    if(this.timeToMove<Date.now()) this.x += dt*this.speed;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

//Randomly define in which of the three paved lanes
//each enemy is going to spawn at
Enemy.prototype.startingY = function() {
    const lane = Math.floor((Math.random() * 3) + 1)
    if(lane === 1) this.y = 55;
    else this.y = 55 + (lane-1)*83;
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
            wins+=1;
            player.goToStart();
        }
};

//Checks if the player is occupying the same space as an enemy. If so,
//takes the player back to the starting position and increases the 
//death counter
Player.prototype.checkCollisions = function() {
    for (const enemy of allEnemies){
        if((player.x-50 <= enemy.x) && (player.x+50 >= enemy.x) && (player.y-50<=enemy.y) && (player.y+50 >= enemy.y)){
            deaths+=1;
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

            for (var i=0; i<150; i++){
                allEnemies[i].timeToMove = (Date.now()+(i*350));
            }
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
let wins = 0;

//Counts the amount of times the player has collided with a bug
let deaths = 0;

for (var i=0; i<150; i++){
    allEnemies[i] = new Enemy();
    allEnemies[i].startingY();
}

document.addEventListener('keyup', function(e){
    const allowedKeys = {
        37: 'left',
        39: 'right',
        13: 'enter'
    }

    selector.handleSelectorInput(allowedKeys[e.keyCode]);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

/*document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});*/