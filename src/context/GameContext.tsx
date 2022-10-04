import { createContext, useCallback, useContext, useState } from 'react';
import Game from '../interfaces/Game';
import { Socket } from 'socket.io-client';
import gameEngine from '../static/gameEngine';

interface GameContextInterface {
  game: Game;
  updateGame: (game: Game) => void;
  joinRoom: (roomName: string) => void;
  createRoom: (roomName: string) => void;
  startGame: (emit?: boolean) => void;
  handleAttack: (cell: number) => void;
  attackCell: (cell: number) => void;
}

const GameContext = createContext<GameContextInterface | undefined>(undefined);

function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('ServerContext is undefined');
  }
  return context;
}

interface ContextProps {
  children: JSX.Element;
  socket: Socket;
}

const GameContextProvider = ({ children, socket }: ContextProps) => {
  const [game, setGame] = useState<Game>({ activeGame: false, playerBoard: [], opponentBoard: [] });

  const updateGame = (game: Game) => {
    setGame((oldGame) => ({ ...oldGame, ...game }));
  };

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
      setGame((oldGame) => ({ ...oldGame, activeGame: true, playerBoard: [...gameEngine.initBoard()], opponentBoard: gameEngine.initBoard() }));
      if (emit) socket.emit('start-game', { roomName: game.roomName, opponent: game.opponent });
    },
    [socket, game.opponent, game.roomName]
  );

  const attackCell = useCallback(
    (cell: number) => {
      socket.emit('attack-cell', { opponent: game.opponent, cell: cell });
    },
    [socket, game.opponent]
  );

  const handleAttack = useCallback(
    (cell: number) => {
      if (!game.playerBoard) {
        throw new Error('Player board is not defined.');
      } else if (game.playerBoard[cell] === 0) {
        console.log('Attack missed');
      } else {
        console.log('Attack hit');
      }
    },
    [game.playerBoard]
  );

  return (
    <GameContext.Provider
      value={{
        game: game,
        updateGame: updateGame,
        joinRoom: joinRoom,
        createRoom: createRoom,
        startGame: startGame,
        attackCell: attackCell,
        handleAttack: handleAttack,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { useGameContext, GameContextProvider };
