import { LegacyRef, MutableRefObject, Ref, useRef, useState } from 'react';
import Board from './components/Board';
import { useGameContext } from './context/GameContext';
import gameEngine from './static/gameEngine';

function App() {
  const [input, setInput] = useState('');

  const game = useGameContext();
  const board = useRef<HTMLButtonElement>(null);

  const disabled = game.data.clientId !== game.data.turn && game.data.activeGame;
  //console.log(game.data.playerBoard);
  return (
    <div className="App">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
      <button onClick={() => game.createRoom(input)} disabled={game.data.activeGame}>
        create
      </button>
      <button onClick={() => game.joinRoom(input)} disabled={game.data.activeGame}>
        join
      </button>
      <button
        ref={board}
        onClick={() => {
          game.startGame(true);
          board.current?.blur();
        }}
        disabled={game.data.activeGame}
      >
        start
      </button>
      <button
        onClick={() => game.updateData({ playerBoard: gameEngine.placeTestShips(game.data.playerBoard) })}
        disabled={game.data.activeGame}
      >
        test
      </button>
      <button
        onClick={() => {
          if (game.data.selectedCell !== undefined) game.attackCell(game.data.selectedCell);
        }}
        disabled={disabled}
      >
        attack
      </button>
      <div style={{ display: 'flex' }}>
        {game.data.gameState === 'placement' && (
          <>
            <Board boardData={game.data.playerBoard ? game.data.playerBoard : []} boardType="placement" />
          </>
        )}
        {game.data.gameState === 'active' && (
          <>
            <Board boardData={game.data.playerBoard ? game.data.playerBoard : []} boardType="player" />
            <Board boardData={game.data.opponentBoard ? game.data.opponentBoard : []} boardType="opponent" />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
