import { useGameContext } from '../../context/GameContext';
import style from '../../styles/Board.module.scss';
import { targetingSprites } from '../../static/gameValues';

const TargetingLayer = () => {
  const game = useGameContext();

  function handleClick(cellIndex: number) {
    game.updateData({ selectedCell: cellIndex });
  }

  return (
    <div className={style.boardLayer}>
      {game.data.opponentBoard.map((value, index) => {
        return (
          <div
            className={`${style.targetingCell} ${index === game.data.selectedCell ? style.selected : ''}`}
            onClick={() => {
              handleClick(index);
            }}
          >
            {index === game.data.selectedCell && <img src={targetingSprites.targeting} className={style.targetingSprite} />}
          </div>
        );
      })}
    </div>
  );
};

export default TargetingLayer;
