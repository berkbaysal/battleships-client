import { useGameContext } from '../../context/GameContext';
import { spritesHorizontal, spritesVertical } from '../../static/gameValues';
import style from '../../styles/Board.module.scss';

const ShipsLayer = () => {
  const game = useGameContext();

  return (
    <div className={style.boardLayer}>
      {game.data.placedShips.map((entry, index) =>
        entry.orientation === 'horizontal' ? (
          <img src={spritesHorizontal[index]} style={entry.placementStyle} className={style.sprite} />
        ) : (
          <img src={spritesVertical[index]} style={entry.placementStyle} className={style.sprite} />
        )
      )}
    </div>
  );
};

export default ShipsLayer;
