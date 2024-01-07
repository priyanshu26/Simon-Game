let buttonColor = ["red", "blue", "green", "yellow"];// Storing the colors

let gamePattern = []; // Pattern Of Random colors 
let userPattern = []; // pattern of user colors

let started = false; // start - check wheather game started or not.

let level = 0; // create level..


// First when we click any ramdom button to start the game.
$(document).keypress(function(){
    if(!started){ // check wheather game is started or not !started means true.
        $("#level-title").text("Level "+level); // set heading of level.
        nextSequence(); // call fuction to generate the random number.
        started = true; // start = true because when we check condition !started it will return false.
    }
})

function nextSequence(){
    userPattern = []; // every time level changes it will empty the users array.

    level++; // increase level by 1

    $("#level-title").text("Level "+level); // sets heading.

    let randomNumber = Math.floor(Math.random()*4); // generate random number 0 - 3
    let randomChosenColour = buttonColor[randomNumber]; // chose color by number..

    gamePattern.push(randomChosenColour); // add element to last in pattern
    fadeAnimation(randomChosenColour); // create fade animation..
    playSound(randomChosenColour); // play the sound..
}

//Handler fuction for user chosen color.
$(".btn").on("click", function(){
    let userChosenColor = $(this).attr("id"); //get users chosen color button ID
    userPattern.push(userChosenColor); // push the color to last
    fadeAnimation(userChosenColor); // create fade animation..
    playSound(userChosenColor); // play the sound..
    animatePress("#"+userChosenColor); // create animation of click
    checkAnswer(userPattern.length-1); // checks answer
})

// play sound
function playSound(name){
    let audioPlay = new Audio("./sounds/"+name+".mp3");
    audioPlay.play();
}

//fade animation
function fadeAnimation(idName){
    let callId = "#" + idName;
    $(callId).fadeIn(100).fadeOut(100).fadeIn(100);
}

//press animation
function animatePress(currentColor){
    $(currentColor).addClass("pressed");
    setTimeout(function(){ //set time interval of 100 millisecound.
        $(currentColor).removeClass("pressed"); //remove class
    }, 100); 
}


// checks answer.
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userPattern[currentLevel]){ // match current levels color
        if(userPattern.length === gamePattern.length){ // match current levels
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart"); // set heading

        startOver();// reset game
    }
}

// reset all things
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}
