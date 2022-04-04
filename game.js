// alert("Bs");

var buttonColours= ["red", "blue", "green", "yellow"];
var gamePattern= [];
var userClickedPattern= [];

var started= false;
var level=0;


$(document).on("keypress", function(){
  if(!started){
  $("#level-title").text("Level "+ level);
  nextSequence();
  started= true;
}

});



  $(".btn").on("click", function(){

   //console.log(e);
     var userChosenColour=  $(this).attr('id'); //e.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
  //  console.log(userClickedPattern);

   checkAnswer(userClickedPattern.length-1);

  });


function startOver()
{
  level=0;
  gamePattern= [];
  started= false;

}




function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length)
     {
       //5. Call nextSequence() after a 1000 millisecond delay.
       setTimeout(function () {nextSequence();}, 1000);
     }
   }
 else {

  // console.log("wrong");
  playSound("wrong");
  // var aud= new Audio("sounds/wrong.mp3");
  // aud.play();

  $("body").addClass("game-over");

  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);

   $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();

 }

}


function nextSequence()
{
  userClickedPattern = [];
  level++;
  //$("h1").text("Level "+level);
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(4*Math.random());   // 0 -- 3.999
  var randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name)
{
  var audio= new Audio("sounds/"+ name + ".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  $("#"+ currentColor).addClass("pressed");
  setTimeout(function(){$("#"+currentColor).removeClass("pressed");}, 100);
}
