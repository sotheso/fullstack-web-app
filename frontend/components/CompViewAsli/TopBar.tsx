import React, { useState } from 'react';
import Image from 'next/image';

const TopBar: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleRegisterClick = () => {
    setShowAlert(true);
  };

  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <div
      className="top-bar"
      style={{
        // Not fixed: allow it to scroll away with the page
        width: 'calc(100vw - 40px)',
        height: '80px',
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
          src={`${BASE_PATH}/DavvatLogo.png`}
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

      {showAlert && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowAlert(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)',
            paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
            paddingLeft: 'calc(env(safe-area-inset-left, 0px) + 16px)',
            paddingRight: 'calc(env(safe-area-inset-right, 0px) + 16px)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(90vw, 320px)',
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 10,
              boxSizing: 'border-box',
              direction: 'rtl',
              margin: '100px auto 0',
            }}
          >
            <Image src={`${BASE_PATH}/work.png`} alt="درحال توسعه" width={110} height={110} />
            <div style={{ fontFamily: 'Ravi', fontSize: 16, fontWeight: 700 }}>
              برنامه نویسان مشغول کار اند
            </div>
            <button
              onClick={() => setShowAlert(false)}
              style={{
                marginTop: 4,
                backgroundColor: 'rgba(242, 100, 48, 1)',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '8px 16px',
                fontFamily: 'Ravi',
                cursor: 'pointer',
              }}
            >
              خداقوت
            </button>
          </div>
        </div>
      )}

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