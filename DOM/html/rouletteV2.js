"use strict";

// Array to store the last 9 spins
let lastSpins = [];

// "Main" function
function spin() {
    // Assign roulette numbers to an array
    let roulette = [0, 34, 10, 21, 28, 4, 18, 9, 27, 22, 12, 3, 17, 20, 11, 33, 2, 10, 32, "00", 15, 8, 25, 1, 31, 20, 14, 30, 7, 24, 29, 35, 6, 13, 23, 19, 5, 36];
    
    // Randomize a value
    let chosenIndex = Randomize(roulette.length);

    // Number picked
    let pickedNumber = roulette[chosenIndex];
    
    // Set color variable
    let color = "";
    if(chosenIndex % 2) {
        color = "Noir";  // Black
    } else {
        color = "Rouge"; // Red
    }

    // Set number as 'Pair' or 'Impair'
    let numberType = "";
    if((roulette[chosenIndex] % 2) || (roulette[chosenIndex] == "0")) {
        numberType =  "Impair";   // Odd
    } else {
        numberType = "Pair";  // Even
    }

    // Check if number is 'Manque' or 'Passe'
    let numberCheck = "";
    if(roulette[chosenIndex] <= 18) {
        numberCheck = "Manque";    // Failed 1-18
    } else if((roulette[chosenIndex] > 18) || roulette[chosenIndex] == "00") {
        numberCheck = "Passe"  // Passed 19-36
    }

    // Update the table
    updateTable(pickedNumber, color, numberType, numberCheck);
}

// Function for randomizing a number for the array
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function Randomize(max) {
    return Math.floor(Math.random() * max);
}

// Function used to update the display table
function updateTable(result, color, type, check) {
    // Add the spin to the array of last spins
    lastSpins.push({result, color, type, check})

    // Keep only the latest 9 spins
    if (lastSpins.length > 9) {
        // Remove the oldest spin
        lastSpins.shift();
    }

    // Get the table body
    let tableBody = document.querySelector('#pastSpins tbody');

    // Clear the table body
    tableBody.innerHTML = '';

    // Insert rows for each past spin
    lastSpins.forEach((spin) => {
        let newRow = tableBody.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);

        // Fill with values
        cell1.textContent = spin.result;
        cell2.textContent = spin.color;
        cell3.textContent = spin.type;
        cell4.textContent = spin.check;

        // Fill with appropriate color
        cell2.classList.add(spin.color)
        cell3.classList.add(spin.type);
        cell4.classList.add(spin.check);
    });
}

// Event listener to the button
document.getElementById('spin').addEventListener('click', spin);