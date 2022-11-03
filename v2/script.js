console.log("boo!");

/* 
********************************************************************************
********************************************************************************
TO clarify with Stefano:

1. why do i need to click twice on the minus button to remove the last 2 tables?
   [I notice that in the nodeList for the "tables" div, there are 3 "text" elements
    and I do not know what they are]

2. when I click add member, sometimes there is no action [I assume that comes from
   the condition that i === random] <Step 2.1.>
********************************************************************************
********************************************************************************
*/

/* 
------------------------------------------------------------------
GLOBAL variables
------------------------------------------------------------------
*/
const inputtedNames = []; // array that includes all names appended to "namesList"

/* 
------------------------------------------------------------------
SELECTING all the necessary elements
------------------------------------------------------------------
*/
const nameInput = document.getElementById("nameInput");
const nrOfTeams = document.getElementById("nrOfTeams"); // span that shows the nr of teams
const namesList = document.getElementById("namesList"); // the ul that holds all the inputted names
const tables = document.getElementById("tables"); // div that holds all the dinamically generated tables

/* BUTTONS */
const addMember = document.querySelector(".add-member"); // Add button
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const assignAllMembers = document.getElementById("assignAllMembers");
const assignMember = document.getElementById("assignMember");
const reset = document.getElementById("reset");

/* 
------------------------------------------------------------------
Step 1:
1.1. appending the inputted names into the "namesList" ul
1.2. change the nr of teams and tables that are displayed on the screen [increase & decrease]
------------------------------------------------------------------
*/

//1.1.
const appendNames = function () {
  let inputName = nameInput.value;

  const li = document.createElement("li");
  li.classList.add("names");
  li.innerText = inputName;
  namesList.appendChild(li);

  inputtedNames.push(inputName);

  nameInput.value = "";
};
addMember.addEventListener("click", appendNames);

// 1.2.
const increaseTables = function () {
  let nrOfTables = parseInt(nrOfTeams.innerText);
  nrOfTables += 1;
  nrOfTeams.innerText = nrOfTables;

  const table = document.createElement("div");
  table.classList.add("table");

  const tableHeader = document.createElement("h3");
  tableHeader.classList.add("table-header");
  tableHeader.innerText = `Table ${nrOfTables}`;

  const tableList = document.createElement("ul");
  tableList.classList.add("table-list");
  tableList.id = `tableList_${nrOfTables}`;

  //   const name = document.createElement("li");
  //   name.classList.add("table-names");
  //   name.innerText = "test";

  // tableList.appendChild(name);
  table.appendChild(tableHeader);
  table.appendChild(tableList);
  tables.appendChild(table);
  //   tables.innerHTML += `
  //                         <div class="table">
  //                             <h3 class="table-header">Table ${nrOfTables}</h3>
  //                             <ul class="table-list">
  //                                 <li class="table-names">1</li>
  //                                 <li class="table-names">1</li>
  //                             </ul>
  //                         </div>
  //                         `;
};
plus.addEventListener("click", increaseTables);

const decreaseTables = function () {
  if (tables.childElementCount > 0) {
    let nrOfTables = parseInt(nrOfTeams.innerText);
    nrOfTables -= 1;
    nrOfTeams.innerText = nrOfTables;
    console.log("last child: ", tables.lastChild);

    tables.removeChild(tables.lastChild);
  }
};
minus.addEventListener("click", decreaseTables);

/* 
------------------------------------------------------------------
Step 2:
2.1. put the last element from the "namesList" ul into a random table
2.2. put all the elements from the "namesList" ul into the tables [max 2 / table]
------------------------------------------------------------------
*/

//2.1.
const assignLastMember = function () {
  const allTableLists = document.querySelectorAll(".table-list");
  let names = inputtedNames;

  const name = document.createElement("li");
  name.classList.add("table-names");
  name.innerText = names[names.length - 1];

  for (let i = 0; i < allTableLists.length; i++) {
    let random = Math.floor(Math.random() * allTableLists.length);
    console.log({ random });
    if (i === random && name.innerText !== "undefined") {
      allTableLists[i].appendChild(name);
      console.log("allTablesLists[i] is: ", allTableLists[i]);
      console.dir(allTableLists[i]);
      names.pop();
    }
  }
};
assignMember.addEventListener("click", assignLastMember);

// 2.2.
const assignAllMembersToTables = function () {
  const allTableLists = document.querySelectorAll(".table-list");
  let names = inputtedNames;

  for (let i = 0; i < names.length; i++) {
    let ran = Math.floor(Math.random() * names.length);
    if (i === ran) {
      for (let j = 0; j < allTableLists.length; j++) {
        const name = document.createElement("li");
        name.classList.add("table-names");
        let random = Math.floor(Math.random() * allTableLists.length);
        console.log({ random });

        allTableLists[i].appendChild(name);
        console.log("allTablesLists[i] is: ", allTableLists[i]);
        console.dir(allTableLists[i]);
        names.pop();
      }
    }
  }
};
assignAllMembers.addEventListener("click", assignAllMembersToTables);
