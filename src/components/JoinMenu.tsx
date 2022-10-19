import { useState } from 'react';
import { useGameContext } from '../context/GameContext';
import style from '../styles/Menu.module.scss';
import MenuButton from './MenuButton';

const JoinMenu = () => {
  const game = useGameContext();
  const [roomName, setRoomName] = useState<string>('');

  function isValidName() {
    if (roomName.length === 0) return false;
    return true;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    game.updateData({ errorMessage: '' });
    setRoomName(e.target.value);
  }

  return (
    <div className={style.menuFrame}>
      <input type="text" className={style.inputField} value={roomName} onChange={handleChange} />

      <MenuButton
        label="Join room"
        action={() => {
          game.joinRoom(roomName);
        }}
        disabled={!isValidName()}
      />
      <div className={style.errorMessage}>{game.data.errorMessage}</div>
    </div>
  );
};

export default JoinMenu;