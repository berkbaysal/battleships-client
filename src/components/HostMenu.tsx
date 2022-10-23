import { useState } from 'react';
import { useGameContext } from '../context/GameContext';
import style from '../styles/Menu.module.scss';
import MenuButton from './MenuButton';
import { IoArrowBackCircleSharp } from 'react-icons/io5';

const HostMenu = () => {
  const game = useGameContext();
  const [roomName, setRoomName] = useState<string>('');

  function isValidName() {
    if (roomName.length === 0) return false;
    return true;
  }

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
          game.updateData({ activeMenu: 'matchmaking' });
        }}
        disabled={!isValidName()}
        styleOverride={{ gridColumn: '13/21', gridRow: '10/12' }}
      />
      <div className={style.backButton} onClick={() => game.updateData({ activeMenu: 'main', errorMessage: '' })}>
        <IoArrowBackCircleSharp className={style.backButtonIcon} />
        &nbsp;Back
      </div>
    </div>
  );
};

export default HostMenu;
