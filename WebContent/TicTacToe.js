//***GAME LOGIC***
let userWinCount = 0
let cpuWinCount = 0
let gameEndFlag = false; //to determine game end


let select = document.getElementsByClassName("box");

let boxRemainingList = [];// to keep track of which boxes are clicked. left to
							// right from top row.
let userSelectedList = [];
let aiSelectedList = [];

for (let i=0; i<=8;i++) {
	boxRemainingList.push(i);
}

let winningCombinations = [[0,4,8],[2,4,6],[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8]];

//***initial update of scoreboard***
const updateScoreboard = () => {
	document.getElementById("userWinCount").innerHTML = userWinCount;
	document.getElementById("cpuWinCount").innerHTML = cpuWinCount;
}

updateScoreboard();
//***initial update of scoreboard***

const changeToO = (i) => {
	if (boxRemainingList.includes(i)) { // if the button is still available
		select[i].style.backgroundImage = "url('https://image.freepik.com/free-icon/black-circle-white_318-10912.jpg')";
		userSelectedList.push(i);
		userSelectedList.sort();
		updateboxRemainingList(i);
		winCheck();

		if (boxRemainingList.length!=0) {//if game has not ended
			aiTurn(); // ai turn to play
			winCheck();
		}
	}
}

const aiTurn = () => {
	let loopFlag = false;
	let aiChosenValue;
	
	//ai selection rules
	if (userSelectedList.length===1) { //first turn
		//remove user selected from selection
		if (userSelectedList[0]!=4) {
			aiChosenValue = 4;
		} else {
			aiChosenValue = 0;
		}
	} else {
		aiChosenValue = aiTryToBlockOrWin(aiSelectedList);
		if (aiChosenValue===undefined) {
			aiChosenValue = aiTryToBlockOrWin(userSelectedList)
		}
		if (aiChosenValue===undefined) {
			aiChosenValue = aiChoiceNotBlockingOrWinning(userSelectedList);
		}
	}
	
	//process after AI chooses value
	if (aiChosenValue!=undefined) {
		select[aiChosenValue].style.backgroundImage = "url('data:image/png;base64,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'";
		aiSelectedList.push(aiChosenValue);
		aiSelectedList.sort();
		updateboxRemainingList(aiChosenValue);
		aiChosenValue=undefined;//reset aichosenvalue;
	}	
}

const aiTryToBlockOrWin = (list)=> {
	let lastNumber = undefined;
	let matchScore = 0;
	let tempNumber;

	winningCombinations.forEach(combination => {
		combination.forEach(r=> { //loop through user list with values of combination to see if user is close to winning
			if (list.includes(r)===true) {
				matchScore+=1;
			}
		})
		if (matchScore===2) { //if userlist has 2 out of 3, loop again for the missing number
			combination.forEach(r=> {
				if (list.includes(r)===false && boxRemainingList.includes(r)===true) {
					lastNumber = r;
				}
			})
		}
		matchScore = 0; //reset matchScore
	})
	return lastNumber;
}

const aiChoiceNotBlockingOrWinning = (list) => {
	let idealChoices = [1,3,5,7];	
	let lastNumber;
	

	for (let r=1; r<=7;r+=2) { //loop through ideal choices, and remove if already chosen
		if (boxRemainingList.includes(r)===false) {
			
			let indexOfItemToRemove = idealChoices.indexOf(r);

			idealChoices.splice(indexOfItemToRemove,1);
		}
	}
	
	if (idealChoices.length!=0) { //if still got side boxes, randomly choose 1 which has not been chosen
		lastNumber = idealChoices[Math.floor(Math.random() * idealChoices.length)];

	} else if (idealChoices.length===0 && boxRemainingList.length>0){ //if all sides are picked
		lastNumber = boxRemainingList[Math.floor(Math.random() * boxRemainingList.length)];
	
	}
	
	return lastNumber;
}

const winCheck = () => {
	winningCombinations.forEach(combination=> {
		if (gameEndFlag===false) {
			if (combination.every(r=> userSelectedList.includes(r))) {//if userSelectedList contains winning combinations
				userWinCount+=1;
				updateScoreboard()
				document.getElementById("resetButton").innerHTML = "You Win! Play again?";
				document.getElementById("resetButton").style.backgroundColor = "#56c362";
				boxRemainingList=[];
				gameEndFlag = true;
				
			} else if (combination.every(r=> aiSelectedList.includes(r))) {
				cpuWinCount+=1;
				updateScoreboard();
				document.getElementById("resetButton").innerHTML = "You Lose:( Play again?";
				document.getElementById("resetButton").style.backgroundColor = "#e25353";
				boxRemainingList=[];
				gameEndFlag = true;
				
				console.log("lose");
			} else if (boxRemainingList.length===0) {
				document.getElementById("resetButton").innerHTML = "DRAW!";
				document.getElementById("resetButton").style.backgroundColor = "#abe253";
				boxRemainingList=[];
				console.log("draw");
				gameEndFlag = true;
			}
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
	 document.getElementById("resetButton").style.backgroundColor = "#4183D7";
	 
	 gameEndFlag = false;
}

resetButton.onclick = resetBoard;
//***RESET BUTTON***