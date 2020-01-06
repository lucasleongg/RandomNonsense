
//***CALCULATE BILL FUNCTION***
const calculateBill = (billAmount, GST, serviceCharge, numOfPeople) => {
	let totalGST = GST * billAmount;
	let totalServiceCharge = serviceCharge * billAmount;
	
	let individualBill = (billAmount + totalGST + totalServiceCharge)/ numOfPeople;
	document.getElementById("answer").innerHTML = "Please pay:  <span id='amount'>$" + individualBill.toFixed(2) + "</span>";
}

const abutton = document.getElementById("submit");
abutton.onclick = function() {
	if (validateForm()) {
		// get the bill amount in form
		let billAmount = +document.getElementById("totalBill").value;
		
		// check if GSTCheckbox is checked
		let GST = 0;
		if (document.getElementById("GSTCheckbox").checked) {
			GST = +document.getElementById("GSTNumber").value/100;
		}
		
		// check if serviceChargeCheckbox is checked
		let serviceCharge = 0;
		if (document.getElementById("serviceChargeCheckbox").checked) {
			serviceCharge = +document.getElementById("serviceChargeNumber").value/100;
		}
		
		let numOfPeople = 1;
		if (document.getElementById("splitBillCheckbox").checked) {
			numOfPeople = +document.getElementById("numOfPeople").value;
		} 
		
		calculateBill(billAmount, GST, serviceCharge, numOfPeople);
	}
}
// ***END CALCULATE BILL FUNCTION***

// ***Validate Form***
const validateForm = () => {
	let constraints =0;
	
	let billAmount = +document.getElementById("totalBill").value;
	let currentNumOfPeople = +document.getElementById("numOfPeople").value;
	if (billAmount<=0) {
		alert("You eat for free?");
		return false;
	} else if (currentNumOfPeople<=0) {
		alert("Please input a valid number of people");
	}
	
	else {
		return true;
	}
}
// ***END Validate form***

// ***Hide and display form when checked***
const GSTCheckBox = document.getElementById("GSTCheckbox");
GSTCheckbox.onclick=function() {
	if (document.getElementById("GSTCheckbox").checked===true){
		document.getElementById("GSTNumberSpan").style.display = "inline";
	} else {
		document.getElementById("GSTNumberSpan").style.display = "none";
	}
}

const serviceCheckBox = document.getElementById("serviceChargeCheckbox");
serviceCheckBox.onclick=function() {
	if (document.getElementById("serviceChargeCheckbox").checked===true){
		document.getElementById("serviceChargeNumberSpan").style.display = "inline";
	} else {
		document.getElementById("serviceChargeNumberSpan").style.display = "none";
	}
}

const splitBillCheckbox = document.getElementById("splitBillCheckbox");
splitBillCheckbox.onclick=function() {
	if (document.getElementById("splitBillCheckbox").checked===true){
		document.getElementById("numOfPeopleSpan").style.display = "inline";
	} else {
		document.getElementById("numOfPeopleSpan").style.display = "none";
	}
}
// ***END Hide and display form when checked***