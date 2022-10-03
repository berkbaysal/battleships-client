import { createContext, useCallback, useContext, useState } from 'react';
import Game from '../interfaces/Game';
import { Socket } from 'socket.io-client';
import gameEngine from '../static/util';

interface GameContext {
  game: Game;
  setGame: React.Dispatch<React.SetStateAction<Game>>;
  joinRoom: (roomName: string) => void;
  createRoom: (roomName: string) => void;
  startGame: (emit?: boolean) => void;
}

const ServerContext = createContext<GameContext | undefined>(undefined);

function useServerContext() {
  const context = useContext(ServerContext);
  if (context === undefined) {
    throw new Error('ServerContext is undefined');
  }
  return context;
}

interface ContextProps {
  children: JSX.Element;
  socket: Socket;
}

const ServerContextProvider = ({ children, socket }: ContextProps) => {
  const [game, setGame] = useState<Game>({ activeGame: false });

  const joinRoom = useCallback(
    (roomName: string) => {
      setGame((oldGame) => ({ ...oldGame, roomName: roomName }));
      socket.emit('join-room', roomName);
    },
    [socket]
  );

  const createRoom = useCallback(
    (roomName: string) => {
      setGame((oldGame) => ({ ...oldGame, roomName: roomName }));
      socket.emit('create-room', roomName);
    },
    [socket]
  );

  const startGame = useCallback(
    (emit: boolean = false) => {
      setGame((oldGame) => ({ ...oldGame, activeGame: true, playerBoard: gameEngine.initBoard(), opponentBoard: gameEngine.initBoard() }));
      if (emit) socket.emit('start-game', { roomName: game.roomName, opponent: game.opponent });
    },
    [socket, game.opponent, game.roomName]
  );
  return (
    <ServerContext.Provider value={{ game: game, setGame: setGame, joinRoom: joinRoom, createRoom: createRoom, startGame: startGame }}>
      {children}
    </ServerContext.Provider>
  );
};

export { useServerContext, ServerContextProvider };
