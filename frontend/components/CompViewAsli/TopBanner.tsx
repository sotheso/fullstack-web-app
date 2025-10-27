import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DateButton from './CompDetails/ButtonCard/DateButton';
import SectionTitle from './CompDetails/Text/SectionTitle';
import { useBanner } from '../../Functions/useBanner';

const BannerCard: React.FC = () => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const { banner, loading } = useBanner();

  // همیشه حالت موبایل را نمایش بده
  const isMobile = true;

  if (loading || !banner) return null;

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
          minHeight: '22.5rem',
          height: 'auto',
          borderRadius: '1.5rem',
          border: '1px solid #EDEDED',
          background: '#FCFCFC',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          position: 'relative',
          padding: '1rem',
          boxSizing: 'border-box',
          margin: '0 auto',
          cursor: 'pointer',
        }}
        onClick={goToDetails}
      >
        {/* Right section - Orange block - یک سوم عرض بنر */}
        <div
          style={{
            width: '100%',
            height: '12.5rem',
            flexShrink: 0,
            borderRadius: '1.5rem',
            backgroundColor: '#F26430',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            margin: '0 auto 0.5rem auto',
            order: 1,
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
        {/* Button row */}
        <div
          style={{
            position: 'static',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: 0,
            justifyContent: 'center',
            order: 3,
            zIndex: 2,
          }}
        >
          <div style={{
            marginRight: 0,
            marginLeft: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}>
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
            <div style={{ marginLeft: 'auto' }}>
              <DateButton>{banner.date}</DateButton>
            </div>
          </div>
        </div>
        {/* Description text */}
        <div
          style={{
            position: 'static',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            margin: '0 auto',
            marginTop: '0.5rem',
            order: 2,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem'}}>
            <BannerTitle style={{ marginBottom: 0 }}>
              {banner.eventName}
            </BannerTitle>
          </div>
          <BannerParagraph>
            {banner.eventDescription}
          </BannerParagraph>
          {/* Divider line */}
          <div
            style={{
              width: '100%',
              height: '1px',
              background: '#E5E5E5',
              margin: '0.25rem 0',
            }}
          />
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

// BannerParagraph component - همیشه حالت موبایل
const BannerParagraph: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
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
      overflow: 'hidden',
      maxHeight: '3.5rem',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
    }}
    {...props}
  >
    {children}
  </div>
);
export default BannerCard; 