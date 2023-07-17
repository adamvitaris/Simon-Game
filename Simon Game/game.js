var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var started = false;

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1)

})


$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function checkAnswer(currentLevel) {
    //var lastUserClickedPattern = userClickedPattern[userClickedPattern.length - 1];
    //var lastGamePattern = gamePattern[gamePattern.length - 1];

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        //console.log("sucess");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    }else {
        //console.log("wrong");
        playSound("wrong")
        
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
    }


function nextSequence() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#level-title").text("Level " + level);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
  }


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $(".btn").on("click", function() {
        var self = $(this);
        self.addClass("pressed");
        setTimeout(function() {
            self.removeClass("pressed")}
            , 100);
    })
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

}

