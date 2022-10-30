console.log("test");

let totalNames = 0; // counts each time a name is appended to the display div
const totalNamesArray = []; // contains the names that are appended to the display div
let totalRandomizedNamesArray = []; // contains the total names in a randomized manner
const inputErrorPlaceholder = "! Please input a name that contains at least 3 characters";
const inputValidPlaceholder = "enter name";
const teamErrorMessage = "Please add a member";
let totalDivs = 0;
let teamNr = 0;

const nameInput = document.querySelector("#inputName #name");
const addBtn = document.getElementById("addBtn");
const displayInputName = document.getElementById("displayInputtedNames");

const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");
const nrOfTeams = document.getElementById("nrOfTemasDisplay");

const assignAllMembers = document.querySelector(".assign-all-members");
// const assignMember = document.querySelector(".assign-member");
const reset = document.querySelector(".resetBtn");

/* 
                                                  STEP 1
--------------------------------------------------------
write the name in the input field and after
clicking the "add" button, display it in the
"displayInputtedNames" div [and remove the default text]
--------------------------------------------------------
*/
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

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

totalRandomizedNamesArray = shuffle(totalNamesArray);
console.log({ totalRandomizedNamesArray });

addBtn.addEventListener("click", inputValue);

const bigDisplayDiv = document.getElementById("displaySide");

const createTeamDiv = function () {
  let teamNumber = teamNr++;

  nrOfTeams.innerText = teamNumber + 1;
  const nameAndDisplay = document.createElement("div");
  nameAndDisplay.classList.add("nameAndDisplay");

  const teamName = document.createElement("h3");
  teamName.classList.add("teamName");
  teamName.classList.add("titleAndDescriptionNames");
  teamName.innerText += `Team ${teamNumber + 1}`;

  const displayTeam = document.createElement("ul");
  displayTeam.classList.add("displayTeam");

  nameAndDisplay.appendChild(teamName);
  nameAndDisplay.appendChild(displayTeam);
  bigDisplayDiv.appendChild(nameAndDisplay);

  totalDivs++;
  console.log({ teamNr });
};

const removeTeamDiv = function () {
  console.log({ teamNr });
  let teamNumber = teamNr--;
  nrOfTeams.innerText = teamNumber - 1;
  //   if (bigDisplayDiv.length > 0) {
  bigDisplayDiv.removeChild(bigDisplayDiv.lastChild);
  //   }
  console.log({ teamNr });
};

plusBtn.addEventListener("click", createTeamDiv);

minusBtn.addEventListener("click", removeTeamDiv);

/* 
                                                  STEP 3
--------------------------------------------------------
assigning names to tables
--------------------------------------------------------
*/

const assigningNamesToTables = function () {
  let uls = document.querySelectorAll(".displayTeam");
  console.dir({ uls });
  let arr = totalRandomizedNamesArray;
  console.log(uls[0]);

  for (let i = 0; i < uls.length; i++) {
    let ul = uls[i];
    console.log(`${i}: `, ul);
    for (let j = 0; j < arr.length; j++) {
      const li = document.createElement("li");
      const hr = document.createElement("hr");
      hr.classList.add("customize-hr");
      li.classList.add("customize-li");
      li.innerText = arr[j];

      if (ul.childNodes.length < 2) {
        ul.appendChild(li);
        ul.appendChild(hr);
        arr.splice(j, 1);
      }

      console.log(ul.childNodes.length);
    }
  }
};
assignAllMembers.addEventListener("click", assigningNamesToTables);

const resetValues = function () {
  displayInputName.innerText = "";
  let uls = document.querySelectorAll(".displayTeam");
  let lis = document.querySelectorAll(".customize-li");
  let hrs = document.querySelectorAll(".customize-hr");
  for (let ul of uls) {
    ul.innerHTML = "";
  }
};
reset.addEventListener("click", resetValues);
