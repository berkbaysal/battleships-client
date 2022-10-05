export interface Game {
  activeGame?: boolean;
  roomName?: string;
  opponent?: string;
  playerBoard?: number[];
  opponentBoard?: number[];
  selectedCell?: number | null;
}

export interface GameContextInterface {
  data: Game;
  updateGame: (game: Game) => void;
  joinRoom: (roomName: string) => void;
  createRoom: (roomName: string) => void;
  startGame: (emit?: boolean) => void;
  handleAttack: (cell: number) => void;
  attackCell: (cell: number) => void;
}
