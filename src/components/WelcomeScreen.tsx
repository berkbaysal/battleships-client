import logo from '../assets/logo.png';
import { useGameContext } from '../context/GameContext';
import style from '../styles/Menu.module.scss';
import MenuButton from './MenuButton';

const WelcomeScreen = () => {
  const game = useGameContext();
  return (
    <div className={style.menuFrame}>
      <img src={logo} className={style.menuLogo} />
      <MenuButton
        label="Start"
        action={() => {
          game.updateData({ activeMenu: 'main' });
        }}
        styleOverride={{ gridColumn: '14/20', gridRow: '10/12' }}
      />
    </div>
  );
};

export default WelcomeScreen;
