import style from '../../styles/Board.module.scss';
import background from '../../assets/gameSprites/water.jpg';
import { useGameContext } from '../../context/GameContext';

interface BackgroundLayerProps {
  variation?: 'cell' | 'fullscreen';
}

//USE PROP TO REPEAT A CELL BACKGROUND IMAGE OR COVER THE BOARD WITH A SINGLE IMAGE
const BackgroundLayer = ({ variation = 'fullscreen' }: BackgroundLayerProps) => {
  const game = useGameContext();

  return (
    <div className={style.boardLayer}>
      {variation === 'cell' &&
        game.data.playerBoard.map((cell, index) => (
          <img src={background} alt="background-tile" key={`background-tile-${index}`} className={style.backgroundImage} />
        ))}
      {variation === 'fullscreen' && <img alt="background" src={background} className={style.backgroundImageFullScreen} />}
    </div>
  );
};

export default BackgroundLayer;
