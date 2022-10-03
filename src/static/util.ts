const gameEngine = {
  initBoard: (size = 10) => {
    let board: number[][] = [];
    for (let i = 0; i < size; i++) {
      board.push([]);
      for (let j = 0; j < size; j++) {
        board[i].push(0);
      }
    }
    return board;
  },
};

export default gameEngine;
