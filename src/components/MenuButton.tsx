import style from '../styles/Menu.module.scss';
import React from 'react';

interface MenuButtonProps {
  label: string;
  action: () => void;
  styleOverride?: React.CSSProperties;
}

const MenuButton = ({ label, action, styleOverride }: MenuButtonProps) => {
  return (
    <div className={style.menuButton} style={{ ...styleOverride }} onClick={() => action()}>
      {label}
    </div>
  );
};

export default MenuButton;
