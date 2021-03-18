/*
ED's game - efior001 
*/

//VARIABLES
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var jumpSound;
var fallSound;
var backgroundSound; 
var collectedSound;

var platforms;
var game_score; 
var flagpole;
var lives; 
var enemies;

//FUNCTION TO PRELEOD SOUNDS
function preload()
{
    soundFormats('mp3','wav');
    
    //jump sound
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.01);
    
    //fall sound
    fallSound = loadSound('assets/fall.wav');
    fallSound.setVolume(0.1);
    
    //background sound
    backgroundSound = loadSound('assets/background.mp3');
    backgroundSound.setVolume(0.2);
    
    //collectable sound
    collectedSound = loadSound('assets/hammer.wav');
    collectedSound.setVolume(0.1);
    
    //door is reached sound
    doorSound = loadSound('assets/door.wav');
    doorSound.setVolume(0.1);
    
    //gameover Sound
    gameoverSound = loadSound('assets/gameover.mp3')
    gameoverSound.setVolume(0.1);
}


function setup() 
{   
    createCanvas(1024, 576);
    floorPos_y = 450;
    
    //LIVES
    lives = 4; 
    
    //to play backgorund music
    backgroundSound.loop();
    
    startGame();
}

//FUNCTION TO START GAME
function startGame()
{
    fallSound.stop();
    doorSound.stop();
    
    gameChar_x = width / 3;
    gameChar_y = floorPos_y;
    livesPos_x = 150;
    livesPos_y = 125;

    //background scrolling control
    scrollPos = 0;

    //real position of the gameChar
    gameChar_world_x = gameChar_x - scrollPos;

    //control the movement of the game character
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    isJumping = false;
    isGameOver = false;
    isReached = false;

    //scenery objects
    canyon = [];

    pineTree = [];

    tree = [];

    easyCloud = [];

    lightning = [];
    
    mountains = [];
    
    platforms = [];
    
    collectable = [];
    
    enemies = [];
    
    flagpole = 
    {
        x_Pos: 4680,
        y_Pos: floorPos_y - 300,
        isReached: false,
    }
    
    //to add enemies to the array 
    enemies.push
    ( 
        new Enemy(600, floorPos_y, 100),
        new Enemy(1751, floorPos_y, 100),
        new Enemy(2975, floorPos_y, 100),
        new Enemy(3287, floorPos_y, 100),
        new Enemy(3587, floorPos_y, 100),
        new Enemy(3953, floorPos_y, 100),
        new Enemy(4259, floorPos_y, 100),
    )
    
    //to add canyons to the array
    for(var i=0; i<6; i++)
    {
        canyon.push
        ({
            x_Pos: 800 + 70 *i, 
            y_Pos: 450,
            width: 70
        })
    }
    
    for(var i=0; i<10; i++)
    {
        canyon.push
        ({
            x_Pos: 2000 + 70 *i, 
            y_Pos: 450,
            width: 70
        })
    }
    
    for(var i=0; i<10; i++)
    {
        canyon.push
        ({
            x_Pos: 4350 + 70 *i, 
            y_Pos: 450,
            width: 70
        })
    }
    
    canyon.push
    ({
        x_Pos: 1300, 
        y_Pos: 450,
        width: 70
    })
    
    canyon.push
    ({
        x_Pos: -300, 
        y_Pos: 450,
        width: 600
    })
    
    canyon.push
    ({
        x_Pos: 1450, 
        y_Pos: 450,
        width: 70
    })
    
    canyon.push
    ({
        x_Pos: 1450, 
        y_Pos: 450,
        width: 70
    })
    
    
    //to add pinetrees to the array
    for(var i=0; i<17; i++)
    {
        pineTree.push
        ({
            x_Pos: random(250,5900), 
            y_Pos: random(200,250)
        })
    }
    
    //to add tree to the tree array
    for(var i=0; i<17; i++)
    {
        tree.push
        ({
            x_Pos: random(250,5900), 
            y_Pos: random(200,250)
        })
    }
    
    //to add easy cloud to the array
    for(var i=0; i<30; i++)
    {
        easyCloud.push
        ({
            x_Pos: random(-200,6000), 
            y_Pos: random(0,250)
        })
    }
    
    //to add lighting bolts cloud to the array
    for(var i=0; i<10; i++)
    {
        lightning.push
        ({
            x_Pos: random(-200,6000), 
            y_Pos: random(0,180)
        })
    }
    
    //to add mountains to the array
    for(var i=0; i<25; i++)
    {
        mountains.push
        ({
            x_Pos: random(0,5300), 
            y_Pos: random(400,450)
        })
    }
    mountains.push
    ({
        x_Pos: 4600, 
        y_Pos: 375,
    })
    
    //to add colectable to the array
    collectable.push
    ({
        x_Pos: 4259, 
        y_Pos: 400,
        isFound: false,
    }),
    collectable.push
    ({
        x_Pos: 3953, 
        y_Pos: 400,
        isFound: false,
    }),
    collectable.push
    ({
        x_Pos: 3587, 
        y_Pos: 400,
        isFound: false,
    }),
    
     collectable.push
    ({
        x_Pos: 3287, 
        y_Pos: 400,
        isFound: false,
    }),
    collectable.push
    ({
        x_Pos: 2975, 
        y_Pos: 400,
        isFound: false,
    }),
    collectable.push
    ({
        x_Pos: 550, 
        y_Pos: 400,
        isFound: false,
    }),
     collectable.push
    ({
        x_Pos: 450, 
        y_Pos: 400,
        isFound: false,
    })
     collectable.push
    ({
        x_Pos: 600, 
        y_Pos: 400,
        isFound: false,
    }),
    collectable.push
    ({
        x_Pos: 920, 
        y_Pos: floorPos_y - 210,
        isFound: false,
    }),
    collectable.push
    ({
        x_Pos: 1160, 
        y_Pos: floorPos_y - 310,
        isFound: false,
    })
    collectable.push
    ({
        x_Pos: 1250, 
        y_Pos: 400,
        isFound: false,
    })
    collectable.push
    ({
        x_Pos: 1450, 
        y_Pos: 380,
        isFound: false,
    })
    collectable.push
    ({
        x_Pos: 1750, 
        y_Pos: 320,
        isFound: false,
    })
    collectable.push
    ({
        x_Pos: 2070, 
        y_Pos: floorPos_y - 280,
        isFound: false,
    })
    collectable.push
    ({
        x_Pos: 2270, 
        y_Pos: floorPos_y - 350,
        isFound: false,
    })
    collectable.push
    ({
        x_Pos: 2450, 
        y_Pos: floorPos_y - 410,
        isFound: false,
    })
    
    
    platforms.push
    (
        createPlatforms(760, floorPos_y - 90, 100), 
        createPlatforms(890, floorPos_y - 150, 100),
        createPlatforms(1040, floorPos_y - 200, 100),
        createPlatforms(1200, floorPos_y - 200, 100),
        
        createPlatforms(2030, floorPos_y - 80, 100),
        createPlatforms(2050, floorPos_y - 220, 100),
        createPlatforms(2150, floorPos_y - 150, 100),
        createPlatforms(2200, floorPos_y - 270, 100),
        createPlatforms(2350, floorPos_y - 320, 100),
        createPlatforms(2550, floorPos_y - 250, 100),
        
        createPlatforms(4370, floorPos_y - 80, 100),
        createPlatforms(4500, floorPos_y - 150, 100),
        createPlatforms(4630, floorPos_y - 205, 300),
    )
    
    //score & lives
    game_score = 0;
    lives -= 1; 
}

