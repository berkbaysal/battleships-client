import { useGameContext } from '../context/GameContext';
import style from '../styles/Menu.module.scss';
import MenuButton from './MenuButton';
import logo from '../assets/logo.png';

const MainMenu = () => {
  const game = useGameContext();
  return (
    <div className={style.menuFrame}>
      <MenuButton
        label="Host a game"
        action={() => {
          game.updateData({ activeMenu: 'host' });
        }}
        styleOverride={{ gridColumn: '13/21', gridRow: '7/9' }}
      />
      <MenuButton
        label="Join a game"
        action={() => {
          game.updateData({ activeMenu: 'join' });
        }}
        styleOverride={{ gridColumn: '13/21', gridRow: '10/12' }}
      />
    </div>
  );
};

export default MainMenu;
