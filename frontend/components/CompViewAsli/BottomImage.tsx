import React from 'react';
import Image from 'next/image';

const bannerStyle: React.CSSProperties = {
  width: '538px',
  height: '204px',
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
  padding: '32px 40px',
  boxSizing: 'border-box',
  overflow: 'hidden',
  transition: 'width 0.2s',
};

const avatarStyle: React.CSSProperties = {
  display: 'flex',
  width: '48px',
  height: '48px',
  padding: '12.8px',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
  borderRadius: '50%',
  background: '#E5E7EB',
  marginBottom: '8px',
};

const responsiveContainer: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '24px',
  margin: '48px 0',
  flexWrap: 'wrap',
};

const BottomImage: React.FC = () => {
  return (
    <div style={responsiveContainer}>
      {[1, 2].map((idx) => (
        <div
          key={idx}
          style={bannerStyle as React.CSSProperties}
          className="bottom-banner-responsive"
        >
          {/* توضیحات */}
          <div style={{
            flex: 1,
            color: '#FFF',
            textAlign: 'right',
            fontFamily: 'Inter',
            fontSize: 16,
            fontWeight: 400,
            lineHeight: '24px',
            marginLeft: 32,
            direction: 'rtl',
          }}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dis turpis nisi, justo, integer dignissim ornare leo euismod ac."
          </div>
          {/* پروفایل و عنوان */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120, paddingLeft: 24 }}>
            <div style={avatarStyle}>
              <Image src="/iconProfile.svg" alt="avatar" width={38.4} height={38.4} />
            </div>
            <div style={{
              color: '#FFF',
              textAlign: 'center',
              fontFamily: 'Ravi',
              fontSize: 14,
              fontWeight: 700,
              marginBottom: 4,
            }}>
              اسم برند
            </div>
            <div style={{
              color: '#FFF',
              textAlign: 'center',
              fontFamily: 'Ravi',
              fontSize: 14,
              fontWeight: 400,
            }}>
              حوزه فعالیت برند
            </div>
          </div>
          {/* دکمه دایره‌ای پایین چپ */}
          <div style={{
            position: 'absolute',
            left: 12,
            bottom: 12,
            width: 40,
            height: 40,
            flexShrink: 0,
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#F3F4F6" />
            </svg>
          </div>
        </div>
      ))}
      <style jsx>{`
        @media (max-width: 700px) {
          .bottom-banner-responsive {
            width: 90% !important;
            min-width: unset !important;
            margin: 16px 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BottomImage; 