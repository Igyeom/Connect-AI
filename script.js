const wordList = ["apple", "banana", "cat", "dog", "elephant", "zebra", ... (your list of valid words)]; // Replace with your word list
const player1Input = document.getElementById("player1-input");
const player2Input = document.getElementById("player2-input");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");
const lastLettersSpan = document.getElementById("last-letters");

let currentPlayer = 1;
let usedWords = [];
let lastWord = "";

// Function to check if a word is valid
function isValidWord(word) {
  return wordList.includes(word.toLowerCase()) && !usedWords.includes(word.toLowerCase()) && word.length >= 3;
}

// Function to switch players
function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  const playerPrompt = document.querySelector(`#player${currentPlayer}-prompt`);
  playerPrompt.style.display = "block";
  player2Input.value = ""; // Clear input for next player
}

// Function to handle player submission
submitBtn.addEventListener("click", () => {
  const inputWord = player2Input.value.toLowerCase();

  if (!isValidWord(inputWord)) {
    message.textContent = "Invalid word. Please try again.";
    return;
  }

  if (currentPlayer === 2 && !inputWord.startsWith(lastWord.slice(-2))) {
    message.textContent = `Word must start with "${lastWord.slice(-2)}".`;
    return;
  }

  usedWords.push(inputWord);
  lastWord = inputWord;
  lastLettersSpan.textContent = lastWord.slice(-2);

  message.textContent = "";
  player1Input.value = inputWord; // Display previous word for next player
  switchPlayer();

  // Check for game end (no valid words for current player)
  const hasValidWords = wordList.some(word => word.toLowerCase().startsWith(lastWord.slice(-2)) && !usedWords.includes(word));
  if (!hasValidWords) {
    message.textContent = `Player ${currentPlayer - 1} wins!`;
    submitBtn.disabled = true;
  }
});

// Start the game by letting player 1 enter a word
player1Input.value = prompt("Player 1: Enter your starting word (at least 3 letters):");
if (isValidWord(player1Input.value)) {
  
