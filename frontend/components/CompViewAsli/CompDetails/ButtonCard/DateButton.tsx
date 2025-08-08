import React from 'react';

interface DateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DateButton: React.FC<DateButtonProps> = ({ children, ...props }) => (
  <button
    style={{
      width: '122.778px',
      height: '28.333px',
      flexShrink: 0,
      borderRadius: '27px',
      background: '#F3F3F3',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
    }}
    {...props}
  >
    <span
      style={{
        display: 'flex',
        width: '106.25px',
        height: '18.889px',
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Ravi',
        fontSize: '10px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 'normal',
      }}
    >
      {children}
    </span>
  </button>
);

export default DateButton; 