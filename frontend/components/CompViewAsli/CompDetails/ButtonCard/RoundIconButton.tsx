import React from 'react';

interface RoundIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const defaultArrow = (
  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.16208 1.22296L6.20262 6.26356L11.2432 1.22296" stroke="white" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RoundIconButton: React.FC<RoundIconButtonProps> = ({ children, ...props }) => (
  <button
    style={{
      position: 'absolute',
      left: 8,
      bottom: 12,
      background: '#ff7043',
      color: '#fff',
      border: 'none',
      borderRadius: '50%',
      width: 28,
      height: 28,
      minWidth: 28,
      minHeight: 28,
      maxWidth: 28,
      maxHeight: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      boxShadow: '0 1px 4px #eee',
      flexShrink: 0,
      boxSizing: 'border-box',
    }}
    {...props}
  >
    {children ?? defaultArrow}
  </button>
);

export default RoundIconButton; 