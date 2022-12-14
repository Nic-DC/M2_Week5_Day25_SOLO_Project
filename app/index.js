console.log("Testingggg!");

let totalNames = 0; // counts each time a name is appended to the display div
const totalNamesArray = []; // contains the names that are appended to the display div
const inputErrorPlaceholder = "! Please input a name that contains at least 3 characters";
const inputValidPlaceholder = "enter name";
const teamErrorMessage = "Please add a member";
let totalDivs = 0;
let teamNr = 1;

const nameInput = document.querySelector("#inputName #name");
const addBtn = document.getElementById("addBtn");
const displayInputName = document.getElementById("displayInputtedNames");

const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");
const nrOfTeams = document.getElementById("nrOfTemasDisplay");

const assignMember = document.querySelector(".assign-member");
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

addBtn.addEventListener("click", inputValue);

/* 
                                                  STEP 2
--------------------------------------------------------
upon clicking the - and + buttons, the value [that is 
by default 0] will increase / decrease accordingly by 1;

the buttons will work only depending on the totalNames
value [each team must have 1 member, but the default
number of team mates is 2 ---> so for 3 names there
will be 2 teams: one with the default number of 
members <2>
, and the other team that only has 1 member]
--------------------------------------------------------
*/

const createTeam = function () {
  let nr = totalNames;
  let totalPossibleTeams = Math.round(nr / 2);
  // teamTemplate(totalPossibleTeams);
  if (totalPossibleTeams === 0) {
    nrOfTeams.classList.add("teamErrorMessage");
    nrOfTeams.innerText = teamErrorMessage;
  } else {
    nrOfTeams.classList.remove("teamErrorMessage");

    nrOfTeams.innerText = `${totalPossibleTeams}`;
    if (totalDivs < parseInt(nrOfTeams.innerText)) {
      createTeamDiv();
    }
  }
};
plusBtn.addEventListener("click", createTeam);

const removeTeam = function () {
  let nr = totalNames;
  let totalPossibleTeams = Math.floor(nr / 2);
  // teamTemplate(totalPossibleTeams);
  if (totalPossibleTeams === 0) {
    nrOfTeams.classList.add("teamErrorMessage");
    nrOfTeams.innerText = teamErrorMessage;
  } else {
    nrOfTeams.classList.remove("teamErrorMessage");

    nrOfTeams.innerText = `${totalPossibleTeams}`;
    if (Math.round(nr / 2) !== Math.floor(nr / 2)) {
      // it removes lastChild BUT every last child with every click
      bigDisplayDiv.removeChild(bigDisplayDiv.lastChild);
    }
  }
};
minusBtn.addEventListener("click", removeTeam);

// const teamTemplate = function (input) {
//   if (input === 0) {
//     nrOfTeams.classList.add("teamErrorMessage");
//     nrOfTeams.innerText = teamErrorMessage;
//   } else {
//     nrOfTeams.classList.remove("teamErrorMessage");

//     nrOfTeams.innerText = `${input}`;
//   }
// };

// const teamTemplateCreateDiv = function () {
//   if (totalDivs < parseInt(nrOfTeams.innerText)) {
//     createTeamDiv();
//   }
// };

/* 
                                                  STEP 3
--------------------------------------------------------
when clicking the - / + buttons, the corresponding number
of divs will be displayed in the "displaySide" container
--------------------------------------------------------
*/
const bigDisplayDiv = document.querySelector(".namesAndDisplays");

const createTeamDiv = function () {
  let teamNumber = teamNr++;
  const nameAndDisplay = document.createElement("div");
  nameAndDisplay.classList.add("nameAndDisplay");

  const teamName = document.createElement("h3");
  teamName.classList.add("teamName");
  teamName.classList.add("titleAndDescriptionNames");
  teamName.innerText += `Team ${teamNumber}`;

  const displayTeam = document.createElement("div");
  displayTeam.classList.add("displayTeam");
  //   displayTeam.innerText = appointNames(displayTeam.innerText);
  displayTeam.innerText = appointNames(displayTeam.innerText);

  nameAndDisplay.appendChild(teamName);
  nameAndDisplay.appendChild(displayTeam);
  bigDisplayDiv.appendChild(nameAndDisplay);

  totalDivs++;
};

/* 
                                                  STEP 4
--------------------------------------------------------
randomly appoint members to the newly created divs in the
"displaySide" container
--------------------------------------------------------
*/

const randomFunc = function (nr) {
  const random = Math.floor(Math.random() * nr);
  return random;
};

const appointNames = function (input) {
  let nr = totalNamesArray.length;
  console.log({ nr });
  //let appointedName = "";
  let randNr = randomFunc(nr);
  console.log({ randNr });
  console.log({ totalNamesArray });
  for (let i = 0; i < totalNamesArray.length; i++) {
    if (i === randNr) {
      console.log(totalNamesArray[i]);
      //appointedName = totalNamesArray[i];
      input = totalNamesArray[i];
      totalNamesArray.splice(randNr, 1);
    }
  }
  console.log({ totalNamesArray });
  // return appointedName;
  return input;
};
