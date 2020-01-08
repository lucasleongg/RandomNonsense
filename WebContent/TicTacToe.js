//***GAME LOGIC***
let userWinCount = 0
let cpuWinCount = 0



let select = document.getElementsByClassName("box");

let boxRemainingList = [];// to keep track of which boxes are clicked. left to
							// right from top row.
let userSelectedList = [];
let aiSelectedList = [];

for (let i=0; i<=8;i++) {
	boxRemainingList.push(i);
}

let winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

//initial update of scoreboard

//update scoreboard function
const updateScoreboard = () => {
	document.getElementById("userWinCount").innerHTML = userWinCount;
	document.getElementById("cpuWinCount").innerHTML = cpuWinCount;
}

updateScoreboard();



const changeToO = (i) => {
	if (boxRemainingList.includes(i)) { // if the button is still available
		select[i].style.backgroundImage = "url('https://image.freepik.com/free-icon/black-circle-white_318-10912.jpg')";
		userSelectedList.push(i);
		userSelectedList.sort();
		updateboxRemainingList(i);
		winCheck();
		aiTurn(); // ai turn to play
		winCheck();
	}
}

const aiTurn = () => {
	let loopFlag = false;
	let random;
	while (loopFlag===false && boxRemainingList.length>1) {
		random = Math.floor(Math.random() * 9);
		if (boxRemainingList.includes(random)) {// if the random number has not
												// been picked yet
			loopFlag=true;
		}
	}
	
	if (random!=undefined) {
		select[random].style.backgroundImage = "url('data:image/png;base64,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'";
		aiSelectedList.push(random);
		aiSelectedList.sort();
		updateboxRemainingList(random);
	}
}

const winCheck = () => {
	//scoreOfUserSelected = userSelectedList.reduce((a,b) => {return a+b});
	//console.log(scoreOfUserSelected);
	//if (userSelectedList.length>=3 && scoreOfUserSelected % 3===0) {
	//	document.getElementById("winMessage").innerHTML = "You Win!";
	//}
	winningCombinations.forEach(combination=> {
		if (combination.every(r=> userSelectedList.includes(r))) {//if userSelectedList contains winning combinations
			userWinCount+=1;
			updateScoreboard()
			document.getElementById("resetButton").innerHTML = "You Win! Play again?";
			document.getElementById("resetButton").style.backgroundColor = "#56c362";
			boxRemainingList=[];
			
		} else if (combination.every(r=> aiSelectedList.includes(r))) {
			cpuWinCount+=1;
			updateScoreboard();
			document.getElementById("resetButton").innerHTML = "You Lose:( Play again?";
			
			boxRemainingList=[];
		} else if (aiSelectedList.length + userSelectedList.length===9) {
			document.getElementById("resetButton").innerHTML = "DRAW!";
			boxRemainingList=[];
		}
	})
}

const updateboxRemainingList = (i) => {// function to update selected boxes
										// after clicking on it.
	// to remove specific item, need to find index and call splice on array
	let indexOfItemToRemove = boxRemainingList.indexOf(i);
	
	boxRemainingList.splice(indexOfItemToRemove,1);
}

for (let i=0; i<select.length; i++) {
	select[i].addEventListener("click", function() {changeToO(i)});
}
//***GAME LOGIC***

//***RESET BUTTON***
let resetButton = document.getElementById("resetButton");

const resetBoard = () => {
	 boxRemainingList = [];
	 for (let i=0; i<=8;i++) {
			boxRemainingList.push(i);
	 }
	 
	 userSelectedList = [];
	 aiSelectedList = [];
	 for (let i=0; i<select.length; i++) {
		 select[i].style.backgroundImage = "none";
	}
	 
	 //reset win message
	 document.getElementById("resetButton").innerHTML = "Reset";
}

resetButton.onclick = resetBoard;



//***RESET BUTTON***