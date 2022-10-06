import { useGameContext } from '../context/GameContext';
import gameEngine from '../static/gameEngine';
import style from '../styles/Board.module.css';

interface BoardProps {
  boardData: number[];
  boardType: 'player' | 'opponent';
}

const Board = ({ boardData, boardType }: BoardProps) => {
  const cellsPerRow = Math.sqrt(boardData.length);
  const selectable = boardType === 'opponent';

  const game = useGameContext();

  function handleClick(cellIndex: number) {
    console.log(cellIndex);
    game.updateData({ selectedCell: cellIndex });
  }

  return (
    <div className={style.boardContainer}>
      <div className={style.board} style={{ gridTemplateColumns: `repeat(${cellsPerRow},1fr)` }}>
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
      </div>
    </div>
  );
};

export default Board;
