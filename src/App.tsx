import { useState } from 'react';
import { useServerContext } from './context/ServerContext';

function App() {
  const [input, setInput] = useState('');

  const game = useServerContext();
  console.log(game.game);
  return (
    <div className="App">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
      <button onClick={() => game.createRoom(input)}>create</button>
      <button onClick={() => game.joinRoom(input)}>join</button>
      <button onClick={() => game.startGame(true)}>start</button>
    </div>
  );
}

export default App;
