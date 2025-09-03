import React from 'react';

interface DateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DateButton: React.FC<DateButtonProps> = ({ children, ...props }) => (
  <button
    style={{
      width: '122.778px',
      minHeight: '28.333px',
      flexShrink: 0,
      borderRadius: '27px',
      background: '#F3F3F3',
      border: '1.5px solid #EDEDED',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      overflow: 'hidden',
    }}
    {...props}
  >
    <span
      style={{
        display: '-webkit-box',
        width: '106.25px',
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
        color: '#AEAEAE',
        textAlign: 'center',
        fontFamily: 'Ravi',
        fontSize: '11px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 'normal',
        maxWidth: '100%',
        minWidth: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        WebkitLineClamp: 2 as unknown as number,
        WebkitBoxOrient: 'vertical' as unknown as any,
      }}
    >
      {children}
    </span>
  </button>
);

export default DateButton; 