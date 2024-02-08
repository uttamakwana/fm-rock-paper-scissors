const ruleBtn = document.querySelector(".rule-btn");
const ruleCloseIcon = document.querySelector(".rules-close-icon");
const rulesContainer = document.querySelector(".rules-container");
// const rock = document.querySelector(".rock-inside-container");
// const paper = document.querySelector(".paper-inside-container");
// const scissors = document.querySelector(".scissors-inside-container");
const gameAreaContainer = document.querySelector(".game-area-container");
const gameDecisionContainer = document.querySelector(
  ".game-decision-container"
);
const choices = document.querySelectorAll(".icon-inside-container");
const yourChoice = document.querySelector(".your-choice");
const computerChoice = document.querySelector(".computer-choice");
const playAgainBtn = document.querySelector(".play-again-btn");
const gameDecision = document.querySelector(".game-decision-heading");
const scoreCardNumber = document.querySelector(".score-card-number");
let score = 0;
let winner = false;

// functions
function removeRulesActiveClasses() {
  rulesContainer.classList.remove("active");
  ruleBtn.classList.remove("active");
}

function addRulesActiveClasses() {
  rulesContainer.classList.add("active");
  ruleBtn.classList.add("active");
}

function playGame(e) {
  const clickedContainer = e.target.closest(".icon-inside-container");
  let choices = ["paper", "rock", "scissors", "rock"];
  let choice = clickedContainer.getAttribute("data-value");
  let randomNumber = Math.round(Math.random() * 3);
  console.log(randomNumber);
  let cChoice = choices[randomNumber];
  gameDecision.innerHTML = findWinner(choice, cChoice);
  let color, ourColor;
  let boxShadow;
  color = winner ? "hsl(230, 89%, 62%)" : "hsl(120, 39%, 54%)";
  ourColor = !winner ? "hsl(230, 89%, 62%)" : "hsl(120, 39%, 54%)";
  if (cChoice === "paper") {
    boxShadow = `0 0 0 1rem hsl(230, 89%, 62%), 0 0 1.1rem 1.1rem ${color}`;
  }
  if (cChoice === "rock") {
    boxShadow = `0 0 0 1rem hsl(349, 71%, 52%), 0 0 1.1rem 1.1rem ${color}`;
  }
  if (cChoice === "scissors") {
    boxShadow = `0 0 0 1rem hsl(39, 89%, 49%), 0 0 1.1rem 1.1rem ${color}`;
  }
  if (clickedContainer) {
    // Do something with the clicked container
    if (choice === "paper") {
      yourChoice.innerHTML = `<div class"paper-choice" style="height: 100%; display: flex; justify-content: center; align-items: center; border-radius: 50%; background-color: white; box-shadow: 0 0 0 1rem hsl(230, 89%, 62%), 0 0 1.1rem 1.1rem ${ourColor};"><img src="images/icon-paper.svg" alt="icon-paper" /></div>`;
    }
    if (choice === "rock") {
      yourChoice.innerHTML = `<div class"rock-choice" style="height: 100%; display: flex; justify-content: center; align-items: center; border-radius: 50%; background-color: white; box-shadow: 0 0 0 1rem hsl(349, 71%, 52%), 0 0 1.1rem 1.1rem ${ourColor};"><img src="images/icon-rock.svg" alt="icon-rock" /></div>`;
    }
    if (choice === "scissors") {
      yourChoice.innerHTML = `<div class"flex-center scissors-choice" style="height: 100%; display: flex; justify-content: center; align-items: center; border-radius: 50%; background-color: white; box-shadow: 0 0 0 1rem hsl(39, 89%, 49%), 0 0 1.1rem 1.1rem ${ourColor};"><img src="images/icon-scissors.svg" alt="icon-scissors" /></div>`;
    }
    computerChoice.innerHTML = `<div class"${cChoice}-choice" style="height: 100%; display: flex; justify-content: center; align-items: center; border-radius: 50%; background-color: white; box-shadow:${boxShadow};"><img src="images/icon-${cChoice}.svg" alt="icon-${cChoice}" /></div>`;
    gameDecisionContainer.classList.add("active");
    gameAreaContainer.classList.add("deactivate");
    scoreCardNumber.innerText = score;
  } else {
    gameDecisionContainer.classList.remove("active");
  }
}

function findWinner(ourChoice, computerChoice) {
  if (ourChoice === computerChoice) {
    winner = false;
    return `<h1 class="game-decision draw">Match Draw</h1>`;
  }
  if (
    (ourChoice === "rock" && computerChoice === "scissors") ||
    (ourChoice === "paper" && computerChoice === "rock") ||
    (ourChoice === "scissors" && computerChoice === "paper")
  ) {
    winner = true;
    score++;
    return `<h1 class="game-decision win">You won!</h1>`;
  }
  winner = false;
  score--;
  return `<h1 class="game-decision lost">You lost!</h1>`;
}

// listeners
ruleBtn.addEventListener("click", () => {
  if (rulesContainer.classList.contains("active")) {
    removeRulesActiveClasses();
  } else {
    addRulesActiveClasses();
  }
});

ruleCloseIcon.addEventListener("click", () => {
  removeRulesActiveClasses();
});

choices.forEach((choice) => choice.addEventListener("click", playGame));

playAgainBtn.addEventListener("click", () => {
  gameDecisionContainer.classList.remove("active");
  gameAreaContainer.classList.remove("deactivate");
});
