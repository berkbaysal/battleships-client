import { createContext, useCallback, useContext, useState } from 'react';
import { Game, GameUpdate, GameContextInterface } from '../static/interfaces';
import { Socket } from 'socket.io-client';
import gameEngine from '../static/gameEngine';
import { opponentBoardValues, playerBoardValues } from '../static/gameValues';

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

const INIT_STATE: Game = {
  gameState: 'inactive',
  opponentGameState: null,
  clientId: null,
  turn: '',
  roomName: null,
  opponent: null,
  playerBoard: [],
  opponentBoard: [],
  selectedCell: null,
  activeGame: false,
  winner: null,
};

const GameContextProvider = ({ children, socket }: ContextProps) => {
  const [game, setGame] = useState<Game>(INIT_STATE);

  const updateData = (data: GameUpdate) => {
    setGame((oldGame) => ({ ...oldGame, ...data }));
  };

  const updatePlayerBoard = (newBoard: number[]) => {
    updateData({ playerBoard: newBoard });
  };

  const updateOpponentBoard = (newBoard: number[]) => {
    updateData({ opponentBoard: newBoard });
  };

  const joinRoom = useCallback(
    (roomName: string) => {
      setGame((oldGame) => ({ ...oldGame, roomName: roomName }));
      socket.emit('join-room', roomName);
    },
    [socket]
  );
  const completePlacement = useCallback(() => {
    socket.emit('ready', { opponent: game.opponent, opponentGameState: game.opponentGameState });
  }, [game.opponent, game.opponentGameState, socket]);

  const createRoom = useCallback(
    (roomName: string) => {
      setGame((oldGame) => ({ ...oldGame, roomName: roomName }));
      socket.emit('create-room', roomName);
    },
    [socket]
  );

  const startGame = useCallback(
    (emit: boolean = false) => {
      updateData({
        gameState: 'placement',
        playerBoard: gameEngine.initBoard(),
        opponentBoard: gameEngine.initBoard(),
        activeGame: true,
        opponentGameState: 'placement',
      });
      if (emit) socket.emit('start-game', { roomName: game.roomName, opponent: game.opponent });
    },
    [socket, game.opponent, game.roomName]
  );

  const attackCell = useCallback(
    (cell: number) => {
      socket.emit('attack-cell', { opponent: game.opponent, cell: cell });
      updateData({ selectedCell: undefined });
    },
    [socket, game.opponent]
  );

  const handleAttack = useCallback(
    (cell: number, socket: Socket) => {
      if (!game.playerBoard) {
        throw new Error('Player board is not defined.');
      } else if (game.playerBoard[cell] === playerBoardValues.empty) {
        const updatedBoard = gameEngine.changeCellValue(game.playerBoard, cell, playerBoardValues.missedShot);
        updateData({ playerBoard: updatedBoard });
        socket.emit('attack-result', { opponent: game.opponent, cell: cell, outcome: false, roomName: game.roomName });
      } else {
        const updatedBoard = gameEngine.changeCellValue(game.playerBoard, cell, playerBoardValues.shipWreck);
        updateData({ playerBoard: updatedBoard });
        socket.emit('attack-result', { opponent: game.opponent, cell: cell, outcome: true, roomName: game.roomName });
        if (gameEngine.isGameLost(updatedBoard)) {
          updateData({ gameState: 'game-over', winner: game.opponent });
          socket.emit('game-over', { opponent: game.opponent, roomName: game.roomName });
        }
      }
    },
    [game.playerBoard]
  );

  return (
    <GameContext.Provider
      value={{
        data: game,
        updateData: updateData,
        updatePlayerBoard: updatePlayerBoard,
        updateOpponentBoard: updateOpponentBoard,
        joinRoom: joinRoom,
        createRoom: createRoom,
        startGame: startGame,
        attackCell: attackCell,
        handleAttack: handleAttack,
        completePlacement: completePlacement,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { useGameContext, GameContextProvider };
