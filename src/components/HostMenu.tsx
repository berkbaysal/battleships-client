import { useState } from 'react';
import { useGameContext } from '../context/GameContext';
import style from '../styles/Menu.module.scss';
import MenuButton from './MenuButton';

const HostMenu = () => {
  const game = useGameContext();
  const [roomName, setRoomName] = useState<string>('');
  return (
    <div className={style.menuFrame}>
      <input
        type="text"
        className={style.inputField}
        value={roomName}
        onChange={(e) => {
          setRoomName(e.target.value);
        }}
      />
      <MenuButton
        label="Create room"
        action={() => {
          game.createRoom(roomName);
        }}
      />
    </div>
  );
};

export default HostMenu;
