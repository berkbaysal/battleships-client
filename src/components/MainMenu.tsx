import { useGameContext } from '../context/GameContext';
import style from '../styles/Menu.module.scss';
import MenuButton from './MenuButton';

const MainMenu = () => {
  const game = useGameContext();
  const mainMenuStyle = { width: '12rem' };
  return (
    <div className={style.menuFrame}>
      <MenuButton
        label="Host a game"
        action={() => {
          game.updateData({ activeMenu: 'host' });
        }}
        styleOverride={mainMenuStyle}
      />
      <MenuButton
        label="Join a game"
        action={() => {
          game.updateData({ activeMenu: 'join' });
        }}
        styleOverride={mainMenuStyle}
      />
    </div>
  );
};

export default MainMenu;