function draw() 
{
    //sky
    background(255, 228, 225);

    //valley
    noStroke(); 
    fill(176, 196, 222);
    ellipse(0, 576, 6000, 550)
    
    //snow floor
    noStroke(); 
    fill(255, 250, 250);
    ellipse(20, floorPos_y, 5000, 40)
    
    //ground floor
    noStroke(); 
    fill(224, 255, 255);
    rect(0, floorPos_y, 1024, 144);
    
    push();

    translate(scrollPos, 0);

    // Draw clouds.
    drawClouds();

    // Draw mountains.
    drawMountains();

    // Draw trees.
    drawTrees();

    // Draw canyons.
    for (var i = 0; i < canyon.length; i++) 
    {
        drawCanyon(canyon[i]);
        checkCanyon(canyon[i]);
    }

    // Draw collectable items.
    for (var i = 0; i < collectable.length; i++) 
    {
        if (collectable[i].isFound == false) 
        {
            drawCollectable(collectable[i]);
            checkCollectable(collectable[i]);
        }
    }
    
    //make it snow;
    for (var i = 0; i < 1500; i++) 
    {
        fill(255);
        noStroke();
        ellipse(random(-500, 6000),
                random(0, floorPos_y),
                3, 3)
    }
    
    //draw door at the end
    renderFlagpole();
    
    //enemies
    for(var i=0; i < enemies.length; i++)
    {
        enemies[i].update();
        enemies[i].draw();
        
        if(enemies[i].isContact(gameChar_world_x,
                                gameChar_y))
        {
           startGame();
            break;
        }
    }
    
    //platforms 
    for(var i=0; i < platforms.length; i++)
    {
        platforms[i].draw();
    }

    //scroll pop
    pop();

    // Draw game character only if is still in the level 
    if(flagpole.isReached == false)
    {
        drawGameChar();
    }
    
    // Score
    fill(0)
    textSize(25)
    textStyle(BOLD)
    textFont('monospace')
    text("Score: " + str(game_score),20,30)
    
    // lives
    fill(0)
    textSize(25)
    textStyle(BOLD)
    textFont('monospace')
    text("Lives: ",20,70)
    
    //print lives tokens
    for (var i=0; i<lives; i++)
    {
        fill(245, 255, 250);
        ellipse(livesPos_x + i * 50,
                livesPos_y - 60, 29, 29);
        push();
        stroke(0, 0, 255);
        strokeWeight(2);
        fill(0, 0, 255);
        line(livesPos_x - 14 + i * 50,
             livesPos_y - 70,
             livesPos_x + 14 + i * 50,
             livesPos_y - 70);
        rect(livesPos_x - 8 + i * 50,
             livesPos_y - 83, 17, 12);
        pop();
        //eyes
        push();
        stroke(1);
        strokeWeight(2);
        ellipse(livesPos_x - 6 + i * 50,
                livesPos_y - 63, 3, 3);
        ellipse(livesPos_x + 4 + i * 50,
                livesPos_y - 63, 3, 3);
        pop();
        //nose
        push();
        noStroke();
        fill(255, 165, 0);
        triangle(livesPos_x - 3 + i * 50,
                 livesPos_y - 58,
                 livesPos_x + 3 + i * 50,
                 livesPos_y - 58,
                 livesPos_x + i * 50,
                 livesPos_y - 48);
        pop();
    }

    // make the game character move or the background scroll.
    if (isLeft && lives > 0) 
    {
        if (gameChar_x > width * 0.2) 
        {
            gameChar_x -= 6;
        } 
        else 
        {
            scrollPos += 6;
        }
    }

    if (isRight && lives > 0) 
    {
        if (gameChar_x < width * 0.5) 
        {
            gameChar_x += 6;
        } 
        else 
        {
            scrollPos -= 6; // negative for moving against the background
        }
    }

    //make the game character rise and fall.
    if (gameChar_y < floorPos_y) 
    {
        var isContact = false;
        
        for(var i=0; i<platforms.length; i++)
        {
            if(platforms[i].checkContact
               (gameChar_world_x, gameChar_y)
              )
            {
                isContact = true;
                break;
            }
        } 
        
    if(isContact == false)
    {
        gameChar_y += 5;
        isFalling = true;
    }
    else
    {
        isFalling = false;
    }
    } 
    else 
    {
        isFalling = false;
    }

    if (isPlummeting) 
    {
        gameChar_y += 8;
    }
    
    //Flagpole logic
    if(flagpole.isReached == false)
    {
        checkFlagpole()
    }
    
    //to restart game if game over
    if((lives < 1 || flagpole.isReached == true) && keyCode == 32)
    {
        lives = 4;
        startGame();
        backgroundSound.loop();
    }
    
    if(gameChar_y > 576 && lives > 0)
    {
        startGame()
        fallSound.stop();
        isPlummeting = false;
    }
    
    //statement to make increase a live if gamescore == 10
    if(game_score == 10)
    {
        game_score = 0;
        bonusLive();
    }
    
    //Game Over
    if (lives == 0)
    {
        if(isGameOver == false)
        {
            isGameOver = true;
            gameoverSound.play();
        }
        backgroundSound.stop()
        fill(0)
        textSize(35)
        textStyle(BOLD)
        textFont('monospace')
        text("Game Over. Press 'space' to continue", 40, 220)
        
        return; 
    }
    
    //Game Win
    if (flagpole.isReached == true)
    {
        if(isReached == false)
        {
            isReached = true;
            doorSound.play();
            fill(0);
            rect(flagpole.x_Pos, 
                 flagpole.y_Pos,
                 90, 105);
        }
        backgroundSound.stop()
        fill(0)
        textSize(35)
        textStyle(BOLD)
        textFont('monospace')
        text("Level Complete. Press 'space' to continue", 30, 220)

        return;
    }
    
    //position gameChar for collision detection.
    gameChar_world_x = gameChar_x - scrollPos;
}

