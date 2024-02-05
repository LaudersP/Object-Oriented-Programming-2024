"use strict";

// Counter for spin number
let spinCounter = 0;

// Array to store the last 9 spins
let lastSpins = [];

// "Main" function
function spin() {
    // Assign roulette numbers to an array
    let roulette = [0, 34, 10, 21, 28, 4, 18, 9, 27, 22, 12, 3, 17, 20, 11, 33, 2, 10, 32, "00", 15, 8, 25, 1, 31, 20, 14, 30, 7, 24, 29, 35, 6, 13, 23, 19, 5, 36];
    
    // Randomize a value
    let chosenIndex = Randomize(roulette.length);

    console.log(roulette[chosenIndex]);

    spinCounter++;

    updateTable(roulette[chosenIndex]);
}

// Function for randomizing a number for the array
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function Randomize(max) {
    return Math.floor(Math.random() * max);
}

// Function used to update the display table
function updateTable(result) {
    // Add the spin to the array of last spins
    lastSpins.push({result})

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

        cell1.textContent = spin.result;
    });
}

// Event listener to the button
document.getElementById('spin').addEventListener('click', spin);