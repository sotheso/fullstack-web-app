import React from 'react';
import Image from 'next/image';

const TopBar: React.FC = () => {
  return (
    <div
      className="top-bar"
    >
      {/* Centered Logo and Button Container */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '16px'
      }}>
        {/* Logo */}
        <Image
          src="/DavvatLogo.png"
          alt="Davvat Logo"
          width={62}
          height={62}
          style={{ 
            objectFit: 'contain',
            aspectRatio: '1/1'
          }}
        />
        
        {/* Registration Button */}
        <button
          style={{
            width: '96px',
            height: '32px',
            flexShrink: 0,
            borderRadius: '16px',
            background: '#F26430',
            border: 'none',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ثبت نام
        </button>
      </div>
    </div>
  );
};

export default TopBar; 