// ---------------------
// Key control functions
function keyPressed() 
{
    if (keyCode == 37 || key == 'A' && lives > 0) 
    {
        isLeft = true;
    }

    if (keyCode == 39 || key == 'D' && lives > 0) 
    {
        isRight = true;
    }

    if ((keyCode == 38 || key == 'W' || key == ' ')&& 
        gameChar_y <= 490 && 
        isFalling != true && 
        isPlummeting != true && lives > 0) 
    {
        gameChar_y -= 150;
        jumpSound.play();
    }
}

function keyReleased() 
{
    if (keyCode == 37 || key == 'A') 
    {
        isLeft = false;
    }

    if (keyCode == 39 || key == 'D') 
    {
        isRight = false;
    }

    if (keyCode == 38 || key == 'W' || key == ' ') 
    {
        isJumping = false;
        isFalling = false;
    }
  }

// ------------------------------
// Game character render function

function drawGameChar() 
{
    if (isLeft && isFalling) 
    {
        //jumping-left
        fill(255, 182, 193);
        //body
        ellipse(gameChar_x,
                gameChar_y - 14, 40, 40);
        ellipse(gameChar_x,
                gameChar_y - 40, 36, 36);
        ellipse(gameChar_x,
                gameChar_y - 60, 29, 29);
        //hat
        push();
        stroke(0, 0, 255);
        strokeWeight(2);
        fill(0, 0, 255);
        line(gameChar_x - 14,
             gameChar_y - 70,
             gameChar_x + 14,
             gameChar_y - 70);
        rect(gameChar_x - 8,
             gameChar_y - 83, 17, 12);
        pop();
        //eyes
        push();
        stroke(1);
        strokeWeight(2);
        ellipse(gameChar_x - 9,
                gameChar_y - 63, 3, 3);
        ellipse(gameChar_x + 1,
                gameChar_y - 63, 3, 3);
        pop();
        //nose
        push();
        noStroke();
        fill(255, 165, 0);
        triangle(gameChar_x - 3,
                 gameChar_y - 58,
                 gameChar_x + 3,
                 gameChar_y - 58,
                 gameChar_x - 10,
                 gameChar_y - 48);
        pop();
        //arms
        push();
        stroke(139, 69, 19);
        strokeWeight(3);
        line(gameChar_x - 13,
             gameChar_y - 54,
             gameChar_x - 24,
             gameChar_y - 65); //left
        line(gameChar_x + 12,
             gameChar_y - 54,
             gameChar_x,
             gameChar_y - 65); //right
        pop();
        //buttons
        push();
        stroke(1);
        strokeWeight(3);
        ellipse(gameChar_x - 6,
                gameChar_y - 42, 2, 2);
        ellipse(gameChar_x - 6,
                gameChar_y - 35, 2, 2);
        ellipse(gameChar_x - 6,
                gameChar_y - 27, 2, 2);
        pop();

    }
    else if (isRight && isFalling)
    {
        //jumping-right
        fill(255, 182, 193);
        //body
        ellipse(gameChar_x,
                gameChar_y - 14, 40, 40);
        ellipse(gameChar_x,
                gameChar_y - 40, 36, 36);
        ellipse(gameChar_x,
                gameChar_y - 60, 29, 29);
        //hat
        push();
        stroke(0, 0, 255);
        strokeWeight(2);
        fill(0, 0, 255);
        line(gameChar_x - 17,
             gameChar_y - 70,
             gameChar_x + 12,
             gameChar_y - 70);
        rect(gameChar_x - 10,
             gameChar_y - 83, 17, 12);
        pop();
        //eyes
        push();
        stroke(1);
        strokeWeight(2);
        ellipse(gameChar_x - 2,
                gameChar_y - 63, 3, 3);
        ellipse(gameChar_x + 8,
                gameChar_y - 63, 3, 3);
        pop();
        //nose
        push();
        noStroke();
        fill(255, 165, 0);
        triangle(gameChar_x - 3,
                 gameChar_y - 58,
                 gameChar_x + 3,
                 gameChar_y - 58,
                 gameChar_x + 8,
                 gameChar_y - 48);
        pop();
        //arms
        push();
        stroke(139, 69, 19);
        strokeWeight(3);
        line(gameChar_x - 13,
             gameChar_y - 44,
             gameChar_x + 6,
             gameChar_y - 65); //left
        line(gameChar_x + 12,
             gameChar_y - 44,
             gameChar_x + 24,
             gameChar_y - 65); //right
        pop();
        //buttons
        push();
        stroke(1);
        strokeWeight(3);
        ellipse(gameChar_x + 6,
                gameChar_y - 42, 2, 2);
        ellipse(gameChar_x + 6,
                gameChar_y - 35, 2, 2);
        ellipse(gameChar_x + 6,
                gameChar_y - 27, 2, 2);
        pop();
    
    }
    else if (isLeft) 
    {
        //walking left 
        fill(255, 182, 193);
        //body
        ellipse(gameChar_x,
                gameChar_y - 14, 40, 40);
        ellipse(gameChar_x,
                gameChar_y - 40, 36, 36);
        ellipse(gameChar_x,
                gameChar_y - 60, 29, 29);
        //hat
        push();
        stroke(0, 0, 255);
        strokeWeight(2);
        fill(0, 0, 255);
        line(gameChar_x - 12,
             gameChar_y - 70,
             gameChar_x + 16,
             gameChar_y - 70);
        rect(gameChar_x - 6,
             gameChar_y - 83, 19, 12);
        pop();
        //eyes
        push();
        stroke(1);
        strokeWeight(2);
        ellipse(gameChar_x - 9,
                gameChar_y - 63, 3, 3);
        ellipse(gameChar_x + 1,
                gameChar_y - 63, 3, 3);
        pop();
        //nose
        push();
        noStroke();
        fill(255, 165, 0);
        triangle(gameChar_x - 3,
                 gameChar_y - 58,
                 gameChar_x + 3,
                 gameChar_y - 58,
                 gameChar_x - 10,
                 gameChar_y - 48);
        pop();
        //arms
        push();
        stroke(139, 69, 19);
        strokeWeight(3);
        line(gameChar_x - 13,
             gameChar_y - 44,
             gameChar_x - 24,
             gameChar_y - 35); //left
        line(gameChar_x + 12,
             gameChar_y - 44,
             gameChar_x,
             gameChar_y - 35); //right
        pop();
        //buttons
        push();
        stroke(1);
        strokeWeight(3);
        ellipse(gameChar_x - 6,
                gameChar_y - 42, 2, 2);
        ellipse(gameChar_x - 6,
                gameChar_y - 35, 2, 2);
        ellipse(gameChar_x - 6,
                gameChar_y - 27, 2, 2);
        pop();
    
    }
    else if (isRight) 
    {
        //walking right
        fill(255, 182, 193);
        //body
        ellipse(gameChar_x,
                gameChar_y - 14, 40, 40);
        ellipse(gameChar_x,
                gameChar_y - 40, 36, 36);
        ellipse(gameChar_x,
                gameChar_y - 60, 29, 29);
        //hat
        push();
        stroke(0, 0, 255);
        strokeWeight(2);
        fill(0, 0, 255);
        line(gameChar_x - 17,
             gameChar_y - 70,
             gameChar_x + 12,
             gameChar_y - 70);
        rect(gameChar_x - 10,
             gameChar_y - 83, 17, 12);
        pop();
        //eyes
        push();
        stroke(1);
        strokeWeight(2);
        ellipse(gameChar_x - 2,
                gameChar_y - 63, 3, 3);
        ellipse(gameChar_x + 8,
                gameChar_y - 63, 3, 3);
        pop();
        //nose
        push();
        noStroke();
        fill(255, 165, 0);
        triangle(gameChar_x - 3,
                 gameChar_y - 58,
                 gameChar_x + 3,
                 gameChar_y - 58,
                 gameChar_x + 8,
                 gameChar_y - 48);
        pop();
        //arms
        push();
        stroke(139, 69, 19);
        strokeWeight(3);
        line(gameChar_x - 13,
             gameChar_y - 44,
             gameChar_x +6,
             gameChar_y - 35); //left
        line(gameChar_x + 12,
             gameChar_y - 44,
             gameChar_x + 24,
             gameChar_y - 35); //right
        pop();
        //buttons
        push();
        stroke(1);
        strokeWeight(3);
        ellipse(gameChar_x + 6,
                gameChar_y - 42, 2, 2);
        ellipse(gameChar_x + 6,
                gameChar_y - 35, 2, 2);
        ellipse(gameChar_x + 6,
                gameChar_y - 27, 2, 2);
        pop();
    
    }
    else if (isFalling) 
    {
        //standing front facing
        fill(255, 182, 193);
        //body
        ellipse(gameChar_x,
                gameChar_y - 14, 40, 40);
        ellipse(gameChar_x,
                gameChar_y - 40, 36, 36);
        ellipse(gameChar_x,
                gameChar_y - 60, 29, 29);
        //hat
        push();
        stroke(0, 0, 255);
        strokeWeight(2);
        fill(0, 0, 255);
        line(gameChar_x - 14,
             gameChar_y - 70,
             gameChar_x + 14,
             gameChar_y - 70);
        rect(gameChar_x - 8,
             gameChar_y - 83, 17, 12);
        pop();
        //eyes
        push();
        stroke(1);
        strokeWeight(2);
        ellipse(gameChar_x - 6,
                gameChar_y - 63, 3, 3);
        ellipse(gameChar_x + 4,
                gameChar_y - 63, 3, 3);
        pop();
        //nose
        push();
        noStroke();
        fill(255, 165, 0);
        triangle(gameChar_x - 3,
                 gameChar_y - 58,
                 gameChar_x + 3,
                 gameChar_y - 58,
                 gameChar_x,
                 gameChar_y - 48);
        pop();
        //arms
        push();
        stroke(139, 69, 19);
        strokeWeight(3);
        line(gameChar_x - 13,
             gameChar_y - 44,
             gameChar_x - 24,
             gameChar_y - 65); //left
        line(gameChar_x + 12,
             gameChar_y - 44,
             gameChar_x + 24,
             gameChar_y - 65); //right
        pop();
        //buttons
        push();
        stroke(1);
        strokeWeight(3);
        ellipse(gameChar_x,
                gameChar_y - 42, 2, 2);
        ellipse(gameChar_x,
                gameChar_y - 35, 2, 2);
        ellipse(gameChar_x,
                gameChar_y - 27, 2, 2);
        pop();
    
    } 
    else if(isPlummeting) 
    {
        //plummeting
        fill(255, 248, 220);
        //body
        ellipse(gameChar_x,
                gameChar_y - 14, 40, 40);
        ellipse(gameChar_x,
                gameChar_y - 40, 36, 36);
        ellipse(gameChar_x,
                gameChar_y - 60, 29, 29);
        //hat
        push();
        stroke(0, 0, 255);
        strokeWeight(2);
        fill(0, 0, 255);
        line(gameChar_x - 14,
             gameChar_y - 70,
             gameChar_x + 14,
             gameChar_y - 70);
        rect(gameChar_x - 8,
             gameChar_y - 83, 17, 12);
        pop();
        //eyes
        push();
        stroke(1);
        strokeWeight(2);
        ellipse(gameChar_x - 6,
                gameChar_y - 63, 3, 3);
        ellipse(gameChar_x + 4,
                gameChar_y - 63, 3, 3);
        pop();
        //nose
        push();
        noStroke();
        fill(255, 165, 0);
        triangle(gameChar_x - 3,
                 gameChar_y - 58,
                 gameChar_x + 3,
                 gameChar_y - 58,
                 gameChar_x,
                 gameChar_y - 48);
        pop();
        //arms
        push();
        stroke(139, 69, 19);
        strokeWeight(3);
        line(gameChar_x - 13,
             gameChar_y - 44,
             gameChar_x - 24,
             gameChar_y - 65); //left
        line(gameChar_x + 12,
             gameChar_y - 44,
             gameChar_x + 24,
             gameChar_y - 65); //right
        pop();
        //buttons
        push();
        stroke(1);
        strokeWeight(3);
        ellipse(gameChar_x,
                gameChar_y - 42, 2, 2);
        ellipse(gameChar_x,
                gameChar_y - 35, 2, 2);
        ellipse(gameChar_x,
                gameChar_y - 27, 2, 2);
        pop();
    } 
    else 
    {
        //standing front facing
        fill(255, 182, 193);
        //body
        ellipse(gameChar_x,
                gameChar_y - 14, 40, 40);
        ellipse(gameChar_x,
                gameChar_y - 40, 36, 36);
        ellipse(gameChar_x,
                gameChar_y - 60, 29, 29);
        //hat
        push();
        stroke(0, 0, 255);
        strokeWeight(2);
        fill(0, 0, 255);
        line(gameChar_x - 14,
             gameChar_y - 70,
             gameChar_x + 14,
             gameChar_y - 70);
        rect(gameChar_x - 8,
             gameChar_y - 83, 17, 12);
        pop();
        //eyes
        push();
        stroke(1);
        strokeWeight(2);
        ellipse(gameChar_x - 6,
                gameChar_y - 63, 3, 3);
        ellipse(gameChar_x + 4,
                gameChar_y - 63, 3, 3);
        pop();
        //nose
        push();
        noStroke();
        fill(255, 165, 0);
        triangle(gameChar_x - 3,
                 gameChar_y - 58,
                 gameChar_x + 3,
                 gameChar_y - 58,
                 gameChar_x,
                 gameChar_y - 48);
        pop();
        //arms
        push();
        stroke(139, 69, 19);
        strokeWeight(3);
        line(gameChar_x - 13,
             gameChar_y - 44,
             gameChar_x - 24,
             gameChar_y - 35); //left
        line(gameChar_x + 12,
             gameChar_y - 44,
             gameChar_x + 24,
             gameChar_y - 35); //right
        pop();
        //buttons
        push();
        stroke(1);
        strokeWeight(3);
        ellipse(gameChar_x,
                gameChar_y - 42, 2, 2);
        ellipse(gameChar_x,
                gameChar_y - 35, 2, 2);
        ellipse(gameChar_x,
                gameChar_y - 27, 
                2, 2);
        pop();
    }
}

