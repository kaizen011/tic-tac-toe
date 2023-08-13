// Player Factory
function createPlayer(name, marker) {
    return { name, marker };
  }
  
  // Generating Player Objects
  const player1 = createPlayer("Player 1", "X");
  const player2 = createPlayer("Player 2", "O");
  
  // Gameboard Module
  const Gameboard = (() => {
    let board = [];
  
    const createBoard = () => {
      board = Array(9).fill(null);
    };
  
    const getBoard = () => board;
  
    const placeMarker = (index, marker) => {
      if (board[index] === null) {
        board[index] = marker;
        return true;
      } else {
        return false;
      }
    };
  
    const renderBoard = () => {
      const boardContainer = document.querySelector(".board-container");
      boardContainer.innerHTML = "";
  
      board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.textContent = cell || "";
        cellElement.addEventListener("click", () => Game.handleCellClick(index));
        boardContainer.appendChild(cellElement);
      });
    };
  
    return {
      createBoard,
      getBoard,
      placeMarker,
      renderBoard,
    };
  })();
  
  // Game Object
  const Game = (() => {
    let currentPlayer;
    let gameActive = false;
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  
    const startGame = () => {
      currentPlayer = player1;
      gameActive = true;
    };
  
    const endGame = () => {
      gameActive = false;
    };
  
    const handleCellClick = (index) => {
      if (!gameActive) return;
  
      if (Gameboard.placeMarker(index, currentPlayer.marker)) {
        Gameboard.renderBoard();
        switchPlayer();
      }
    };
  
    const initGame = () => {
      Gameboard.createBoard();
      Gameboard.renderBoard();
      startGame();
    };
  
    document.getElementById("restart-button").addEventListener("click", initGame);
  
    initGame();
  
    return {
      handleCellClick, // Make handleCellClick accessible outside the module
    };
  })();
  