import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ReadInvite: React.FC = () => {
  const [isMobile, setIsMobile] = useState<undefined | boolean>(undefined);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile === undefined) return null;

  const goToDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push('/details');
  };

  return (
    <div style={{ marginBottom: 32, cursor: 'default' }}>
      <div
        style={{
          width: '100%',
          maxWidth: 1104,
          minHeight: isMobile ? 360 : 240,
          height: 'auto',
          borderRadius: 24,
          border: '1px solid #EDEDED',
          background: '#FCFCFC',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 4 : 16,
          alignItems: isMobile ? 'stretch' : 'center',
          position: 'relative',
          padding: isMobile ? 16 : 0,
          boxSizing: 'border-box',
          margin: '0 auto',
          cursor: 'pointer',
        }}
        onClick={goToDetails}
      >
        {!isMobile && <div style={{ flex: 1, minWidth: 0 }} />}

        {/* Orange block (visual parity with TopBanner) */}
        <div
          style={{
            width: isMobile ? '100%' : '33%',
            minWidth: isMobile ? 0 : 200,
            maxWidth: isMobile ? '100%' : 370,
            height: isMobile ? 200 : 200,
            flexShrink: 0,
            borderRadius: 24,
            background: '#F26430',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            margin: isMobile ? '0 auto 8px auto' : '16px 32px',
            order: isMobile ? 1 : undefined,
          }}
        />

        {/* Text content */}
        <div
          style={{
            position: isMobile ? 'static' : 'absolute',
            right: isMobile ? 'auto' : '39%',
            top: isMobile ? 'auto' : '24px',
            width: isMobile ? '100%' : '63%',
            minWidth: 200,
            maxWidth: 637,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            margin: isMobile ? '0 auto' : 0,
            marginTop: isMobile ? 8 : 0,
            order: isMobile ? 2 : undefined,
          }}
        >
          {/* Title */}
          <div
            style={{
              width: '100%',
              textAlign: 'right',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              color: 'black',
              fontSize: 'clamp(14px, 1.6vw, 20px)',
              fontFamily: 'Ravi',
              fontWeight: 700,
              wordWrap: 'break-word',
              marginBottom: 2,
            }}
          >
            ایونت چیه؟ و چطور برگزار میشه؟
          </div>
          <div
            style={{
              width: '100%',
              color: '#000',
              textAlign: 'justify',
              textAlignLast: 'right',
              fontFamily: 'Ravi',
              fontSize: 'clamp(12px, 1.3vw, 16px)',
              fontWeight: 400,
              lineHeight: 'clamp(22px, 2.2vw, 35px)',
              marginTop: 2,
            }}
          >
            وقتی شب و بساط و وافور با منقل ترکیب بشن، یه شب فراموش شدنیه! وقتی شب و بساط و وافور با منقل ترکیب
          </div>

          {/* Divider line for mobile */}
          {isMobile && (
            <div
              style={{
                width: '100%',
                height: '1px',
                background: '#E5E5E5',
                margin: '4px 0',
              }}
            />
          )}
        </div>

        {/* Read more button */}
        {!isMobile && (
          <button
            onClick={(e) => { e.stopPropagation(); }}
            style={{
              position: 'absolute',
              left: 16,
              bottom: 16,
              padding: '8px 16px',
              background: 'transparent',
              color: '#F26430',
              border: 'none',
              fontSize: '14px',
              fontFamily: 'Ravi',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#E55A2B'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#F26430'; }}
          >
            مطالعه بیشتر
          </button>
        )}

        {isMobile && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', order: 3 }}>
            <button
              onClick={(e) => { e.stopPropagation(); }}
              style={{
                padding: '4px 8px',
                background: 'transparent',
                color: '#F26430',
                border: 'none',
                fontSize: '12px',
                fontFamily: 'Ravi',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                marginLeft: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#E55A2B'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#F26430'; }}
            >
              مطالعه بیشتر
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadInvite;