// ---------------------------
// Background render functions

// Function to draw cloud objects.
function drawClouds() 
{
    //Lighting Bolt Cloud
    for (var i = 0; i < lightning.length; i++) 
    {
        fill(95, 158, 160);
        ellipse(easyCloud[i].x_Pos + 120,
                easyCloud[i].y_Pos + 40, 80, 40);
        ellipse(easyCloud[i].x_Pos + 140,
                easyCloud[i].y_Pos + 60, 50, 20);
        ellipse(easyCloud[i].x_Pos + 160,
                easyCloud[i].y_Pos + 40, 70, 30);
        beginShape(),
        stroke(255, 255, 0);
        fill(random(200, 255), 
             random(200, 220), 0);
        vertex(lightning[i].x_Pos + 289,
               lightning[i].y_Pos + 47);
        vertex(lightning[i].x_Pos + 309,
               lightning[i].y_Pos + 95);
        vertex(lightning[i].x_Pos + 299,
               lightning[i].y_Pos + 149);
        vertex(lightning[i].x_Pos + 329,
               lightning[i].y_Pos + 207);
        vertex(lightning[i].x_Pos + 320,
               lightning[i].y_Pos + 143);
        vertex(lightning[i].x_Pos + 318,
               lightning[i].y_Pos + 120);
        vertex(lightning[i].x_Pos + 325,
               lightning[i].y_Pos + 90);
        vertex(lightning[i].x_Pos + 305,
               lightning[i].y_Pos + 42);
        vertex(lightning[i].x_Pos + 289,
               lightning[i].y_Pos + 47);
        endShape(CLOSE);
        //Lighting bolt clouds
        noStroke();
        fill(219, 230, 210);
        ellipse(lightning[i].x_Pos + 300,
                lightning[i].y_Pos + 40, 130, 70);
        ellipse(lightning[i].x_Pos + 330,
                lightning[i].y_Pos - 10, 70, 60);
        ellipse(lightning[i].x_Pos + 370,
                lightning[i].y_Pos + 20, 80, 100);
        fill(255, 255, 255, 50);
        ellipse(lightning[i].x_Pos + 180,
                lightning[i].y_Pos + 30, 100, 40);
        ellipse(lightning[i].x_Pos + 200,
                lightning[i].y_Pos, 100, 50);
        ellipse(lightning[i].x_Pos + 230,
                lightning[i].y_Pos + 50, 110, 30);
        //cloud movement
        lightning[i].x_Pos -= 0.2;
    }

    //regular clouds
    for (var i = 0; i < easyCloud.length; i++) 
    {
        fill(220);
        ellipse(easyCloud[i].x_Pos + 410,
                easyCloud[i].y_Pos - 70, 100, 70);
        ellipse(easyCloud[i].x_Pos + 420,
                easyCloud[i].y_Pos - 40, 120, 40);
        ellipse(easyCloud[i].x_Pos + 450,
                easyCloud[i].y_Pos - 10, 120, 60);

        //move clouds sideways and up/down
        easyCloud[i].x_Pos +=0.1;
        easyCloud[i].y_Pos +=0.1;
        if(easyCloud[i].y_Pos > 200)
        {
            easyCloud[i].y_Pos -= 0.1;
        }
        else
        {
            easyCloud[i].y_Pos += 0.1;
        }
    }
}

