import { useGameContext } from '../../context/GameContext';
import style from '../../styles/Board.module.scss';

const GridLayer = () => {
  const game = useGameContext();

  return (
    <div className={style.boardLayer}>
      {game.data.playerBoard.map((cell, index) => (
        <div className={style.gridCell} key={`grid-cell-${index}`} />
      ))}
    </div>
  );
};

export default GridLayer;
