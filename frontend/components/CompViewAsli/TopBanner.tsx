import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BazaarcheButton from './CompDetails/ButtonCard/BazaarcheButton';
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
    <div style={{ marginBottom: 32, cursor: 'pointer' }} onClick={() => router.push('/details')}>
      {/* Main banner card */}
      <div
        style={{
          width: '100%',
          maxWidth: 1104,
          minHeight: isMobile ? 400 : 240,
          height: 'auto',
          borderRadius: 40,
          border: '1px solid #EDEDED',
          background: '#FCFCFC',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 16,
          alignItems: isMobile ? 'stretch' : 'center',
          position: 'relative',
          padding: isMobile ? 16 : 0,
          boxSizing: 'border-box',
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
            height: isMobile ? 120 : 200,
            flexShrink: 0,
            borderRadius: 24,
            background: '#F26430',
            margin: isMobile ? '0 auto 16px auto' : 16,
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
            marginTop: isMobile ? 16 : 0,
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}
        >
          {banner.tags.map((tag, index) => (
            <BazaarcheButton key={index}>{tag}</BazaarcheButton>
          ))}
          <div style={{ marginLeft: 32 }}>
            <DateButton>{banner.date}</DateButton>
          </div>
        </div>
        {/* Orange circle absolutely positioned in bottom left */}
        {!isMobile && (
          <div
            style={{
              position: 'absolute',
              left: 16,
              bottom: 16,
              width: 24,
              height: 24,
              background: '#F26430',
              borderRadius: '50%',
            }}
          />
        )}
        {/* Centered description text with spacing from the orange block */}
        <div
          style={{
            position: isMobile ? 'static' : 'absolute',
            right: isMobile ? 'auto' : '40%',
            top: isMobile ? 'auto' : '24px',
            width: isMobile ? '100%' : '58%',
            minWidth: 200,
            maxWidth: 637,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            margin: isMobile ? '0 auto' : 0,
            marginTop: isMobile ? 16 : 0,
          }}
        >
          <BannerTitle style={{ marginBottom: 8 }}>
            {banner.eventName}
          </BannerTitle>
          <BannerParagraph>
            {banner.eventDescription}
          </BannerParagraph>
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
const BannerParagraph: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div
    style={{
      width: '100%',
      minHeight: 40,
      flexShrink: 0,
      color: '#000',
      textAlign: 'right',
      fontFamily: 'Ravi',
      fontSize: 'clamp(12px, 1.3vw, 16px)',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 'clamp(22px, 2.2vw, 35px)',
      display: 'flex',
      alignItems: 'flex-start',
    }}
    {...props}
  >
    {children}
  </div>
);
export default BannerCard; 