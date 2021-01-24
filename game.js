//variable section
let colours = ["green","red","yellow","blue"];
let level =0;
let gamePattern = [];
let userClickedPattern =[];
let started = false;
let currentStep = 0;

//main function section

//init
$(document).keypress(function(event){
	if(started==false){
		started = true;
	    $("h1").text("Level 0");
	    nextSequence();
	}
});	

function nextSequence(){

	currentStep=0;
	userClickedPattern=[];
	level++;
	
	$("h1").text("level "+level);
	
	let x = Math.floor(Math.random()*4) ;
	let randomcolour = colours[x];

	playedSounds(randomcolour);
    gamePattern.push(randomcolour);
	$("#"+randomcolour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(".btn").click(function(event){
	userClickedPattern.push(this.id);
	animatePress(this.id);
	playedSounds(this.id);

	check();
});

function check(){
	if(currentStep+1==level){
		if(userClickedPattern[currentStep]==gamePattern[currentStep]){
			nextSequence();
		}
		else{
			lost();
		}
	}
	else if(currentStep<level){
		if(userClickedPattern[currentStep]!=gamePattern[currentStep]){
			lost();
		}
		currentStep++;
	}
	else{
		lost();
	}
}

//helpful intermediate functions
function startOver(){
	level = 0;
	gamePattern = [];
	userClickedPattern =[];
	started = false ;
	currentStep=0; 
}

function lost(){
	$("h1").text("Game Over, Press any key to start");
	playedSounds("wrong");
	$(document.body).addClass("game-over");
	setTimeout(function(){ $(document.body).removeClass("game-over"); }, 200);
	startOver();
}

function playedSounds(name){
	let y = new Audio("sounds\\" + name + ".mp3");
	y.play();
}

function animatePress(name){
	$("#"+name).addClass("pressed");
	setTimeout(function(){ $("#"+name).removeClass("pressed"); }, 100);
}