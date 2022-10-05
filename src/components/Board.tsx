import { useGameContext } from '../context/GameContext';
import style from '../styles/Board.module.css';

interface BoardProps {
  boardData: number[];
  selectable?: boolean;
}

const Board = ({ boardData, selectable = true }: BoardProps) => {
  const cellsPerRow = Math.sqrt(boardData.length);

  const game = useGameContext();

  function handleClick(cellIndex: number) {
    console.log(cellIndex);
    game.updateGame({ selectedCell: cellIndex });
  }

  return (
    <div className={style.boardContainer}>
      <div className={style.board} style={{ gridTemplateColumns: `repeat(${cellsPerRow},1fr)` }}>
        {boardData.map((cellValue, index) => {
          return (
            <div
              className={`${style.cell} ${game.data.selectedCell === index ? style.selected : ''}`}
              onClick={() => (selectable ? handleClick(index) : undefined)}
              key={'cell-' + index}
            >
              {cellValue}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
