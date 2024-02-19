"use strict";

//my persistent websocket connection
let sock; 
let lastSpins = [];

function keyPressed(ev){
    if(ev.key === "Enter"){
        sendMessage();
    }
}

function sendMessage(){
    // Get roulette results
    // ... same code from roulette lab
    let roulette = [0, 34, 10, 21, 28, 4, 18, 9, 27, 22, 12, 3, 17, 20, 11, 33, 2, 10, 32, "00", 15, 8, 25, 1, 31, 20, 14, 30, 7, 24, 29, 35, 6, 13, 23, 19, 5, 36];
    let chosenIndex = Randomize(roulette.length);
    let pickedNumber = roulette[chosenIndex];
    let color = "";
    if(chosenIndex % 2) {
        color = "Noir";  // Black
    } else {
        color = "Rouge"; // Red
    }
    let numberType = "";
    if((roulette[chosenIndex] % 2) || (roulette[chosenIndex] == "0")) {
        numberType =  "Impair";   // Odd
    } else {
        numberType = "Pair";  // Even
    }
    let numberCheck = "";
    if(roulette[chosenIndex] <= 18) {
        numberCheck = "Manque";    // Failed 1-18
    } else if((roulette[chosenIndex] > 18) || roulette[chosenIndex] == "00") {
        numberCheck = "Passe"  // Passed 19-36
    }

    // Pack it as a string
    let msg = JSON.stringify({pickedNumber, color, numberType, numberCheck});
    
    sock.send( msg );

 
}

// Function for randomizing a number for the array
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function Randomize(max) {
    return Math.floor(Math.random() * max);
}

function messageReceived(ev){
    let jsonString = ev.data;
    let jsonObject = JSON.parse(jsonString);

    // Depack info
    let result = jsonObject.pickedNumber;
    let color = jsonObject.color;
    let type = jsonObject.numberType;
    let check = jsonObject.numberCheck;

    // Store the last 9 spins
    lastSpins.push({result, color, type, check});
    if(lastSpins.length > 9) {
        lastSpins.shift();
    }        

    let tableBody = document.querySelector('#pastSpins tbody');
    tableBody.innerHTML = '';

    // Update table
    lastSpins.forEach((spin) => {
        let newRow = tableBody.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
    
        // Fill with values from the current spin
        cell1.textContent = spin.result;
        cell2.textContent = spin.color;
        cell3.textContent = spin.type;
        cell4.textContent = spin.check;
    
        // Fill with appropriate color
        cell2.classList.add(spin.color);
        cell3.classList.add(spin.type);
        cell4.classList.add(spin.check);
    })
}

function main(){
    sock = new WebSocket("ws://"+document.location.host+"/sock");
    sock.addEventListener("open", ()=>{ 
        let b = document.getElementById("sendButton");
        b.disabled=0
    });
    sock.addEventListener("message", messageReceived )
    
}

main();