// Function to draw mountains objects.
function drawMountains() 
{
    for (var i = 0; i < mountains.length; i++) {
        //shade
        fill(139, 69, 19);
        triangle(mountains[i].x_Pos + 20,
                 mountains[i].y_Pos - 220,
                 mountains[i].x_Pos + 59,
                 mountains[i].y_Pos - 176,
                 mountains[i].x_Pos + 55,
                 mountains[i].y_Pos - 160);
        triangle(mountains[i].x_Pos + 130,
                 mountains[i].y_Pos - 400,
                 mountains[i].x_Pos + 291,
                 mountains[i].y_Pos - 50,
                 mountains[i].x_Pos + 269,
                 mountains[i].y_Pos - 50);
        //mountains
        fill(160, 82, 45);
        noStroke();
        triangle(mountains[i].x_Pos - 80,
                 mountains[i].y_Pos - 50,
                 mountains[i].x_Pos + 120,
                 mountains[i].y_Pos - 50,
                 mountains[i].x_Pos + 20,
                 mountains[i].y_Pos - 220);
        triangle(mountains[i].x_Pos + 20,
                 mountains[i].y_Pos - 50,
                 mountains[i].x_Pos + 270,
                 mountains[i].y_Pos - 50,
                 mountains[i].x_Pos + 130,
                 mountains[i].y_Pos - 400);
        //snow
        fill(255);
        triangle(mountains[i].x_Pos + 118,
                 mountains[i].y_Pos - 300,
                 mountains[i].x_Pos + 112,
                 mountains[i].y_Pos - 280,
                 mountains[i].x_Pos + 125,
                 mountains[i].y_Pos - 240);
        triangle(mountains[i].x_Pos + 82.5,
                 mountains[i].y_Pos - 250,
                 mountains[i].x_Pos + 105,
                 mountains[i].y_Pos - 245,
                 mountains[i].x_Pos + 99,
                 mountains[i].y_Pos - 302);
        triangle(mountains[i].x_Pos + 99,
                 mountains[i].y_Pos - 302,
                 mountains[i].x_Pos + 129,
                 mountains[i].y_Pos - 399,
                 mountains[i].x_Pos + 135,
                 mountains[i].y_Pos - 361);
        triangle(mountains[i].x_Pos + 20,
                 mountains[i].y_Pos - 220,
                 mountains[i].x_Pos + 3,
                 mountains[i].y_Pos - 194,
                 mountains[i].x_Pos + 15,
                 mountains[i].y_Pos - 190)
    }
}

