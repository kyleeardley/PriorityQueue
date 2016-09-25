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

var itemsArray = [];
var prioritiesArray = [];

// Insert Method (Must Take a Number)

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

// Remove Method
function queueItemClicked(eventText) {
	var arrayIndex = eventText.split('Index:')[1][1];
	itemsArray.splice(arrayIndex, 1);
	buildList();
}

document.querySelector('ul').addEventListener('click', function(event) {
	// console.log(event.target.childNodes[0]);
	queueItemClicked(event.target.innerText);
});

function organizeArray(newItemObject) {
	prioritiesArray = [];
	// console.log(newItemObject);
	for(var i=0; i<itemsArray.length; i++) {
		prioritiesArray.push(itemsArray[i].itemNumber);
	}
	// console.log(prioritiesArray);
	// console.log(newItemObject.itemNumber);
	if(prioritiesArray.indexOf(newItemObject.itemNumber) > -1) {
		newItemObject.itemPriority = newItemObject.itemNumber - 1;
		console.log(newItemObject.itemPriority);
		itemsArray.push(newItemObject);
	} else {
		newItemObject.itemPriority = newItemObject.itemNumber;
		itemsArray.push(newItemObject);
	}
	itemsArray.sort(function(a, b){
		return (a.itemPriority + a.itemNumber) - (b.itemPriority + b.itemNumber);
	})
	for(var i=0; i<itemsArray.length; i++) {
		itemsArray[i].itemIndex = i;
	}
	console.log(itemsArray); 
	buildList();
}

function buildList() {
	var currentList = document.querySelector('#queueList');
	while(currentList.firstChild) {
		currentList.removeChild(currentList.firstChild);
	}
	// console.log('current ul ' + currentList);	
	for(var i=0; i<itemsArray.length; i++) {
		var child = document.createElement('li');
		child.innerHTML = "Index: " + itemsArray[i].itemIndex +'\xa0\xa0\xa0\xa0\xa0'  +"Number: " + itemsArray[i].itemNumber + 
			'\xa0\xa0\xa0\xa0\xa0' + "Priority: " + itemsArray[i].itemPriority + '\xa0\xa0\xa0\xa0\xa0' + "(Click here to delete item)";

		currentList.appendChild(child);
	}
}