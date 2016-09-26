'use strict';

/*

1. The queue must have an insert method which takes a number.

   a. If the number is not already present in the queue, 
      it is added to the queue with a priority equal to the number.

   b. If the number is present, its priority is increased by one.

2. The queue must have a remove method which does not take any arguments, 
   and removes and returns the number with the highest priority.

3. The insert and remove functions should run in O(lg n)


*/

// Instantiate Global Variables

var itemsArray = [];
var prioritiesArray = [];

// Setup Event Listeners

document.querySelector('ul').addEventListener('click', function(event) {
	// console.log(event.target.childNodes[0]);
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
		window.alert("Please enter a number into the input fields");
	}
}

// Remove Item Method

function queueItemClicked(eventText) {
	var arrayIndex = eventText.split('Row:')[1][1] - 1;
	itemsArray.splice(arrayIndex, 1);
	organizeArray();
}

// Organize Array Elements

function organizeArray(newItemObject) {
	prioritiesArray = [];
	var statusObjectArray = [];
	var existsBooleanArray = [];
	var itemProcessed = false;
	// Check For New Item and Compare To Existing Priorities
	if(newItemObject) {
		for(var i=0; i<itemsArray.length; i++) {
			prioritiesArray.push(itemsArray[i].itemNumber);
		}
		if(prioritiesArray.indexOf(newItemObject.itemNumber) > -1) {
			newItemObject.itemPriority = newItemObject.itemNumber + 1;
		itemsArray.push(newItemObject);
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
		
		//check priorities and number, if number matches then check priorities, if no numbers match check all numbers against
		//priorities and make sure that number = priority
		for(var i=0; i<statusObjectArray.length; i++) {
			if(statusObjectArray[i].number != statusObjectArray[i].priority &&
			   statusObjectArray[i+1] && statusObjectArray[i].priority == statusObjectArray[i+1].priority) {
				for(var t=statusObjectArray.length - 1; t>-1; t--) {
					//if there's no item whose number and priority match then subtract one from priority of item in i.
					existsBooleanArray.push(statusObjectArray[t].number == statusObjectArray[t].priority);
				} 
				if(existsBooleanArray.indexOf(true) == -1 && !itemProcessed) {
					itemsArray[i].itemPriority -=1;
					existsBooleanArray = [];
					itemProcessed = true;
				}
			}
		}
	} 

	// Sort the Array
	itemsArray.sort(function(a, b){
		return (a.itemPriority + a.itemNumber) - (b.itemPriority + b.itemNumber);
	})
	// Index the Array
	for(var i=0; i<itemsArray.length; i++) {
		itemsArray[i].itemIndex = i;
	}
	buildList();
}

// Build Output Template

function buildList() {
	var currentList = document.querySelector('#queueList');
	while(currentList.firstChild) {
		currentList.removeChild(currentList.firstChild);
	}
	// console.log('current ul ' + currentList);	
	for(var i=0; i<itemsArray.length; i++) {
		var child = document.createElement('li');
		child.innerHTML = "Row: " + (itemsArray[i].itemIndex + 1) +'\xa0\xa0\xa0\xa0\xa0'  +"Number: " + itemsArray[i].itemNumber + 
			'\xa0\xa0\xa0\xa0\xa0' + "Priority: " + itemsArray[i].itemPriority + '\xa0\xa0\xa0\xa0\xa0' + "(Click here to delete item)";

		currentList.appendChild(child);
	}
}