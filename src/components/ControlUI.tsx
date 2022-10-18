import { useRef, useState } from 'react';
import { useGameContext } from '../context/GameContext';
import style from '../styles/Menu.module.scss';
import HostMenu from './HostMenu';
import MatchmakingMenu from './MatchmakingMenu';
import MainMenu from './MainMenu';
import WelcomeScreen from './WelcomeScreen';
import JoinMenu from './JoinMenu';

const ControlUI = () => {
  const game = useGameContext();
  const startButton = useRef<HTMLButtonElement>(null); //used to "unfocus" the start button after game start
  const disabled = game.data.clientId !== game.data.turn && game.data.activeGame; //check if some buttons should be disabled
  const [input, setInput] = useState('');

  return (
    <div className={style.menuContainer}>
      {game.data.activeMenu === 'welcome' && <WelcomeScreen />}
      {game.data.activeMenu === 'main' && <MainMenu />}
      {game.data.activeMenu === 'host' && <HostMenu />}
      {game.data.activeMenu === 'join' && <JoinMenu />}
      {game.data.activeMenu === 'matchmaking' && <MatchmakingMenu />}

      {game.data.activeMenu === 'gameover' && (
        <>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
          <button onClick={() => game.createRoom(input)} disabled={game.data.activeGame}>
            create
          </button>
          <button onClick={() => game.joinRoom(input)} disabled={game.data.activeGame}>
            join
          </button>
          <button
            ref={startButton}
            onClick={() => {
              game.startGame(true);
              startButton.current?.blur();
            }}
            disabled={game.data.activeGame}
          >
            start
          </button>
          <button
            onClick={() => {
              if (game.data.selectedCell !== null) game.attackCell(game.data.selectedCell);
            }}
            disabled={disabled}
          >
            attack
          </button>
        </>
      )}
    </div>
  );
};

export default ControlUI;
