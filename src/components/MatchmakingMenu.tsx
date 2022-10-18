import { useGameContext } from '../context/GameContext';
import style from '../styles/Menu.module.scss';
import MenuButton from './MenuButton';
import playerFound from '../assets/playerFound.png';
import noPlayerFound from '../assets/noPlayerFound.png';
import { useEffect, useState } from 'react';

const MatchmakingMenu = () => {
  const game = useGameContext();
  const [opponentExists, setOpponentExists] = useState<boolean>(!(game.data.opponent === null));

  useEffect(() => {
    setOpponentExists(!(game.data.opponent === null));
  }, [game.data.opponent]);

  return (
    <div className={style.menuFrame}>
      <div className={style.playerFramesContainer}>
        <div className={style.roomName}>Room name: {game.data.roomName}</div>
        <div className={style.playerFrames}>
          <div className={style.player}>
            <img src={playerFound} alt="player-profile-pic" className={style.profilePicture} />
            <div className={style.playerName}>You</div>
          </div>
          <div className={style.player}>
            {opponentExists && (
              <img src={opponentExists ? playerFound : noPlayerFound} alt="player-profile-pic" className={style.profilePicture} />
            )}
            <div className={style.playerName}>{opponentExists ? 'Opponent' : 'Waiting for opponent...'}</div>
          </div>
        </div>
        <div className={style.playerFrame}></div>
      </div>
      {game.data.clientIsHost && <MenuButton label="Start game" action={() => {}} disabled={!opponentExists} />}
      {!game.data.clientIsHost && <p>Waiting for host to start the game.</p>}
    </div>
  );
};

export default MatchmakingMenu;
