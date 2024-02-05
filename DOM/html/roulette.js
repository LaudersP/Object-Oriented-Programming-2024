"use strict";

// "Main" Function
function Roulette() {
    // Assign roulette numbers to an array
    let roulette = [0, 34, 10, 21, 28, 4, 18, 9, 27, 22, 12, 3, 17, 20, 11, 33, 2, 10, 32, "00", 15, 8, 25, 1, 31, 20, 14, 30, 7, 24, 29, 35, 6, 13, 23, 19, 5, 36];
    
    // Randomize a value
    let chosenIndex = Randomize(roulette.length);

    // Array of french number name
    let frenchNumbers = ["Zero", "Trente-quatre", "Dix", "Vingt-et-un", "Vingt-huit", "Quatre", "Dix-huit", "Neuf", "Vingt-sept", "Vingt-deux", "Douze", "Trois", "Dix-sept", "Vingt", "Onze", "Trente-trois", "Deux", "Dix", "Trente-deux", "Double-Zero", "Quinze", "Huit", "Vingt-cinq", "Un", "Trente-et-un", "Vingt", "Quatorze", "Trente", "Sept", "Vingt-quatre", "Vingt-neuf", "Trente-cinq", "Six", "Treize", "Vingt-trois", "Dix-neuf", "Cinq", "Trente-six"];

    // Add French name for number
    let s = frenchNumbers[chosenIndex];

    // Decide if the number is Noir or Rouge
    if(chosenIndex % 2) {
        s += ", Noir";  // Black
    } else {
        s += ", Rouge"; // Red
    }

    // Decide if the number is Pair or Impair
    if((roulette[chosenIndex] % 2) || (roulette[chosenIndex] == "0")) {
        s +=  ", Impair";   // Odd
    } else {
        s += ", Pair";  // Even
    }

    // Decide if the number is Manque or Passe
    if(roulette[chosenIndex] <= 18) {
        s += ", Manque";    // Failed 1-18
    } else if((roulette[chosenIndex] > 18) || roulette[chosenIndex] == "00") {
        s += ", Passe"  // Passed 19-36
    }

    // Output to console the roulette number which was chosen
    console.log(s);
}

// Function for randomizing a number for the array
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function Randomize(max) {
    return Math.floor(Math.random() * max);
}

Roulette();