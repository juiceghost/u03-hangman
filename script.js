// Global variables
let correctLetters = 0;
let wordLength = 0;
let guesses = 0;
let selectedWord = "";
let isGameDone = false;

// Array: whith the words
const wordList = ["ZORRO", "SKI", "YACHT", "ZOMBIE", "CORONA", "PANDEMI", "APOCALYPSE"];

let messageBox = document.querySelector("#message");

// DOM-node: logs a message when the game is over
let msgHolderEl = "Game Over";

// DOM-node: the button that starts the game
let startGameBtnEl = document.querySelector("#startGameBtn");
wordBoxes = document.querySelector("#letterBoxes > ul");

// Array of DOM-nodes: the buttons for the letters
let letterBoxEls = document.querySelector("#letterButtons").children;

// Functions to start the game with buttonclick, and then calls other functions
startGameBtnEl.addEventListener("click", startGame);

// ---------- Behold, the functions! ----------

// Function which randomly selects a word
function generateRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

// Function to generate the letterboxes, number of boxes depends on the number of letters in the word
function createLetterBoxes() {
  for (i = 0; i < selectedWord.length; i++) {
    let newElement = document.createElement("li");
    let newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("disabled", "");
    newElement.appendChild(newInput);
    wordBoxes.appendChild(newElement);
  }
}

// Function for start game and select a random word, also calls the reset functions
function startGame() {
   if (isGameDone) {
    resetGuesses();
    clickDisable();
    uptImg();
   }
  let list = document.querySelector("#letterBoxes > ul");
  list.innerHTML = "";
  selectedWord = generateRandomWord();
  createLetterBoxes();
  let wordSplit = selectedWord.split("");
  console.log(wordSplit);
  wordLength = wordSplit.length;
}

// Function to reset variables
function resetGuesses() {
  correctLetters = 0;
  wordLength = 0;
  guesses = 0;
  selectedWord = "";
  messageBox.innerHTML = "";
}

// Function that runs when you press a letters and guesses the letter
function checkLetter(letter, selectedWord) {
  let letters = selectedWord.split("");
  if (letters.indexOf(letter) !== -1) {
    correctGuessAction(letter, letters);
  } else {
    wrongGuessAction();
  }
}

// Function for correct answers
function correctGuessAction(letter, letters) {
  let occurances = [];
  for (let i = 0; i < letters.length; i++) {
    if (letter === letters[i]) {
      occurances.push(i);
      correctLetters++;
    }
  }
  showBoxes(occurances, letters);
  if (correctLetters === wordLength) {
    messageBox.innerHTML = "YOU WIN!";
    isGameDone = true;
  }
}

// Function for wrong answers and pictures
function wrongGuessAction() {
  guesses++;
  uptImg();
  if (guesses === 6) {
    messageBox.innerHTML = msgHolderEl;
    isGameDone = true;
  }
}

// Function to update/reset the image(s)
function uptImg () {
  let hangmanImg = `images/h${guesses}.png`;
  let imageElement = document.querySelector("#hangman");
  imageElement.setAttribute("src", hangmanImg);
}

// Function for the boxes
function showBoxes(occurances, letters) {
  let boxes = document.querySelector("#letterBoxes").children[0].children;
  occurances.forEach((element) => {
    let letter = letters[element];
    boxes[element].children[0].setAttribute("value", letter);
    boxes[element].children[0].setAttribute("disable", "");
  });
}

// Function for click handlers
function addLetterClickHandlers(selectedWord) {
  for (var i = 0; i < letterBoxEls.length; i++) {
    letterBoxEls.item(i).children[0].addEventListener("click", (event) => {
      event.srcElement.setAttribute("disabled", "");
      checkLetter(event.srcElement.value, selectedWord);
    });
  }
}

// Removes the "disabled attribute" from buttons
function clickDisable() {
  for (var i = 0; i < letterBoxEls.length; i++) {
    letterBoxEls.item(i).children[0].removeAttribute("disabled", "");    
  }
}

// Function to reset click handlers
function addLetterClickEvent() {
  for (var i = 0; i < letterBoxEls.length; i++) {
    letterBoxEls.item(i).children[0].addEventListener("click", (event) => {
      checkLetterTwo(event.srcElement);
    });
  }
}

// Function that runs when you press a letters and guesses the letter
function checkLetterTwo(letterBtn) {
  let letter = letterBtn.value;
  letterBtn.setAttribute("disabled", "disabled");
  let letters = selectedWord.split("");
  if (letters.indexOf(letter) !== -1) {
    correctGuessAction(letter, letters);
  } else {
    wrongGuessAction();
  }
}