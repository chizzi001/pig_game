// SECTION Define all variables

"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const globalScore0 = document.getElementById("score--0");
const globalScore1 = document.getElementById("score--1");
const roundScore0 = document.getElementById("round--0");
const roundScore1 = document.getElementById("round--1");
const diceIMG = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnLevel = document.querySelector(".btn--level");
let activePlayer = 0;
let roundScore = 0;
let score = [0, 0];
let userSelect;
let stillPlaying = true;

// !SECTION

// SECTION Setting the functionalities

// NOTE[id=hold] function to switch user and add score when the user clicks on the HOLD button

const resetRound = () => {
  diceIMG.style.display = "none";
  roundScore = 0;
  document.getElementById(`round--${activePlayer}`).textContent = roundScore;
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// NOTE[id=newGame] function to reset the game when the user clicks on the NEW GAME button

const newGame = () => {
  roundScore = 0;
  score = [0, 0];
  // diceIMG.style.display = "none";
  document.getElementById(`round--0`).textContent = roundScore;
  document.getElementById(`round--1`).textContent = roundScore;
  document.querySelector(`.player--0`).classList.add("player--active");
  document.querySelector(`.player--1`).classList.remove("player--active");
  globalScore0.textContent = 0;
  globalScore1.textContent = 0;
  document
    .querySelector(`.player--${activePlayer === 0 ? 1 : 0}`)
    .classList.remove("player--winner");
  activePlayer = 0;
  // FIXME
  // document.querySelector(`.play--0`).classList.remove("hidden");
  // document.querySelector(`.play--1`).classList.add("hidden");
  stillPlaying = true;
  document.getElementById("win--score").removeAttribute("disabled", "");
};

// NOTE[id=switchTurn] function to switch turns

const switchTurn = () => {
  document.querySelector(`.play--${activePlayer}`).classList.toggle("hidden");
  document
    .querySelector(`.play--${activePlayer === 0 ? 1 : 0}`)
    .classList.toggle("hidden");
};

// SECTION The Set Score button.

// NOTE the whole functionalities is dependent on the user setting the win score and hitting the select button

btnLevel.addEventListener("click", function () {
  userSelect = document.getElementById("win--score").value;
  if (userSelect > 0) {
    document.getElementById("win--score").setAttribute("disabled", "");
  }
  console.log(document.getElementById("win--score").value);
});

// !SECTION

//   SECTION: Roll Dice button

// NOTE: the roll dice generates a random number b/w 1-6 and adds to the round score

btnRoll.addEventListener("click", function () {
  if (stillPlaying && userSelect > 0) {
    let randNumber = Math.ceil(Math.random() * 6);
    roundScore += randNumber;
    diceIMG.style.display = "initial";
    diceIMG.src = `dice-${randNumber}.png`;
    document.getElementById(`round--${activePlayer}`).textContent = roundScore;
    if (randNumber <= 1) {
      resetRound();
      switchTurn();

      // FIXME
      // document
      //   .querySelector(`.play--${activePlayer}`)
      //   .classList.remove("hidden");
      // document
      //   .querySelector(`.play--${activePlayer === 0 ? 1 : 0}`)
      //   .classList.add("hidden");
    }
  }
});

//   !SECTION

// SECTION: Hold Button

// NOTE: The hold button adds round score to the global score and switches user

btnHold.addEventListener("click", function () {
  if (stillPlaying && userSelect > 0) {
    score[activePlayer] += roundScore;
    document.getElementById(
      `score--${activePlayer}`
    ).textContent = `${score[activePlayer]}`;
    if (score[activePlayer] >= userSelect) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle("player--active");
      diceIMG.style.display = "none";
      stillPlaying = false;
      document
        .querySelector(`.play--${activePlayer === 0 ? 1 : 0}`)
        .classList.remove("hidden");
    }
    // LINK #hold
    resetRound();
    switchTurn();

    // !LINK
  }
});

//   !SECTION

// SECTION: New game button

// NOTE: New game button resets everything except the win score and the users start again

btnNew.addEventListener("click", function () {
  // LINK #newGame
  newGame();
  // !LINK

  document.querySelector(`.play--${activePlayer}`).classList.remove("hidden");
  document
    .querySelector(`.play--${activePlayer === 0 ? 1 : 0}`)
    .classList.add("hidden");

  // document.querySelector(`.play--0`).classList.remove("hidden");
  // document.querySelector(`.play--1`).classList.toggle("hidden");
});

// !SECTION
