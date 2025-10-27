import React from 'react';
import { usePWA } from '../Functions/usePWA';

const AddToHomeScreen: React.FC = () => {
  const { 
    showInstallPrompt, 
    showIOSPrompt,
    isIOS, 
    isStandalone, 
    installApp, 
    dismissPrompt 
  } = usePWA();



  const handleInstallClick = async () => {
    await installApp();
  };

  // Don't show if app is already installed or in standalone mode
  if (isStandalone || (!showInstallPrompt && !showIOSPrompt)) return null;

  return (
    <>
      {/* Overlay - blocks all interactions */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        {/* Modal */}
        <div
          style={{
            background: 'white',
            borderRadius: 20,
            padding: 32,
            maxWidth: 400,
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative',
          }}
        >


          {/* Icon */}
          <div style={{ marginBottom: 12, textAlign: 'center'}}>
            <img
              src={isIOS ? "/sharelogo.png" : "/homeScreen.png"}
              alt="Add to Home Screen"
              style={{
                width: 48,
                height: 48,
              }}
            />
          </div>

          {/* Title */}
          <h2
            style={{
              margin: '0 0 16px 0',
              fontSize: 24,
              fontWeight: 700,
              color: 'rgba(242, 100, 48, 1)',
              fontFamily: 'Ravi',
            }}
          >
            {isIOS ? 'افزودن به صفحه اصلی' : 'نصب اپلیکیشن'}
          </h2>

          {/* Description */}
          <p
            style={{
              margin: '0 0 24px 0',
              fontSize: 16,
              lineHeight: 1.6,
              color: '#666',
              fontFamily: 'Ravi',
            }}
          >
            {isIOS ? (
              <>
                برای تجربه بهتر و دسترسی آسان‌تر، اپلیکیشن تحت وب را به صفحه اصلی گوشی خود اضافه کنید
                <br /> <br />
                <br />
                روی دکمه<img src="/sharelogo.png" alt="Share" style={{ width: '24px', height: '24px', verticalAlign: 'middle', margin: '0 4px' }} /> کلیک کنید
                <br />
                را انتخاب کنید <img src="/homeScreen.png" alt="Add to Home Screen" style={{ width: '32px', height: '32px', verticalAlign: 'middle', margin: '0 4px' }} /> "Add to Home Screen"
                <br />
                کلیک کنید "Add" روی
              </>
            ) : (
              'برای تجربه بهتر و دسترسی آسان‌تر، این سایت را به عنوان اپلیکیشن نصب کنید.'
            )}
          </p>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            {!isIOS && (
              <button
                onClick={handleInstallClick}
                style={{
                  background: 'rgba(242, 100, 48, 1)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  borderRadius: 24,
                  padding: '14px 28px',
                  fontSize: 19,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Ravi',
                  minWidth: 145,
                  height: 50,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
                }}
              >
                نصب
              </button>
            )}
            
            <button
              onClick={dismissPrompt}
              style={{
                background: 'rgba(242, 100, 48, 1)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: 24,
                padding: '14px 28px',
                fontSize: 19,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Ravi',
                minWidth: 145,
                height: 50,
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
              }}
            >
              {isIOS ? 'متوجه شدم' : 'بعداً'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToHomeScreen;
