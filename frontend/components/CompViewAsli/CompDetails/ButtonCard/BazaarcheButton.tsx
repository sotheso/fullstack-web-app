import React from 'react';

interface BazaarcheButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const BazaarcheButton: React.FC<BazaarcheButtonProps> = ({ children, ...props }) => (
  <button
    style={{
      background: '#F2C1AE',
      color: '#F26430',
      border: 'none',
      borderRadius: 12,
      padding: '2px 16px',
      fontWeight: 'bold',
      fontSize: 10,
      boxShadow: '0 1px 4px #eee',
      marginTop: 6,
      marginBottom: 8,
    }}
    {...props}
  >
    {children}
  </button>
);

export default BazaarcheButton; 