import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DateButton from './CompDetails/ButtonCard/DateButton';
import SectionTitle from './CompDetails/Text/SectionTitle';
import { useBanner } from '../../Functions/useBanner';

const BannerCard: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<undefined | boolean>(undefined);
  const [imageError, setImageError] = useState(false);
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

  const goToDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push('/details');
  };

  return (
    <div style={{ marginBottom: '2rem', cursor: 'default' }}>
      {/* Main banner card */}
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
          justifyContent: isMobile ? 'flex-start' : 'flex-end',
          position: 'relative',
          padding: isMobile ? '1rem' : '1rem 1rem 1rem 2rem',
          boxSizing: 'border-box',
          margin: isMobile ? '0 auto' : '0 auto',
          cursor: 'pointer',
        }}
        onClick={goToDetails}
      >
        {/* Right section - Orange block - یک سوم عرض بنر */}
        <div
          style={{
            width: isMobile ? '100%' : '33.33%',
            height: isMobile ? '12.5rem' : '100%',
            flexShrink: 0,
            borderRadius: '1.5rem',
            backgroundColor: '#F26430',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            margin: isMobile ? '0 auto 0.5rem auto' : 0,
            order: isMobile ? 1 : undefined,
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {banner.image && !imageError && (
            <img
              src={banner.image}
              alt="Banner"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '1.5rem',
              }}
              onError={() => setImageError(true)}
            />
          )}
        </div>
        {/* Button row absolutely positioned at bottom left of orange block */}
        <div
          style={{
            position: isMobile ? 'static' : 'absolute',
            right: isMobile ? 'auto' : '35%',
            bottom: isMobile ? 'auto' : '1rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: 0,
            justifyContent: isMobile ? 'center' : 'flex-start',
            order: isMobile ? 3 : undefined,
            zIndex: 2,
          }}
        >
          {/* Tags removed - no more موزیک، دانش، هنر tags */}
          <div style={{
            marginRight: isMobile ? 0 : '2rem',
            marginLeft: isMobile ? 0 : '1.5rem',
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
                  padding: '0.375rem 0.75rem',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem'}}>
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
                margin: '0.25rem 0',
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
      minHeight: '1.625rem',
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        color: '#000',
        fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
        fontFamily: 'Ravi',
        fontWeight: 700,
        lineHeight: '1.4',
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
      minHeight: '2.5rem',
      flexShrink: 0,
      color: '#333',
      textAlign: 'justify',
      textAlignLast: 'right',
      fontFamily: 'Ravi',
      fontSize: 'clamp(0.813rem, 1vw, 1rem)',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '1.75',
      display: 'flex',
      alignItems: 'flex-start',
      ...(isMobile && {
        overflow: 'hidden',
        maxHeight: '3.5rem',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
      }),
    }}
    {...props}
  >
    {children}
  </div>
);
export default BannerCard; 