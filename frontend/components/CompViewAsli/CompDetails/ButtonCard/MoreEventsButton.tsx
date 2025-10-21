import React from 'react';

interface MoreEventsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const MoreEventsButton: React.FC<MoreEventsButtonProps> = ({ children, style, className, ...props }) => (
  <button
    {...props}
    className={`load-more-button ${className || ''}`}
    style={{
      minWidth: '6.5rem',
      padding: '0.5rem 1rem',
      height: '2rem',
      flexShrink: 0,
      borderRadius: '1.875rem',
      border: '1px solid #F26430',
      background: '#FCFCFC',
      color: '#F26430',
      textAlign: 'center',
      fontFamily: 'Ravi',
      fontSize: '0.75rem',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: 'normal',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {children ?? 'ایونت های بیشتر'}
  </button>
);

export default MoreEventsButton;


