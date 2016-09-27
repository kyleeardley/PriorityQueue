'use strict';

/*

1. The queue must have an insert method which takes a number.

   a. If the number is not already present in the queue, 
      it is added to the queue with a priority equal to the number.

   b. If the number is present, the new number isn't added to the array
	  the existing number's priority is increased by one

2. The queue must have a remove method which does not take any arguments, 
   and removes and returns the number with the highest priority.

3. The insert and remove functions should run in O(lg n)


*/

// Instantiate Global Variables

var itemsArray = [];

// Setup Event Listeners

document.querySelector('ul').addEventListener('click', function(event) {
	queueItemClicked(event.target.innerText);
});

// Insert Item Method 

function submitClicked() {
	var formItemNumber = parseInt(document.querySelector('input[name="itemNumber"]').value);
	var formItemPriority = document.querySelector('input[name="itemPriority"]').value;
	var itemObject = {
		"itemIndex": 0,
		"itemNumber": formItemNumber,
		"itemPriority": formItemPriority
		};
	if(formItemNumber) {
		organizeArray(itemObject);
		//clear out the input fields
		document.querySelector('input[name="itemNumber"]').value = '';
		document.querySelector('input[name="itemPriority"]').value = '';
	} else {
		window.alert("Please enter a number into the input field");
	}
}

// Dequeue Item

function dequeue() {
	sortArray();
	itemsArray.pop();
	buildList();
}

// Remove Clicked Item Method

function queueItemClicked(eventText) {
	var arrayIndex = eventText.split('Row:')[1][1] - 1;
	itemsArray.splice(arrayIndex, 1);
	organizeArray();
}

// Organize Array Elements

function organizeArray(newItemObject) {
	var numberArray = [];
	var statusObjectArray = [];
	var existsBooleanArray = [];
	var itemProcessed = false;
	// Check For New Item and Compare To Existing Priorities
	if(newItemObject) {
		for(var i=0; i<itemsArray.length; i++) {
			numberArray.push(itemsArray[i].itemNumber);
		}
		if(numberArray.indexOf(newItemObject.itemNumber) > -1) {
			var itemIndex = numberArray.indexOf(newItemObject.itemNumber);
			itemsArray[itemIndex].itemPriority += 1;
		} else {
			newItemObject.itemPriority = newItemObject.itemNumber;
			itemsArray.push(newItemObject);
		}
	} else {
		// If No New Object Organize New Spliced Array
		for(var i=0; i<itemsArray.length; i++) {
			statusObjectArray.push({
				"number": itemsArray[i].itemNumber,
				"priority": itemsArray[i].itemPriority
			});
		}
	} 
	sortArray();
	buildList();
}

// Sort the Array
function sortArray() {
	itemsArray.sort(function(a, b){
		return a.itemPriority - b.itemPriority;
	})
}

// Index the Array
function indexArray() {
	for(var i=0; i<itemsArray.length; i++) {
		itemsArray[i].itemIndex = i;
	}
}

// Build Output Template

function buildList() {
	var currentList = document.querySelector('#queueList');
	while(currentList.firstChild) {
		currentList.removeChild(currentList.firstChild);
	}	
	for(var i=0; i<itemsArray.length; i++) {
		var child = document.createElement('li');
		child.innerHTML = "Row: " + (itemsArray[i].itemIndex + 1) +'\xa0\xa0\xa0\xa0\xa0'  +"Number: " + itemsArray[i].itemNumber + 
			'\xa0\xa0\xa0\xa0\xa0' + "Priority: " + itemsArray[i].itemPriority + '\xa0\xa0\xa0\xa0\xa0' + "(Click here to delete item)";

		currentList.appendChild(child);
	}
}