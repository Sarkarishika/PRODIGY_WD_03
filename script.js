const gameContainer = document.getElementById("game");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset");
const resetScoreButton = document.getElementById("resetScore"); // New button
const vsAI = document.getElementById("vsAI");
const startPlayerSelect = document.getElementById("startPlayer");
const darkModeToggle = document.getElementById("darkModeToggle");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

const emojiMap = {
  X: "❌",
  O: "⭕"
};

let board, currentPlayer, gameActive, isVsAI;

function createBoard() {
  gameContainer.innerHTML = "";
  board = Array(9).fill("");
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    gameContainer.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index] !== "") return;

  makeMove(index, currentPlayer);
  if (checkWin()) {
    statusDisplay.textContent = `🎉 ${emojiMap[currentPlayer]} wins!`;
    gameActive = false;
    updateScore(currentPlayer);
  } else if (board.every(cell => cell !== "")) {
    statusDisplay.textContent = "🤝 It's a draw!";
    gameActive = false;
  } else {
    switchPlayer();
    if (isVsAI && currentPlayer === "O") {
      setTimeout(aiMove, 400);
    }
  }
}

function makeMove(index, player) {
  const cell = gameContainer.children[index];
  board[index] = player;
  cell.textContent = emojiMap[player];
  cell.classList.add(player);
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${emojiMap[currentPlayer]}'s turn`;
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(comb => {
    const [a, b, c] = comb;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function updateScore(player) {
  if (player === "X") scoreX.textContent = parseInt(scoreX.textContent) + 1;
  else scoreO.textContent = parseInt(scoreO.textContent) + 1;
}

function aiMove() {
  let available = board.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
  let choice = available[Math.floor(Math.random() * available.length)];
  if (choice !== undefined) {
    makeMove(choice, "O");
    if (checkWin()) {
      statusDisplay.textContent = `🤖 ${emojiMap["O"]} (AI) wins!`;
      gameActive = false;
      updateScore("O");
    } else if (board.every(cell => cell !== "")) {
      statusDisplay.textContent = "🤝 It's a draw!";
      gameActive = false;
    } else {
      switchPlayer();
    }
  }
}

function resetGame() {
  currentPlayer = startPlayerSelect.value;
  gameActive = true;
  isVsAI = vsAI.checked;
  createBoard();
  statusDisplay.textContent = `Player ${emojiMap[currentPlayer]}'s turn`;
  if (isVsAI && currentPlayer === "O") {
    setTimeout(aiMove, 400);
  }
}

function resetScores() {
  scoreX.textContent = 0;
  scoreO.textContent = 0;
}

resetButton.addEventListener("click", resetGame);
resetScoreButton.addEventListener("click", resetScores); // Score reset event

darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", darkModeToggle.checked);
});

resetGame(); // Initialize

function createBoard() {
  gameContainer.innerHTML = "";
  board = Array(9).fill("");
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    gameContainer.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index] !== "") return;

  makeMove(index, currentPlayer);
  if (checkWin()) {
    statusDisplay.textContent = `🎉 ${emojiMap[currentPlayer]} wins!`;
    gameActive = false;
    updateScore(currentPlayer);
  } else if (board.every(cell => cell !== "")) {
    statusDisplay.textContent = "🤝 It's a draw!";
    gameActive = false;
  } else {
    switchPlayer();
    if (isVsAI && currentPlayer === "O") {
      setTimeout(aiMove, 400);
    }
  }
}

function makeMove(index, player) {
  const cell = gameContainer.children[index];
  board[index] = player;
  cell.textContent = emojiMap[player];
  cell.classList.add(player);
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${emojiMap[currentPlayer]}'s turn`;
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(comb => {
    const [a, b, c] = comb;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function updateScore(player) {
  if (player === "X") scoreX.textContent = parseInt(scoreX.textContent) + 1;
  else scoreO.textContent = parseInt(scoreO.textContent) + 1;
}

function aiMove() {
  let available = board.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
  let choice = available[Math.floor(Math.random() * available.length)];
  if (choice !== undefined) {
    makeMove(choice, "O");
    if (checkWin()) {
      statusDisplay.textContent = `🤖 ${emojiMap["O"]} (AI) wins!`;
      gameActive = false;
      updateScore("O");
    } else if (board.every(cell => cell !== "")) {
      statusDisplay.textContent = "🤝 It's a draw!";
      gameActive = false;
    } else {
      switchPlayer();
    }
  }
}

function resetGame() {
  currentPlayer = startPlayerSelect.value;
  gameActive = true;
  isVsAI = vsAI.checked;
  createBoard();
  statusDisplay.textContent = `Player ${emojiMap[currentPlayer]}'s turn`;
  if (isVsAI && currentPlayer === "O") {
    setTimeout(aiMove, 400);
  }
}

function resetScores() {
  scoreX.textContent = 0;
  scoreO.textContent = 0;
}

resetButton.addEventListener("click", resetGame);
resetScoreButton.addEventListener("click", resetScores); // Score reset event

darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", darkModeToggle.checked);
});

resetGame(); // Initialize
