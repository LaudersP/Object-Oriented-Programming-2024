"use strict";

function submit() {
    let rname = document.getElementById("rname").value;
    let dob = document.getElementById("dob").value;
    let email = document.getElementById("email").value;

    let J = {
        realName: rname,
        birthDate: dob,
        email: email
    };

    fetch("/profilev2",
        {
            method: "POST",
            body: JSON.stringify(J)
        }
    ).then((resp) => {
        resp.json().then((J) => {
            console.log("Server said:", J);
            document.location = document.location
        });
    }).catch((err) => {
        console.log("Uh oh", err);
    })
}