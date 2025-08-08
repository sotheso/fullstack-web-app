import React from 'react';
import OrangeCapsule from '../components/CompViewDetails/OrangeCapsule';
import BazaarcheButton from '../components/CompViewAsli/CompDetails/ButtonCard/BazaarcheButton';

export type Program = { capsule: string, description: string };

export const BannerTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, style, ...props }) => (
  <div
    style={{
      flexShrink: 0,
      color: '#000',
      textAlign: 'right',
      fontFamily: 'Ravi',
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: 'normal',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      ...style
    }}
    {...props}
  >
    {children}
  </div>
);

export const BannerParagraph: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div
    style={{
      flexShrink: 0,
      color: '#000',
      textAlign: 'right',
      fontFamily: 'Ravi',
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '35px',
      marginBottom: 16,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
    }}
    {...props}
  >
    {children}
  </div>
);

interface EventInfoProps {
  name: string;
  description: string;
  tags: string[];
  address: string;
  time: string;
  programs: Program[];
  images?: string[];
  brands?: string[];
}

const EventInfo: React.FC<EventInfoProps> = ({
  name,
  description,
  tags,
  address,
  time,
  programs,
  images,
  brands,
}) => (
  <div style={{ width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
      <BannerTitle>{name}</BannerTitle>
    </div>
    <BannerParagraph>
      {description}
    </BannerParagraph>
    <div style={{ display: 'flex', gap: 8, marginBottom: 24, marginTop: 12 }}>
      {tags.map((tag, idx) => (
        <BazaarcheButton key={idx}>{tag}</BazaarcheButton>
      ))}
    </div>
    {/* نمایش تصاویر */}
    {images && images.length > 0 && (
      <div className="custom-image-row">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`event-image-${idx}`}
            style={{
              width: '180px',
              height: '120px',
              objectFit: 'cover',
              borderRadius: 16,
              marginLeft: idx !== 0 ? 16 : 0
            }}
          />
        ))}
      </div>
    )}
    <BannerTitle style={{ color: '#F26430', marginTop: 24, marginBottom: 12 }}>:آدرس</BannerTitle>
    <BannerParagraph className="address-text" style={{ marginBottom: 16 }}>{address}</BannerParagraph>
    <BannerTitle style={{ color: '#F26430', marginTop: 24, marginBottom: 12 }}>:تاریخ</BannerTitle>
    <BannerParagraph style={{ marginBottom: 32 }}>{time}</BannerParagraph>
    {/* برنامه‌ها */}
    {programs && programs.length > 0 && (
      <>
        <BannerTitle style={{ color: '#F26430', marginBottom: 24 }}>:برنامه‌ها</BannerTitle>
        {programs.map((program, idx) => (
          <div key={idx} style={{ width: '100%', textAlign: 'right', marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
              <OrangeCapsule>{program.capsule}</OrangeCapsule>
            </div>
            <BannerParagraph>{program.description}</BannerParagraph>
          </div>
        ))}
      </>
    )}
    {/* برندها */}
    {brands && brands.length > 0 && (
      <>
        <BannerTitle style={{ color: '#F26430', marginBottom: 24 }}>:برندها</BannerTitle>
        <BannerParagraph>
          {brands.join('، ')}
        </BannerParagraph>
      </>
    )}
    {/* استایل ریسپانسیو برای custom-image-row */}
    <style jsx>{`
      .custom-image-row {
        display: flex;
        flex-direction: row;
        gap: 16px;
        margin-bottom: 24px;
        justify-content: flex-end;
      }
      @media (max-width: 700px) {
        .custom-image-row {
          flex-direction: column;
          gap: 12px;
          align-items: flex-end;
        }
        .custom-image-row img {
          width: 100% !important;
          max-width: 350px;
          height: auto !important;
        }
      }
    `}</style>
  </div>
);

export default EventInfo; 