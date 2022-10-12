import { useGameContext } from '../context/GameContext';
import gameEngine from '../static/gameEngine';
import style from '../styles/Board.module.css';

interface GameBoardProps {
  boardData: number[];
  boardType: 'player' | 'opponent';
}

const GameBoard = ({ boardData, boardType }: GameBoardProps) => {
  const game = useGameContext();
  const selectable = boardType === 'opponent' && game.data.turn === game.data.clientId; //used to disable selecting on player board

  function handleClick(cellIndex: number) {
    game.updateData({ selectedCell: cellIndex });
  }

  return (
    <>
      {boardData.map((cellValue, index) => {
        return (
          <div
            className={`${style.cell} ${game.data.selectedCell === index && selectable ? style.selected : ''}`}
            onClick={() => (selectable ? handleClick(index) : undefined)}
            key={'cell-' + index}
            style={gameEngine.getCellStyle(boardType, cellValue)}
          ></div>
        );
      })}
    </>
  );
};

export default GameBoard;
