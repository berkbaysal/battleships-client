import aircraftCarrierVertical from '../assets/gameSprites/aircraftCarrier.png';
import battleshipVertical from '../assets/gameSprites/battleship.png';
import destoryerVertical from '../assets/gameSprites/destroyer.png';
import submarineVertical from '../assets/gameSprites/submarine.png';
import patrolBoatVertical from '../assets/gameSprites/patrolBoat.png';
import aircraftCarrierHorizontal from '../assets/gameSprites/aircraftCarrier_hor.png';
import battleshipHorizontal from '../assets/gameSprites/battleship_hor.png';
import destoryerHorizontal from '../assets/gameSprites/destroyer_hor.png';
import submarineHorizontal from '../assets/gameSprites/submarine_hor.png';
import patrolBoatHorizontal from '../assets/gameSprites/patrolBoat_hor.png';
import damageSprite from '../assets/gameSprites/damage.png';
import missSprite from '../assets/gameSprites/miss.png';
import targetingSprite from '../assets/gameSprites/targeting.png';

const playerBoardValues = {
  empty: 0,
  ship: [
    { shipName: 'aircraftCarrier', values: [101, 102, 103, 104, 105] },
    { shipName: 'battleship', values: [111, 112, 113, 114] },
    { shipName: 'destroyer', values: [121, 122, 123] },
    { shipName: 'submarine', values: [131, 132] },
    { shipName: 'patrolBoat', values: [141] },
  ],
  placingShip: [
    { shipName: 'aircraftCarrier', values: [1010, 1020, 1030, 1040, 1050] },
    { shipName: 'battleship', values: [1110, 1120, 1130, 1140] },
    { shipName: 'destroyer', values: [1210, 1220, 1230] },
    { shipName: 'submarine', values: [1310, 1320] },
    { shipName: 'patrolBoat', values: [1410] },
  ],
  shipWreck: 201,
  missedShot: 301,
};
const opponentBoardValues = {
  unknown: 0,
  missed: -1,
  hit: 1,
};
const ships = [
  { name: 'Aircraft Carrier', size: 5 },
  { name: 'Battleship', size: 4 },
  { name: 'Destoryer', size: 3 },
  { name: 'Submarine', size: 2 },
  { name: 'Patrol Boat', size: 1 },
];
const spritesVertical = [aircraftCarrierVertical, battleshipVertical, destoryerVertical, submarineVertical, patrolBoatVertical];
const spritesHorizontal = [
  aircraftCarrierHorizontal,
  battleshipHorizontal,
  destoryerHorizontal,
  submarineHorizontal,
  patrolBoatHorizontal,
];
const targetingSprites = { damage: damageSprite, miss: missSprite, targeting: targetingSprite };

const server = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : 'https://battleships-364108.ew.r.appspot.com/';
export { playerBoardValues, opponentBoardValues, ships, server, spritesHorizontal, spritesVertical, targetingSprites };
