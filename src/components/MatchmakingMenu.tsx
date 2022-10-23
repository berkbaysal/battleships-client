import { useGameContext } from '../context/GameContext';
import style from '../styles/Menu.module.scss';
import MenuButton from './MenuButton';
import playerFound from '../assets/playerFound.png';
import noPlayerFound from '../assets/noPlayerFound.png';
import { useEffect, useState } from 'react';
import { IoArrowBackCircleSharp } from 'react-icons/io5';

const MatchmakingMenu = () => {
  const game = useGameContext();
  const [opponentExists, setOpponentExists] = useState<boolean>(!(game.data.opponent === null));

  useEffect(() => {
    setOpponentExists(!(game.data.opponent === null));
  }, [game.data.opponent]);

  return (
    <div className={style.menuFrame}>
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
      {game.data.clientIsHost && (
        <MenuButton
          label="Start game"
          action={() => {
            game.startGame(true);
          }}
          disabled={!opponentExists}
          styleOverride={{ gridColumn: '13/21', gridRow: '13/15' }}
        />
      )}
      {!game.data.clientIsHost && <p className={style.footnote}>Waiting for host to start the game.</p>}
      <div className={style.backButton} onClick={() => game.leaveRoom()}>
        <IoArrowBackCircleSharp className={style.backButtonIcon} />
        &nbsp;Back
      </div>
    </div>
  );
};

export default MatchmakingMenu;
