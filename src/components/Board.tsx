import style from '../styles/Board.module.css';
import GameBoard from './GameBoard';
import PlacementBoard from './PlacementBoard';

interface BoardProps {
  boardData: number[];
  boardType: 'player' | 'opponent' | 'placement';
}

const Board = ({ boardData, boardType }: BoardProps) => {
  const cellsPerRow = Math.sqrt(boardData.length);

  return (
    <div className={style.boardContainer}>
      <div className={style.board} style={{ gridTemplateColumns: `repeat(${cellsPerRow},1fr)` }}>
        {boardType === 'placement' && <PlacementBoard />}
        {boardType !== 'placement' && <GameBoard boardData={boardData} boardType={boardType} />}
      </div>
    </div>
  );
};

export default Board;
