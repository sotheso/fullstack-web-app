import React from 'react';
import Image from 'next/image';
import { useBrandCard } from '../../Functions/useBrandCard';

const bannerStyle: React.CSSProperties = {
  width: '538px',
  height: '180px',
  flexShrink: 0,
  borderRadius: '24px',
  border: '1px solid #F26430',
  background: '#F26430',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'white',
  fontSize: 20,
  fontWeight: 400,
  position: 'relative',
  margin: '0 12px',
  padding: '16px 20px',
  boxSizing: 'border-box',
  overflow: 'hidden',
  transition: 'width 0.2s',
};

const avatarStyle: React.CSSProperties = {
  display: 'flex',
  width: '36px',
  height: '36px',
  padding: '8px',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
  borderRadius: '50%',
  background: '#E5E7EB',
  marginBottom: '4px',
};

const responsiveContainer: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
  margin: '16px 0',
  flexWrap: 'wrap',
};

const BottomImage: React.FC = () => {
  const { brands, loading, error } = useBrandCard();

  console.log('BottomImage brands:', brands);
  console.log('BottomImage loading:', loading);
  console.log('BottomImage error:', error);

  return (
    <div style={responsiveContainer}>
      {loading && (
        <div style={{ color: '#666', textAlign: 'center', width: '100%' }}>
          در حال بارگذاری برندها...
        </div>
      )}
      {error && (
        <div style={{ color: '#f44336', textAlign: 'center', width: '100%' }}>
          {error}
        </div>
      )}
      {!loading && !error && brands.length === 0 && (
        <div style={{ color: '#666', textAlign: 'center', width: '100%' }}>
          هیچ برندی یافت نشد
        </div>
      )}
      {!loading && !error && brands.map((brand) => (
        <div
          key={brand.id}
          style={bannerStyle as React.CSSProperties}
          className="bottom-banner-responsive"
        >
          {/* توضیحات */}
          <div style={{
            flex: 1,
            color: '#FFF',
            textAlign: 'justify',
            textAlignLast: 'right',
            fontFamily: 'Inter',
            fontSize: 13,
            fontWeight: 400,
            lineHeight: '20px',
            marginLeft: 20,
            direction: 'rtl',
          }}>
            {brand.description}
          </div>
          {/* پروفایل و عنوان */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90, paddingLeft: 12 }}>
            <div style={avatarStyle}>
              <Image src={brand.avatarSrc} alt="avatar" width={28} height={28} />
            </div>
            <div style={{
              color: '#FFF',
              textAlign: 'center',
              fontFamily: 'Ravi',
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 1,
            }}>
              {brand.brandName}
            </div>
            <div style={{
              color: '#FFF',
              textAlign: 'center',
              fontFamily: 'Ravi',
              fontSize: 11,
              fontWeight: 400,
            }}>
              {(() => {
                const words = String(brand.brandField || '').trim().split(/\s+/);
                if (words.length <= 4) return brand.brandField;
                return (
                  <>
                    {words.slice(0, 4).join(' ')}
                    <br />
                    {words.slice(4).join(' ')}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      ))}
      <style jsx>{`
        @media (max-width: 700px) {
          .bottom-banner-responsive {
            width: 90% !important;
            min-width: unset !important;
            margin: 16px 0 !important;
            padding: 14px 16px !important;
          }
          .bottom-banner-responsive div[style*='font-size: 14px'] {
            font-size: 12px !important;
            line-height: 18px !important;
          }
          .bottom-banner-responsive div[style*='font-size: 13px'] {
            font-size: 11px !important;
          }
          .bottom-banner-responsive div[style*='font-size: 11px'] {
            font-size: 10px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BottomImage; 