const Gameboard = (() => {

    let board = [];
  
    const createBoard = () => {
      board = Array(9).fill(null); // Created an empty game board
    };
  
    const getBoard = () => {
      return board;
    };
  
    const placeMarker = (index, marker) => {
      if (board[index] === null) {
        board[index] = marker;
        return true; // Marker placed successfully
      } else {
        return false; // Cell already occupied
      }
    };
  
    // Return public functions
    return {
      createBoard,
      getBoard,
      placeMarker,
    };
  })();
  