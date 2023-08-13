// Player Factory
function createPlayer(name, marker) {
    return { name, marker };
  }
  
  // Gameboard Module
  const Gameboard = (() => {
    let board = [];
  
    const createBoard = () => {
      board = Array(9).fill(null);
    };
  
    const getBoard = () => {
      return board;
    };
  
    const placeMarker = (index, marker) => {
      if (board[index] === null) {
        board[index] = marker;
        return true;
      } else {
        return false;
      }
    };
  
    return {
      createBoard,
      getBoard,
      placeMarker,
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
        switchPlayer();
      }
    };
  
    return {
      startGame,
      endGame,
      handleCellClick,
    };
  })();
  
  // Generating Player Objects
  const player1 = createPlayer("Player 1", "X");
  const player2 = createPlayer("Player 2", "O");
  
 
  