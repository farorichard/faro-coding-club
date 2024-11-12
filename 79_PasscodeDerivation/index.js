/*
    A common security method used for online banking is to ask the user for three random characters
    from a passcode. For example, if the passcode was 531278, they may ask for the 2nd, 3rd, and 5th 
    characters; the expected reply would be: 317.

    The text file, keylog.txt, contains fifty successful login attempts.

    Given that the three characters are always asked for in order, analyse the file so as to determine 
    the shortest possible secret passcode of unknown length.
*/
const fs = require('fs/promises');

var filename="./keylog.txt"
var passcode = [];
var queue = [];
var dependents = [];
var sorted_dependents = [];

async function readTextFile(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return data;
    } catch (err) {
      console.error(err);
    }
}

async function sortingQueuenode(data, keyIndex) {
    //console.log("Processing: " + data[keyIndex] + data[keyIndex+1] + data[keyIndex+2]);
    //-----3rd digit
    //console.log(data[i]);
    //console.log("Number: " + data[keyIndex+2] + " - " + queue[data[keyIndex+2]]);
    if (typeof queue[data[keyIndex+2]] === 'undefined') {
        queue[data[keyIndex+2]] = 2;
        dependents[data[keyIndex+2]] = [];
    }
    queue[data[keyIndex+2]] = queue[data[keyIndex+2]] + 2;
    //console.log("Dependents[" + data[keyIndex+2] + "] ~ " + data[keyIndex+1]);
    dependents[data[keyIndex+2]].push(data[keyIndex+1]);
    //-----2nd digit
    if (typeof queue[data[keyIndex+1]] === 'undefined') {
        queue[data[keyIndex+1]] = 1;
        dependents[data[keyIndex+1]] = [];
    }
    queue[data[keyIndex+1]] = queue[data[keyIndex+1]] + 1;
    //console.log("Dependents[" + data[keyIndex+1] + "] ~ " + data[keyIndex]);
    dependents[data[keyIndex+1]].push(data[keyIndex]);
    //-----1st digit
    if (typeof queue[data[keyIndex]] === 'undefined') {
        queue[data[keyIndex]] = 0;
        dependents[data[keyIndex]] = [];
    }            
    return true;
}

async function uniqueArray(array) {
    for (let i = 0; i < array.length; i++) {
        //--- remove duplicates
        let uniqueArray = array.filter(function(item, pos) {
            return array.indexOf(item) == pos;
        });
    }
    return uniqueArray;
}

function findMissingElements(arr1, arr2) {
    const result = [];
  
    console.log
    for (const element of arr1) {
      if (!arr2.includes(element)) {
        result.push(element);
      }
    }
    return result;
  }
  

readTextFile(filename)
    .then(console.log("--- Begin Processing"))
    .then(data => {
        //console.log(data);
        for (let datai = 0; datai < data.length; datai++) {
            sortingQueuenode(data, datai);
            //--- skip forward 3 digits
            datai = datai + 3;
          }
    })
    .then(data => {
        console.log("--- Add itself to dependents")
        for (let i = 0; i < dependents.length; i++) {
            if (typeof dependents[i] !== 'undefined') {
                dependents[i].push(i.toString());
                //console.log("dependents[" + i + "]: " + dependents[i])
            }
        }
    })    
    //--- Check the Progress
    .then(data => {
        console.log("--- Check Progress")
        //console.log("Queue: ", queue);
        //console.log("Dependents: ", dependents);
        for (let i = 0; i < dependents.length; i++) {
            console.log("dependents[" + i + "]: " + dependents[i])
        }
    })   
    //--- Sort the Dependents based on the number of dependents
    .then(data => {
        console.log("--- Sorting Dependents")
        //--- Remove duplicates
        for (let i = 0; i < dependents.length; i++) {
            sorted_dependents[i] = [ ...new Set(dependents[i])]  // remove duplicates
            //console.log("sorted_dependents[" + i + "]: " + sorted_dependents[i])
        }
        sorted_dependents.sort((a, b) => Object.keys(a).length - Object.keys(b).length); // sort the dependents
        //--- Sorted Dependents
        for (let i = 0; i < dependents.length; i++) {
            console.log("new sorted_dependents[" + i + "]: ", sorted_dependents[i])
        }
    })
    .then(data => {
        used_digits = [];
        for (let i = 0; i < sorted_dependents.length; i++) { // iterate through the sorted_dependents
            //console.log("Processing sorted_dependents[" + i + "]: ", sorted_dependents[i])
            if ( sorted_dependents[i].length > 0 ) { // if the sorted_dependents has dependents
                var tmp_digits = findMissingElements(sorted_dependents[i], used_digits)
                //console.log("tmp_digits: ", tmp_digits)
                tmp_digits.forEach(element => {
                    //console.log("Adding: ", element)
                    passcode.push(element)
                    used_digits.push(element)
                })
            } else {
                sorted_dependents[i] = []
            }
        }
        console.log("Finish Processing")
        console.log("passcode: ", passcode);
        console.log("passcode: ", passcode.join(''));
    })
    .catch((e) => console.error(e));
