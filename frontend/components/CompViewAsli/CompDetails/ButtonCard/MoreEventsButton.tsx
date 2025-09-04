import React from 'react';

interface MoreEventsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const MoreEventsButton: React.FC<MoreEventsButtonProps> = ({ children, style, ...props }) => (
  <button
    {...props}
    style={{
      width: 104,
      height: 32,
      flexShrink: 0,
      borderRadius: 30,
      border: '1px solid #F26430',
      background: '#FCFCFC',
      color: '#F26430',
      textAlign: 'center',
      fontFamily: 'Ravi',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: 'normal',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}
  >
    {children ?? 'ایونت های بیشتر'}
  </button>
);

export default MoreEventsButton;