// Function to draw trees objects.
function drawTrees() 
{
    for (var i = 0; i < tree.length; i++) 
    {
        noStroke();
        fill(128, 0, 0);
        rect(tree[i].x_Pos + 45,
             tree[i].y_Pos + 60, 10, 90, 2);
        fill(255);
        fill(50, 205, 50);
        ellipse(tree[i].x_Pos + 50,
                tree[i].y_Pos + 50, 65, 25);
        ellipse(tree[i].x_Pos + 50,
                tree[i].y_Pos + 30, 55, 30);
        ellipse(tree[i].x_Pos + 50,
                tree[i].y_Pos + 10, 40, 20);
        ellipse(tree[i].x_Pos + 50,
                tree[i].y_Pos, 30, 15);
        ellipse(tree[i].x_Pos + 50,
                tree[i].y_Pos - 10, 20, 10);
        ellipse(tree[i].x_Pos + 50,
                tree[i].y_Pos - 15, 10, 5);
    }

    //pineTree
    for (var i = 0; i < pineTree.length; i++) 
    {
        noStroke();
        fill(165, 42, 42);
        rect(pineTree[i].x_Pos + 843,
             pineTree[i].y_Pos + 70,
             25, 80, 3);
        stroke(0, 100, 100)
        fill(154, 205, 50);
        triangle(pineTree[i].x_Pos + 805,
                 pineTree[i].y_Pos + 100,
                 pineTree[i].x_Pos + 905,
                 pineTree[i].y_Pos + 100,
                 pineTree[i].x_Pos + 857,
                 pineTree[i].y_Pos);
        fill(0, 255, 127);
        triangle(pineTree[i].x_Pos + 812.5,
                 pineTree[i].y_Pos + 63,
                 pineTree[i].x_Pos + 896,
                 pineTree[i].y_Pos + 63,
                 pineTree[i].x_Pos + 855.5,
                 pineTree[i].y_Pos - 12);
        fill(60, 179, 113);
        triangle(pineTree[i].x_Pos + 823,
                 pineTree[i].y_Pos + 23,
                 pineTree[i].x_Pos + 883.5,
                 pineTree[i].y_Pos + 23,
                 pineTree[i].x_Pos + 855,
                 pineTree[i].y_Pos - 33);
    }
}

