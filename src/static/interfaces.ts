import { Socket } from 'socket.io-client';

export interface Game {
  activeGame?: boolean;
  clientId?: string;
  turn?: string;
  roomName?: string;
  opponent?: string;
  playerBoard?: number[];
  opponentBoard?: number[];
  selectedCell?: number | undefined;
}

export interface GameContextInterface {
  data: Game;
  updateData: (game: Game) => void;
  updatePlayerBoard: (newBoard: number[]) => void;
  updateOpponentBoard: (newBoard: number[]) => void;
  joinRoom: (roomName: string) => void;
  createRoom: (roomName: string) => void;
  startGame: (emit?: boolean) => void;
  handleAttack: (cell: number, socket: Socket) => void;
  attackCell: (cell: number) => void;
}
