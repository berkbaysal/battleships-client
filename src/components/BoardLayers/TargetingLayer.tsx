import { useGameContext } from '../../context/GameContext';
import style from '../../styles/Board.module.scss';

const TargetingLayer = () => {
  const game = useGameContext();

  function handleClick(cellIndex: number) {
    game.updateData({ selectedCell: cellIndex });
  }

  return (
    <div className={style.targetingLayer}>
      {game.data.opponentBoard.map((value, index) => {
        return (
          <div
            className={`${style.cell} ${index === game.data.selectedCell ? style.selected : ''}`}
            onClick={() => {
              handleClick(index);
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default TargetingLayer;
