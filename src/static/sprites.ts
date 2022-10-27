import aircraftCarrier1 from '../assets/gameSprites/aircraftCarrier1.png';
import aircraftCarrier2 from '../assets/gameSprites/aircraftCarrier2.png';
import aircraftCarrier3 from '../assets/gameSprites/aircraftCarrier3.png';
import aircraftCarrier4 from '../assets/gameSprites/aircraftCarrier4.png';
import aircraftCarrier5 from '../assets/gameSprites/aircraftCarrier5.png';
import battleship1 from '../assets/gameSprites/battleship1.png';
import battleship2 from '../assets/gameSprites/battleship2.png';
import battleship3 from '../assets/gameSprites/battleship3.png';
import battleship4 from '../assets/gameSprites/battleship4.png';
import destroyer1 from '../assets/gameSprites/destroyer1.png';
import destroyer2 from '../assets/gameSprites/destroyer2.png';
import destroyer3 from '../assets/gameSprites/destroyer3.png';
import submarine1 from '../assets/gameSprites/submarine1.png';
import submarine2 from '../assets/gameSprites/submarine2.png';
import patrolBoat from '../assets/gameSprites/patrolBoat.png';

const sprites = [
  {
    shipName: 'aircraftCarrier',
    parts: [aircraftCarrier1, aircraftCarrier2, aircraftCarrier3, aircraftCarrier4, aircraftCarrier5],
  },
  {
    shipName: 'battleship',
    parts: [battleship1, battleship2, battleship3, battleship4],
  },
  {
    shipName: 'destroyer',
    parts: [destroyer1, destroyer2, destroyer3],
  },
  {
    shipName: 'submarine',
    parts: [submarine1, submarine2],
  },
  {
    shipName: 'patrolBoat',
    parts: [patrolBoat],
  },
];

export default sprites;
