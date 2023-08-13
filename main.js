// Player Factory
function createPlayer(name, marker) {
    return { name, marker };
  }
  
  // Generating Player Objects
  const player1 = createPlayer("Counter-Terrorist", "X");
  const player2 = createPlayer("Terrorist", "O");
  
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
          
          if (cell === "X") {
            const xImage = document.createElement("img");
            xImage.src = "police.png"; 
            cellElement.appendChild(xImage);
          } else if (cell === "O") {
            const oImage = document.createElement("img");
            oImage.src = "terrorist.png"; 
            cellElement.appendChild(oImage);
          }
          
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
  
    const checkWin = (board, marker) => {
      const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      return winCombinations.some(combination => {
        return combination.every(index => board[index] === marker);
      });
    };
  
    const handleCellClick = (index) => {
      if (!gameActive) return;
  
      if (Gameboard.placeMarker(index, currentPlayer.marker)) {
        Gameboard.renderBoard();
  
        if (checkWin(Gameboard.getBoard(), currentPlayer.marker)) {
          displayResult(`${currentPlayer.name} wins!`);
          endGame();
        } else if (Gameboard.getBoard().every(cell => cell !== null)) {
          displayResult("It's a tie!");
          endGame();
        } else {
          switchPlayer();
        }
      }
    };
  
    const displayResult = (message) => {
      const resultMessage = document.getElementById("result-message");
      resultMessage.textContent = message;
    };
  
    const initGame = () => {
      Gameboard.createBoard();
      Gameboard.renderBoard();
      startGame();
    };
  
    document.getElementById("restart-button").addEventListener("click", initGame);
  
    initGame();
  
    return {
      handleCellClick,
    };
    
  })();