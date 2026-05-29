///TODO: Replace p1NumStrats and p2NumStrats with queray parameters
let queryParams = new URLSearchParams(window.location.search);
const P1_NUM_STRATS = queryParams.get("p1NumStrats");
const P2_NUM_STRATS = queryParams.get("p1NumStrats");
const PAYOFF_CONTENTS = "(<input type='number'>,<input type='number'>)";

buildMatrix();



function buildMatrix() {
let matrix = document.getElementById("matrix");  
  
  //loop through (p1_Num_Strats + 1) times. Each iteration, make a row div
  
  for (let i = 0; i < (P1_NUM_STRATS + 1); i++) {
    //create new row div
    let newCell = document.createElement("div");
    let newRow = document.createElement("div");
    newRow.classList.add("matrix-row");
    newRow.append(newCell);
    
    
    //Loop through (P2_NUM_STRATS) times. Each iteration make a cell 
    for (let j = 0; j < (P2_NUM_STRATS + 1); j++) {
      //create a new cell
      let newCell = document.createElement("div");
    if (i == 0 && j == 0) {
      newCell.classList.add("empty-cell");
    } else if (i == 0) {
      newCell.classList.add("strat-cell");
      newCell.innerHTML = ("t<sub>" + j + "</sub>");
    }    
      else if (j == 0) {
      newCell.classList.add("strat-cell");
      newCell.innerHTML = ("s<sub>" + i + "</sub>");  
    } else {
      newCell.classList.add("payoff-cell");
      newCell.innerHTML = PAYOFF_CONTENTS;
    }
      
      
      matrix.append(newCell);
      
    }
    
    
  }
}
  function randomize(){
let payoffArr= document.querySelectorAll(".payoff-cell input");
    const MIN = -5;
    const MAX = 15;
    
 for (const elem of payoffArr)   
   elem.value = Math.floor(Math.random() * (MAX + 1 - MIN) + MIN);
}

function compute() {
  let p1PayArr = document.querySelectorAll(".payoff-cell input:first-child");
  let p2PayArr = document.querySelectorAll(".payoff-cell input:last-child");
  let PayCellArr = document.querySelectorAll(".payoff-cell");
  
  for (const elem of PayCellArr) {
    if (elem.classList.contains("eliminated") == true) elem.classList.remove("eliminated");
    if (elem.classList.contains("ne") == true) elem.classList.remove("ne")
  
  
  //loop through every colum, finding P1's highest payoff out of the rows
  for (let j = 0; j < P2_NUM_STRATS; j++) {
    let largest = -Infinity;
    
    //identify the highest payoff in this column
    for(let i = 0; i < P1_NUM_STRATS; i++) {
      if (Number(p1PayArr[P2_NUM_STRATS*i + j].value) > Number(largest)) largest = p1PayArr[P2_NUM_STRATS*i + j].value;
    }
    
    
    //Eliminate any cells which aren't best responses
     for(let i = 0; i < P1_NUM_STRATS; i++) {
      if (Number(p1PayArr[P2_NUM_STRATS*i + j].value) != Number(largest)) PayCellArr[P2_NUM_STRATS*i + j].classlist.add("eliminated");
     }
  }
  
  
  //loop through every row, finding P2's highest payoff out of the colums
  for (let i = 0; i < P1_NUM_STRATS; i++) {
    let largest = -Infinity;
    
    //identify the highest payoff in this column
    for(let j = 0; j < P2_NUM_STRATS; j++) {
      if (Number(p2PayArr[P2_NUM_STRATS*i + j].value) > Number(largest)) largest = p2PayArr[P2_NUM_STRATS*i + j].value;
    }
    
    
    //Eliminate any cells which aren't best responses
     for(let j = 0; j < P2_NUM_STRATS; j++) {
      if (Number(p2PayArr[P2_NUM_STRATS*i + j].value) != Number(largest)) PayCellArr[P2_NUM_STRATS*i + j].classlist.add("eliminated");
     }
  }
  
  
  //give the ne class to any cells which are tbest response for both players
  for (const elem of PayCellArr) {
    if (elem.classList.contains("eliminated") == false) elem.classList.add("ne")
  }
  }
}
  
  
