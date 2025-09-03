import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DateButton from './CompDetails/ButtonCard/DateButton';
import SectionTitle from './CompDetails/Text/SectionTitle';
import { useBanner } from '../../Functions/useBanner';

const BannerCard: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<undefined | boolean>(undefined);
  const { banner, loading } = useBanner();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile === undefined || loading || !banner) return null;

  return (
    <div style={{ marginBottom: 32, cursor: 'default' }}>
      {/* Main banner card */}
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
          margin: isMobile ? '0 auto' : '0 auto', // Center in both mobile and desktop
        }}
      >
        {/* Left section - Empty for spacing */}
        {!isMobile && <div style={{ flex: 1, minWidth: 0 }} />}
        {/* Right section - Orange block */}
        <div
          style={{
            width: isMobile ? '100%' : '33%',
            minWidth: isMobile ? 0 : 200,
            maxWidth: isMobile ? '100%' : 370,
            height: isMobile ? 200 : 200,
            flexShrink: 0,
            borderRadius: 24,
            background: '#F26430',
            backgroundImage: banner.image ? `url(${banner.image})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            margin: isMobile ? '0 auto 8px auto' : '16px 32px', // Equal left and right margins
            order: isMobile ? 1 : undefined,
          }}
        />
        {/* Button row absolutely positioned at bottom left of orange block */}
        <div
          style={{
            position: isMobile ? 'static' : 'absolute',
            right: isMobile ? 'auto' : '36%',
            bottom: isMobile ? 'auto' : 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginTop: isMobile ? 0 : 0,
            justifyContent: isMobile ? 'center' : 'flex-start',
            order: isMobile ? 3 : undefined,
          }}
        >
          {/* Tags removed - no more موزیک، دانش، هنر tags */}
          <div style={{
            marginRight: isMobile ? 0 : 32,
            marginLeft: isMobile ? 0 : 24,
            display: 'flex',
            justifyContent: isMobile ? 'space-between' : 'flex-start',
            alignItems: 'center',
            width: isMobile ? '100%' : 'auto'
          }}>
            {isMobile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('/details');
                }}
                style={{
                  padding: '6px 12px',
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#E55A2B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#F26430';
                }}
              >
                مشاهده
              </button>
            )}
            {isMobile && (
              <div style={{ marginLeft: 'auto' }}>
                <DateButton>{banner.date}</DateButton>
              </div>
            )}
          </div>
        </div>
        {/* View button absolutely positioned in bottom left */}
        {!isMobile && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push('/details');
            }}
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
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#E55A2B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#F26430';
            }}
          >
            مشاهده
          </button>
        )}
        {/* Centered description text with spacing from the orange block */}
        <div
          style={{
            position: isMobile ? 'static' : 'absolute',
            right: isMobile ? 'auto' : '39%', // Reduced from 40% to bring text closer
            top: isMobile ? 'auto' : '24px',
            width: isMobile ? '100%' : '63%', // Increased from 58% to compensate
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8}}>
            {!isMobile && <DateButton>{banner.date}</DateButton>}
            <BannerTitle style={{ marginBottom: 0 }}>
              {banner.eventName}
            </BannerTitle>
          </div>
          <BannerParagraph isMobile={isMobile}>
            {banner.eventDescription}
          </BannerParagraph>
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
      </div>
    </div>
  );
};


// BannerTitle component
const BannerTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div
    style={{
      display: 'flex',
      width: '100%',
      minHeight: 26,
      flexDirection: 'column',
      justifyContent: 'center',
      flexShrink: 0,
      alignItems: 'flex-start',
    }}
    {...props}
  >
    <div
      style={{
        width: '100%',
        textAlign: 'right',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        color: 'black',
        fontSize: 'clamp(16px, 2vw, 24px)',
        fontFamily: 'Ravi',
        fontWeight: 700,
        wordWrap: 'break-word',
      }}
    >
      {children}
    </div>
  </div>
);

// BannerParagraph component
const BannerParagraph: React.FC<React.HTMLAttributes<HTMLDivElement> & { isMobile?: boolean }> = ({ children, isMobile, ...props }) => (
  <div
    style={{
      width: '100%',
      minHeight: 40,
      flexShrink: 0,
      color: '#000',
      textAlign: 'justify',
      textAlignLast: 'right',
      fontFamily: 'Ravi',
      fontSize: 'clamp(12px, 1.3vw, 16px)',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 'clamp(22px, 2.2vw, 35px)',
      display: 'flex',
      alignItems: 'flex-start',
      ...(isMobile && {
        overflow: 'hidden',
        maxHeight: 'calc(2 * clamp(22px, 2.2vw, 35px))',
        display: 'block',
        lineHeight: 'clamp(22px, 2.2vw, 35px)',
      }),
    }}
    {...props}
  >
    {children}
  </div>
);
export default BannerCard; 