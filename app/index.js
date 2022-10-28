console.log("Testingggg!");

let totalNames = null; // counts each time a name is appended to the display div
const totalNamesArray = []; // contains the names that are appended to the display div
const inputErrorPlaceholder = "! Please input a name that contains at least 3 characters";
const inputValidPlaceholder = "enter name";

/* 
                                                  STEP 1
--------------------------------------------------------
write the name in the input field and after
clicking the "add" button, display it in the
"displayInputtedNames" div [and remove the default text]
--------------------------------------------------------
*/
const nameInput = document.querySelector("#inputName #name");
const addBtn = document.getElementById("addBtn");
const displayInputName = document.getElementById("displayInputtedNames");

const inputValue = function () {
  // create the new div, added a syling class, attributed the input value
  const inputValue = nameInput.value;

  // check so that the input field is filled wiht at least 3 characters
  // before add button works
  if (inputValue.length < 3) {
    nameInput.placeholder = inputErrorPlaceholder;
  } else {
    nameInput.placeholder = inputValidPlaceholder;
    const displayDiv = document.createElement("div");

    displayDiv.classList.add("displayNameInDiv");
    displayDiv.innerText = inputValue;

    // append the newly created div to the "displayInputtedNames" div
    displayInputName.appendChild(displayDiv);

    // totalNames global variable increases by 1 each time the button is pressed
    totalNames++;

    // the value of the input is added to the totalNamesArray global variable
    totalNamesArray.push(inputValue);
  }

  // after clicking the button, the input should clear
  nameInput.value = "";
};

addBtn.addEventListener("click", inputValue);
