///TODO: Replace p1NumStrats and p2NumStrats with query parameters

let urlParams = new URLSearchParams(window.location.search);

const P1_NUM_STRATS = Number(urlParams.get("p1Strats"));
const P2_NUM_STRATS = Number(urlParams.get("p2Strats"));

const PAYOFF_CONTENTS = "(<input type='number'>,<input type='number'>)";

buildMatrix();

function buildMatrix() {
  let matrix = document.getElementById("matrix");

  for (let i = 0; i < (P1_NUM_STRATS + 1); i++) {

    let newRow = document.createElement("div");
    newRow.classList.add("matrix-row");

    for (let j = 0; j < (P2_NUM_STRATS + 1); j++) {

      let newCell = document.createElement("div");

      if (i == 0 && j == 0) {
        newCell.classList.add("empty-cell");

      } else if (i == 0) {
        newCell.classList.add("strat-cell");
        newCell.innerHTML = "t<sub>" + j + "</sub>";

      } else if (j == 0) {
        newCell.classList.add("strat-cell");
        newCell.innerHTML = "s<sub>" + i + "</sub>";

      } else {
        newCell.classList.add("payoff-cell");
        newCell.innerHTML = PAYOFF_CONTENTS;
      }

      newRow.append(newCell);
    }

    matrix.append(newRow);
  }
}

function randomize() {
  let payoffArr = document.querySelectorAll(".payoff-cell input");

  const MIN = -5;
  const MAX = 15;

  for (const elem of payoffArr) {
    elem.value = Math.floor(Math.random() * (MAX + 1 - MIN) + MIN);
  }
}

function compute() {
  let p1PayArr = document.querySelectorAll(".payoff-cell input:first-child");
  let p2PayArr = document.querySelectorAll(".payoff-cell input:last-child");
  let PayCellArr = document.querySelectorAll(".payoff-cell");

  for (const elem of PayCellArr) {
    if (elem.classList.contains("eliminated")) {
      elem.classList.remove("eliminated");
    }

    if (elem.classList.contains("ne")) {
      elem.classList.remove("ne");
    }
  }

  //loop through every column, finding P1's highest payoff out of the rows
  for (let j = 0; j < P2_NUM_STRATS; j++) {
    let largest = -Infinity;

    for (let i = 0; i < P1_NUM_STRATS; i++) {
      if (Number(p1PayArr[P2_NUM_STRATS * i + j].value) > largest) {
        largest = Number(p1PayArr[P2_NUM_STRATS * i + j].value);
      }
    }

    for (let i = 0; i < P1_NUM_STRATS; i++) {
      if (Number(p1PayArr[P2_NUM_STRATS * i + j].value) != largest) {
        PayCellArr[P2_NUM_STRATS * i + j].classList.add("eliminated");
      }
    }
  }

  //loop through every row, finding P2's highest payoff out of the columns
  for (let i = 0; i < P1_NUM_STRATS; i++) {
    let largest = -Infinity;

    for (let j = 0; j < P2_NUM_STRATS; j++) {
      if (Number(p2PayArr[P2_NUM_STRATS * i + j].value) > largest) {
        largest = Number(p2PayArr[P2_NUM_STRATS * i + j].value);
      }
    }

    for (let j = 0; j < P2_NUM_STRATS; j++) {
      if (Number(p2PayArr[P2_NUM_STRATS * i + j].value) != largest) {
        PayCellArr[P2_NUM_STRATS * i + j].classList.add("eliminated");
      }
    }
  }

  //give the ne class to any cells which are best responses for both players
  for (const elem of PayCellArr) {
    if (!elem.classList.contains("eliminated")) {
      elem.classList.add("ne");
    }
  }
}

  
