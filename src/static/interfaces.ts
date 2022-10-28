import { Socket } from 'socket.io-client';

export interface Game {
  gameState: 'placement' | 'active' | 'inactive' | 'waiting' | 'game-over';
  activeMenu: 'welcome' | 'main' | 'createroom' | 'host' | 'matchmaking' | 'join' | 'gameover';
  opponentGameState: null | 'placement' | 'active' | 'waiting' | 'game-over';
  clientId: string | null;
  turn: string;
  roomName: string | null;
  opponent: string | null;
  playerBoard: number[];
  opponentBoard: number[];
  selectedCell: number | null;
  activeGame: boolean;
  winner: string | null;
  clientIsHost: boolean;
  errorMessage: string;
  placedShips: { orientation: 'vertical' | 'horizontal'; placementStyle: React.CSSProperties }[];
}
export interface GameUpdate {
  gameState?: 'placement' | 'active' | 'inactive' | 'waiting' | 'game-over';
  activeMenu?: 'welcome' | 'main' | 'createroom' | 'host' | 'matchmaking' | 'join' | 'gameover';
  opponentGameState?: null | 'placement' | 'active' | 'waiting' | 'game-over';
  clientId?: string;
  turn?: string;
  roomName?: string | null;
  opponent?: string | null;
  playerBoard?: number[];
  opponentBoard?: number[];
  selectedCell?: number | null;
  activeGame?: boolean;
  winner?: string | null;
  clientIsHost?: boolean;
  errorMessage?: string;
  placedShips?: { orientation: 'vertical' | 'horizontal'; placementStyle: React.CSSProperties }[];
}

export interface PlacementInterface {
  orientation: 'vertical' | 'horizontal';
  originCell: number;
  size: number;
  colliding: boolean;
  currentShipIndex: number;
  shipCells: number[];
  placementBoard: number[];
}

export interface GameContextInterface {
  data: Game;
  updateData: (game: GameUpdate) => void;
  updatePlayerBoard: (newBoard: number[]) => void;
  updateOpponentBoard: (newBoard: number[]) => void;
  joinRoom: (roomName: string) => void;
  createRoom: (roomName: string) => void;
  startGame: (emit?: boolean) => void;
  handleAttack: (cell: number, socket: Socket) => void;
  attackCell: (cell: number) => void;
  completePlacement: () => void;
  handleOpponentLeaving: () => void;
  leaveRoom: () => void;
}

export interface ShipValues {
  shipName: string;
  values: number[];
}
