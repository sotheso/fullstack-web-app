import React from 'react';

interface RoundIconButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const RoundIconButton: React.FC<RoundIconButtonProps> = ({ children, ...props }) => (
  <div
    style={{
      position: 'absolute',
      left: 8,
      bottom: 12,
      background: '#ff7043',
      borderRadius: '50%',
      width: 24,
      height: 24,
      minWidth: 24,
      minHeight: 24,
      maxWidth: 24,
      maxHeight: 24,
      flexShrink: 0,
      boxSizing: 'border-box',
    }}
    {...props}
  >
    {children}
  </div>
);

export default RoundIconButton; 