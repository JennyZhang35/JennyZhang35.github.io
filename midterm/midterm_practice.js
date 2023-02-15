"use strict";
/*   Midterm Practice
      Author: 
      Date:   
 */

// write logic to focus on 11th input element in the form

const myForm = document.forms.myForm;
const elemFullName = document.getElementById("fullName");
const elemGender = myForm.gender; // get the Gender radio button in an array
const elemAddr1 = document.getElementById("address1");
const elemAddr2 = document.getElementById("address2");
const elemCity = document.getElementById("city");
const elemProvince = document.getElementById("province");
const elemPostalCode = document.getElementById("postalCode");
const elemCountry = document.getElementById("country");
const elemEmail = document.getElementById("email");
const elemTuition = document.getElementById("tuition");

const outputList = document.getElementById("output");

const arrOfLi = document.querySelectorAll("#output>li");
console.log(arrOfLi);

//console.log(elemGender);

// write logic to prefill form elements programmatically with the given data below
let data = {
  firstName: "Linda",
  lastName: "Smith",
  gender: "male",
  address1: "suite 123",
  address2: "33 Younge Street",
  province: "ON",
  city: "Toronto",
  postalCode: "H7H0I8",
  country: "Canada",
  tuition: "7000.30",
};

function prefillData() {
  elemFullName.value = data["firstName"] + " " + data["lastName"];
  elemGender[2].checked = true;
  //document.getElementById("male").checked = true;
  elemAddr1.value = data["address1"];
  elemAddr2.value = data["address2"];
  elemCity.value = data["city"];
  elemProvince.value = "ON";
  elemPostalCode.value = data["postalCode"];
  elemCountry.value = data["country"];
  elemTuition.va;

  lue = data["tuition"];
}

function displayInfo() {
  const arrOfLi = document.querySelectorAll("#output>li");
  arrOfLi[0].textContent = elemFullName.value;
  arrOfLi[1].innerHTML = elemGender.value;
  arrOfLi[2].innerHTML = elemAddr1.value + " " + elemAddr2.value;
  arrOfLi[3].innerHTML = elemCity.value;
  arrOfLi[4].innerHTML = elemProvince.value;
  arrOfLi[5].innerHTML = elemPostalCode.value;
  arrOfLi[6].innerHTML = elemCountry.value;
  arrOfLi[7].innerHTML = elemEmail.value;
  arrOfLi[8].innerHTML = elemTuition.value;
}

//console.log(elemFullName.textContent);

/* write logic to listen for event from input fields (change/input) or submit button and 
populate the output section on the left of the screen.
suggestion: practice with all event types
*/

window.addEventListener("load", prefillData);

myForm.addEventListener("change", (event) => {});