// Function to draw canyon objects.
function drawCanyon(t_canyon) 
{
    noStroke();
    fill(255, 248, 220)
    rect(t_canyon.x_Pos,
         t_canyon.y_Pos,
         t_canyon.width, 150)
    //canyon death ellipses
    for (var j = 0; j < 9; j++) 
    {
        fill(0);
        ellipse(t_canyon.x_Pos + 9 * j,
                t_canyon.y_Pos + 110,
                2, 40)
    }
}

// Function to check canyon objects.
function checkCanyon(t_canyon) 
{
    if (gameChar_world_x > t_canyon.x_Pos &&
        gameChar_world_x < t_canyon.x_Pos +
        t_canyon.width &&
        gameChar_y >= floorPos_y) 
    {
        isPlummeting = true;
        //to make the character fall straight 
        if(gameChar_world_x >
           t_canyon.x_Pos +
           t_canyon.width / 2) 
        {
            gameChar_x -= 5
        } 
        else if (gameChar_world_x <
                 t_canyon.x_Pos +
                 t_canyon.width / 2) 
        {
            gameChar_x += 5
            fallSound.play();
        }
    }
}

// Function to draw collectable objects
function drawCollectable(t_collectable) 
{
    strokeWeight(1);
    stroke(0, 0, 0);
    fill(169, 169, 169);
    rect(t_collectable.x_Pos - 4,
         t_collectable.y_Pos + 10,
         20, 8, 3.1);
    stroke(128, 0, 0);
    fill(218, 165, 32);
    rect(t_collectable.x_Pos + 3,
         t_collectable.y_Pos + 17.9,
         5.5, 25, 1.5)

}

