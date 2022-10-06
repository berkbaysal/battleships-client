import { useState } from 'react';
import Board from './components/Board';
import { useGameContext } from './context/GameContext';
import gameEngine from './static/gameEngine';

function App() {
  const [input, setInput] = useState('');

  const game = useGameContext();
  console.log(game.data);
  return (
    <div className="App">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
      <button onClick={() => game.createRoom(input)}>create</button>
      <button onClick={() => game.joinRoom(input)}>join</button>
      <button onClick={() => game.startGame(true)}>start</button>
      <button onClick={() => game.updateData({ playerBoard: gameEngine.placeTestShips(game.data.playerBoard) })}>test</button>
      <button
        onClick={() => {
          if (game.data.selectedCell !== undefined) game.attackCell(game.data.selectedCell);
        }}
      >
        attack
      </button>

      <Board boardData={game.data.playerBoard ? game.data.playerBoard : []} boardType="player" />
      <br />
      <Board boardData={game.data.opponentBoard ? game.data.opponentBoard : []} boardType="opponent" />
    </div>
  );
}

export default App;
