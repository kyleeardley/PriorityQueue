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
var firstTime = true;
var currentIndex = 0;
buildList();

// Setup Event Listeners

document.querySelector('ul').addEventListener('click', function(event) {
	queueItemClicked(event.target.innerText);
});

// Insert Item Method 

function submitClicked() {
	var formItemNumber = parseInt(document.querySelector('input[name="itemNumber"]').value);
	var itemObject = {
		"itemIndex": 0,
		"itemNumber": formItemNumber
		};
	if(formItemNumber) {
		insertArrayItem(itemObject);
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
	itemsArray.shift();
	buildList();
}

// Remove Clicked Item Method

function queueItemClicked(eventText) {
	var itemNumber = eventText.split('Number:')[1][1];
	var itemIndex = binarySearch(itemNumber, itemsArray);
	itemsArray.splice(itemIndex, 1);
	insertArrayItem();
}

// Organize Array Elements

function insertArrayItem(newItemObject) {
	var numberArray = [];
	// Check For New Item and Compare To Existing Priorities
	
	for(var i=0; i<itemsArray.length; i++) {
		numberArray.push(itemsArray[i].itemNumber);
	}
	// if item exists already in the array then add one to priority
	if(binarySearch(newItemObject.itemNumber, numberArray) > -1) {
		var itemIndex = binarySearch(newItemObject.itemNumber, itemsArray);
		itemsArray[itemIndex].itemPriority += 1;
	// else if item doesn't exist index and insert
	} else {
		newItemObject.itemPriority = newItemObject.itemNumber;
		if(itemsArray.length == 0) {
			itemsArray[0] = newItemObject;
		} else if(itemsArray[itemsArray.length -1].itemNumber < newItemObject.itemNumber){
			itemsArray[itemsArray.length] = newItemObject;
		} else if(newItemObject.itemNumber = 5){
			for(var i=arrayLength; i>=currentIndex; i--) {
				console.log(currentIndex, arrayLength);
				itemsArray[i+1] = itemsArray[i];
			}
			itemsArray[currentIndex +1] = newItemObject;
		} else {
			binarySearch(newItemObject.itemNumber, numberArray);
			var arrayLength = itemsArray.length -1;
			for(var i=arrayLength; i>=currentIndex; i--) {
				console.log(currentIndex, arrayLength);
				itemsArray[i+1] = itemsArray[i];
			}
			itemsArray[currentIndex] = newItemObject;
		}
	}
	// sortArray();
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

// Binary Search O(log n)

function binarySearch(searchElement, array) {
    var currentElement;
    var minIndex = 0;
    var maxIndex = array.length - 1;
    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentElement = array[currentIndex];
 		console.log("currentIndex " + currentIndex, "currentElement " + currentElement);
        if (currentElement < searchElement) {
            minIndex = currentIndex + 1;
        }
        else if (currentElement > searchElement) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }
 
    return -1;
}

// Build Output Template

function buildList() {
	var currentList = document.querySelector('#queueList');
	while(currentList.firstChild) {
		currentList.removeChild(currentList.firstChild);
	}
	if(firstTime) {
 		firstTime = false;
 		for(var i=0; i<5; i++) {
			var child = document.createElement('li');
			child.innerHTML = "Row: " + (i + 1) +'\xa0\xa0\xa0\xa0\xa0'  +"Number: " + (2 + i *2) + 
				'\xa0\xa0\xa0\xa0\xa0' + "Priority: " + (2 + i * 2) + '\xa0\xa0\xa0\xa0\xa0' + "(Click here to delete item)";

			currentList.appendChild(child);
			itemsArray[i] = {"itemIndex": i, "itemNumber": (2 + i * 2)}
		}
	} else {	
		for(var i=0; i<itemsArray.length; i++) {
			var child = document.createElement('li');
			child.innerHTML = "Row: " + (i + 1) +'\xa0\xa0\xa0\xa0\xa0'  +"Number: " + itemsArray[i].itemNumber + 
				'\xa0\xa0\xa0\xa0\xa0' + "Priority: " + itemsArray[i].itemPriority + '\xa0\xa0\xa0\xa0\xa0' + "(Click here to delete item)";

			currentList.appendChild(child);
		}
	}
}