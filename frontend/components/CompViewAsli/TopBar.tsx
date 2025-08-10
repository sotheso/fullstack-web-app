import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const TopBar: React.FC = () => {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push('/login');
  };

  return (
    <div
      className="top-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: 'calc(100vw - 40px)',
        height: '80px',
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(5px)',
        border: '2.5px solid rgb(255, 255, 255)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        borderRadius: '28px',
      }}
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
          width={80}
          height={80}
          style={{ 
            objectFit: 'contain',
            aspectRatio: '1/1'
          }}
        />
        
        {/* Registration Button */}
        <button
          onClick={handleRegisterClick}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(242, 100, 48, 1)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
            width: '120px',
            height: '40px',
            borderRadius: '16px',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: 'Ravi',
            cursor: 'pointer',
          }}
        >
          ثبت نام
        </button>
      </div>

      <style jsx>{`
        .top-bar {
          margin-left: calc(-20px);
          margin-right: calc(-20px);
        }
        
        @media (min-width: 768px) {
          .top-bar {
            margin-left: calc(-94px);
            margin-right: calc(-94px);
          }
        }
      `}</style>
    </div>
  );
};

export default TopBar; 