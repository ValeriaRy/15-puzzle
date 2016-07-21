"use strict";

const fieldSize = 4;
var parentField;
var button = document.getElementsByClassName("button")[0];

button.addEventListener("click", newGame);

function newGame() {
    var arr = createNumbersChips();
    createTable(arr);
	message.innerHTML = "";
}

function createTable(arr) {
    var removeTable = document.getElementById("puzzle");
	if (removeTable) {
		removeTable.parentNode.removeChild(removeTable);
    } 
    var numberCell = 1;
    var myTable = document.createElement("table");
	myTable.id = "puzzle";
	for (let i = 0; i < fieldSize; i++) {
	    var newRow = myTable.insertRow(i);
		for (let j = 0; j < fieldSize; j++) {
			var newCell = newRow.insertCell(j);
			newCell.dataset.i = String(i);
        	newCell.dataset.j = String(j);
			newCell.dataset.number = String(numberCell);
			createChips(arr, numberCell, newCell);
        	numberCell++;
        	}
	}
	document.body.appendChild(myTable);
	var node = document.querySelector("[data-number='" + (numberCell - 1) + "']");
	node.removeChild(node.childNodes[0]);
}

function createNumbersChips() {
    var lenghtArr = fieldSize * fieldSize;
    var arr = [];
    for (let i = 1; i < lenghtArr; i++) {
        arr.push(i);
    }
    arr = mix(arr);
    
    return arr;
}

function mix(array) {
    var newIndex, tempValue; 
    var actualIndex = array.length; 

    while (actualIndex !== 0) {
        newIndex = Math.floor(Math.random() * array.length);
        actualIndex--;
        tempValue = array[actualIndex];
        array[actualIndex] = array[newIndex];
        array[newIndex] = tempValue;
    }

    return array;
}

function createChips(arr, numberCell, cell) {
    var chip = document.createElement("div");
    chip.setAttribute("class", "chip");
    chip.innerHTML = arr[numberCell - 1];
    chip.id = "chip" + arr[numberCell - 1];
    chip.setAttribute("draggable", "true");
    chip.setAttribute("ondragstart", "drag(event)");
    cell.setAttribute("ondragover", "allowDrop(event)");
    cell.setAttribute("ondrop", "drop(event)");
    cell.appendChild(chip);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("chipTransfer");
    if ((!ev.target.firstChild) && move(ev.target)) {
        ev.target.appendChild(document.getElementById(data));
        if(winGame()) {
            message.innerHTML = "You win";
        };
    }
}

function drag(ev) {
    ev.dataTransfer.setData("chipTransfer", ev.target.id);
    parentField = ev.target.parentNode;
}

function winGame() {
    var listCell = document.getElementsByTagName("td");
    for (let i = 0; i < listCell.length; i++) {
        let chip = listCell[i].firstChild;
        if ((chip) && (listCell[i].getAttribute("data-number") === chip.innerHTML)) {
            
		return false;
        }
    }
	
    return true;
}

function move(currentField) {
    var currentI = currentField.getAttribute("data-i");
    var currentJ = currentField.getAttribute("data-j");
    var neighboringI = parentField.getAttribute("data-i");
    var neighboringJ = parentField.getAttribute("data-j");
    
    if (((currentI === neighboringI) && ((currentJ - neighboringJ === 1) || (neighboringJ - currentJ === 1)))
    || ((currentJ === neighboringJ) && ((currentI - neighboringI === 1) || (neighboringI - currentI === 1)))) {
        
        return true;
    }
}
