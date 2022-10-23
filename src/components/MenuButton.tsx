import style from '../styles/Menu.module.scss';
import React from 'react';

interface MenuButtonProps {
  label: string;
  action: () => void;
  styleOverride?: React.CSSProperties;
  disabled?: boolean;
  className?: string;
}

const MenuButton = ({ label, action, styleOverride, disabled = false, className = '' }: MenuButtonProps) => {
  return (
    <div
      className={`${disabled ? style.menuButtonDisabled : style.menuButton} ${className}`}
      style={{ ...styleOverride }}
      onClick={() => action()}
    >
      {label}
    </div>
  );
};

export default MenuButton;
