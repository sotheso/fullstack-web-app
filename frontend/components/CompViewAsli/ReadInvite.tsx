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
    router.push('/blogs');
  };

  return (
    <div style={{ marginBottom: '2rem', cursor: 'default' }}>
      <div
        className="banner-card-container"
        style={{
          width: '100%',
          maxWidth: '100%',
          minHeight: isMobile ? '22.5rem' : '15rem',
          height: isMobile ? 'auto' : '15rem',
          borderRadius: '1.5rem',
          border: '1px solid #EDEDED',
          background: '#FCFCFC',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '0.25rem' : '1.5rem',
          alignItems: isMobile ? 'stretch' : 'center',
          position: 'relative',
          padding: isMobile ? '1rem' : '1rem 1rem 1rem 2rem',
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
            width: isMobile ? '100%' : '33.33%',
            height: isMobile ? '12.5rem' : '100%',
            flexShrink: 0,
            borderRadius: '1.5rem',
            background: '#F26430',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            margin: isMobile ? '0 auto 0.5rem auto' : 0,
            order: isMobile ? 1 : undefined,
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1,
          }}
        />

        {/* Text content */}
        <div
          style={{
            position: isMobile ? 'static' : 'absolute',
            right: isMobile ? 'auto' : '35%',
            top: isMobile ? 'auto' : '1.5rem',
            left: isMobile ? 'auto' : '1rem',
            width: isMobile ? '100%' : 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            margin: isMobile ? '0 auto' : 0,
            marginTop: isMobile ? '0.5rem' : 0,
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
              fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
              fontFamily: 'Ravi',
              fontWeight: 700,
              wordWrap: 'break-word',
              marginBottom: '0.125rem',
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
              fontSize: 'clamp(0.813rem, 1vw, 1rem)',
              fontWeight: 400,
              lineHeight: '1.75',
              marginTop: '0.125rem',
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
                margin: '0.25rem 0',
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
              left: '1rem',
              bottom: '1rem',
              padding: '0.5rem 1rem',
              background: 'transparent',
              color: '#F26430',
              border: 'none',
              fontSize: '0.875rem',
              fontFamily: 'Ravi',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              zIndex: 2,
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
                padding: '0.25rem 0.5rem',
                background: 'transparent',
                color: '#F26430',
                border: 'none',
                fontSize: '0.75rem',
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


