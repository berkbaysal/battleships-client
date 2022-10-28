import { createContext, useCallback, useContext, useState } from 'react';
import { Game, GameUpdate, GameContextInterface } from '../static/interfaces';
import { Socket } from 'socket.io-client';
import gameEngine from '../static/gameEngine';
import { playerBoardValues } from '../static/gameValues';

const DEBUG_MODE = true;

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

const GAME_SOFT_RESET: GameUpdate = {
  opponentGameState: null,
  turn: '',
  opponent: null,
  playerBoard: [],
  opponentBoard: [],
  selectedCell: null,
  activeGame: false,
  winner: null,
  errorMessage: '',
};

const INIT_STATE: Game = {
  clientId: null,
  roomName: null,
  clientIsHost: false,
  gameState: 'inactive',
  activeMenu: 'welcome',
  opponentGameState: null,
  turn: '',
  opponent: null,
  playerBoard: [],
  opponentBoard: [],
  selectedCell: null,
  activeGame: false,
  winner: null,
  errorMessage: '',
  placedShips: [],
};

const TEST_INIT: Game = {
  clientId: null,
  roomName: 'test',
  clientIsHost: true,
  gameState: 'placement',
  activeMenu: 'welcome',
  opponentGameState: 'placement',
  turn: '',
  opponent: null,
  playerBoard: gameEngine.initBoard(),
  opponentBoard: gameEngine.initBoard(),
  selectedCell: null,
  activeGame: true,
  winner: null,
  errorMessage: '',
  placedShips: [],
};

const GameContextProvider = ({ children, socket }: ContextProps) => {
  const [game, setGame] = useState<Game>(DEBUG_MODE ? TEST_INIT : INIT_STATE);

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
    async (roomName: string) => {
      roomName = gameEngine.formatRoomName(roomName);
      if (await gameEngine.checkIfRoomExists(roomName)) {
        setGame((oldGame) => ({ ...oldGame, roomName: roomName, activeMenu: 'matchmaking' }));
        socket.emit('join-room', roomName);
      } else {
        updateData({ errorMessage: 'Room not found' });
      }
    },
    [socket]
  );
  const completePlacement = useCallback(() => {
    socket.emit('ready', { opponent: game.opponent, opponentGameState: game.opponentGameState });
  }, [game.opponent, game.opponentGameState, socket]);

  const createRoom = useCallback(
    (roomName: string) => {
      roomName = gameEngine.formatRoomName(roomName);
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
          updateData({ gameState: 'game-over', winner: game.opponent, activeGame: false });
          socket.emit('game-over', { opponent: game.opponent, roomName: game.roomName });
        }
      }
    },
    [game.playerBoard]
  );

  const handleOpponentLeaving = useCallback(() => {
    console.log(game.roomName);
    if (game.clientIsHost) {
      updateData({ ...GAME_SOFT_RESET, gameState: 'inactive', activeMenu: 'matchmaking' });
    } else {
      socket.emit('clean-room', { roomName: game.roomName });
      updateData({ ...GAME_SOFT_RESET, gameState: 'inactive', activeMenu: 'main', roomName: null });
    }
  }, [game.clientIsHost, game.activeGame, game.roomName]);

  const leaveRoom = useCallback(() => {
    if (game.opponent !== null) socket.emit('player-left', { opponent: game.opponent, roomName: game.roomName });
    if (game.clientIsHost) socket.emit('clean-room', { roomName: game.roomName });
    updateData({ ...GAME_SOFT_RESET, activeMenu: 'main', roomName: null, clientIsHost: false });
  }, [game.opponent, game.roomName]);

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
        handleOpponentLeaving: handleOpponentLeaving,
        leaveRoom: leaveRoom,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { useGameContext, GameContextProvider };
