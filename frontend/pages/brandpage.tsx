import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useBrandCard } from '../Functions/useBrandCard';

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

const BrandPage: React.FC = () => {
  const { brands, loading, error } = useBrandCard();
  const router = useRouter();
  const idParam = typeof router.query.id === 'string' ? router.query.id : undefined;
  const filteredBrands = idParam ? brands.filter((b) => String(b.id) === idParam) : brands;

  return (
    <div style={{ padding: '20px 20px 40px 20px' }}>
      <h1 style={{ textAlign: 'center', fontFamily: 'Ravi, sans-serif' }}>برندها</h1>
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
        {!loading && !error && filteredBrands.length === 0 && (
          <div style={{ color: '#666', textAlign: 'center', width: '100%' }}>
            هیچ برندی یافت نشد
          </div>
        )}
        {!loading && !error && filteredBrands.map((brand) => (
          <div
            key={brand.id}
            id={`brand-${brand.id}`}
            style={bannerStyle as React.CSSProperties}
            className="brand-card"
          >
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
            }} className="brand-desc">
              {brand.description}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90, paddingLeft: 12 }} className="brand-right">
              <div style={avatarStyle}>
                <Image src={(process.env.NEXT_PUBLIC_BASE_PATH || '') + '/mamaz2.png'} alt="brand" width={28} height={28} style={{ filter: 'grayscale(100%)', objectFit: 'contain' }} />
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
      </div>
      <style jsx>{`
        @media (max-width: 700px) {
          .brand-card {
            width: 92% !important;
            height: auto !important;
            flex-direction: column-reverse !important;
            padding: 14px 16px !important;
            gap: 12px !important;
          }
          .brand-right {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: flex-end !important;
            padding-left: 0 !important;
            gap: 10px !important;
          }
          .brand-desc {
            margin-left: 0 !important;
            font-size: 12px !important;
            line-height: 18px !important;
            text-align: right !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BrandPage;


