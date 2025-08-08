import React from 'react';

const capsuleStyle: React.CSSProperties = {
  width: '180px',
  height: '40px',
  flexShrink: 0,
  position: 'relative',
  borderRadius: '40px',
  backgroundColor: '#f26430',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const textStyle: React.CSSProperties = {
  color: '#FFF',
  textAlign: 'justify',
  fontFamily: 'Ravi',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  width: '236px',
  height: '32px',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const OrangeCapsule: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={capsuleStyle}>
    <div style={textStyle}>{children}</div>
  </div>
);

export default OrangeCapsule; 