// Function to check collectable objects
function checkCollectable(t_collectable) 
{
    var d = dist(gameChar_world_x,
                 gameChar_y - 50,
                 t_collectable.x_Pos,
                 t_collectable.y_Pos);

    if (d < 35) 
    {
        
        t_collectable.isFound = true
        collectedSound.play();
        game_score += 1; 
    }
}

// Function to draw end door 
function renderFlagpole()
{
    stroke(160, 82, 45);
    strokeWeight(4);
    fill(255);
    ellipse(flagpole.x_Pos + 45,
            flagpole.y_Pos,
            90,40)
    rect(flagpole.x_Pos, 
         flagpole.y_Pos,
         90, 105)
    ellipse(flagpole.x_Pos + 20, flagpole.y_Pos +
            55,10,10)
 
}

// Function to check end door
function checkFlagpole()
{
    var d = flagpole.x_Pos - gameChar_world_x
    if (d < 15) 
    {
        flagpole.isReached = true
    }
}

// Function to create platforms
function createPlatforms(x, y, length)
{
    var p = 
    {
        x: x, 
        y: y, 
        length: length, 
        draw: function()
        {
            strokeWeight(4);      
            stroke(224,255,255);
            fill(127,255,212);
            rect(this.x, this.y, this.length, 15);
        },
        checkContact: function(gc_x, gc_y)
        {
            //check if game char is on top 
            if (gc_x > this.x && 
                gc_x < this.x + this.length)
            {
                var d = this.y - gc_y;
                if(d >= 0 && d < 5)
                {
                    return true;
                }
            }
            return false;
        }
    }
    return p;
}

// Function to create enemies
function Enemy(x, y, range)
{
    this.x = x;
    this.y = y;
    this.range = 130; 
    this.current_x = x; 
    this.inc = 1;
    
    this.draw = function()
    {
        stroke(255, 255, 0)
        strokeWeight(3);
        fill(255, 69, 0);
        ellipse(this.current_x, this.y - 25, 30)
        stroke(255, 255, 0)
        ellipse(this.current_x, this.y - 25, 20)
        ellipse(this.current_x, this.y - 25, 10)
    }
    
    this.update = function()
    {
        this.current_x  += this.inc;
        
        if(this.current_x < this.x)
        {
            this.inc = 1.5;
        }
        else if(this.current_x > 
                this.x + this.range)
        {
            this.inc = - 1.5;
        }
    }
    
    this.isContact = function(gc_x, gc_y)
    {
        var d = dist(gc_x, gc_y, this.current_x, this.y)
        
        if(d < 30)
        {
            return true;
        }
        
        return false;
    }
}

//function to create a bonus live when gamescore = 10 
function bonusLive()
{
    lives += 1;
    
    fill(245, 255, 250);
        ellipse(livesPos_x + 75,
                livesPos_y - 60, 29, 29);
        push();
        stroke(0, 0, 255);
        strokeWeight(2);
        fill(0, 0, 255);
        line(livesPos_x - 14 + 75,
             livesPos_y - 70,
             livesPos_x + 14 + 75,
             livesPos_y - 70);
        rect(livesPos_x - 8 + 75,
             livesPos_y - 83, 17, 12);
        pop();
        //eyes
        push();
        stroke(1);
        strokeWeight(2);
        ellipse(livesPos_x - 6 + 75,
                livesPos_y - 63, 3, 3);
        ellipse(livesPos_x + 4 + 75,
                livesPos_y - 63, 3, 3);
        pop();
        //nose
        push();
        noStroke();
        fill(255, 165, 0);
        triangle(livesPos_x - 3 + 50,
                 livesPos_y - 58,
                 livesPos_x + 3 + 50,
                 livesPos_y - 58,
                 livesPos_x + 75,
                 livesPos_y - 48);
        pop();
    
    return;
}
