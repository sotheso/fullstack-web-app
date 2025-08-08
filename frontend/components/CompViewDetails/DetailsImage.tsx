import React, { useState } from 'react';

interface DetailsImageProps {
  images?: (string | { bg?: string; src?: string })[];
}

const defaultImages = [
  { bg: '#F26430' },
  { bg: '#F2C230' },
  { bg: '#30B7F2' },
];

const DetailsImage: React.FC<DetailsImageProps> = ({ images }) => {
  const imgs = images && images.length > 0 ? images : defaultImages;
  const [active, setActive] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const current = imgs[active];
  let bg: string | undefined = undefined;
  let src: string | undefined = undefined;
  if (typeof current === 'string') {
    src = current;
  } else {
    bg = current.bg;
    src = 'src' in current ? current.src : undefined;
  }
  // اگر bg وجود نداشت، رنگ پیش‌فرض بگذار
  if (!bg) bg = '#F26430';

  // اگر عکس تغییر کرد، imgLoaded را false کن
  React.useEffect(() => {
    setImgLoaded(false);
  }, [active, src]);

  return (
    <div
      style={{
        width: '350.462px',
        height: '620.953px',
        flexShrink: 0,
        borderRadius: '19px',
        background: (!src || !imgLoaded) ? bg : undefined,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'background 0.3s',
        overflow: 'hidden',
      }}
    >
      {/* نمایش عکس اگر src وجود داشت و لود شده */}
      {src && (
        <img
          src={src}
          alt={`event-image-${active}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '19px',
            display: imgLoaded ? 'block' : 'none',
          }}
          onLoad={() => setImgLoaded(true)}
        />
      )}
      {/* دایره‌های پایین */}
      <div style={{
        position: 'absolute',
        bottom: 24,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
      }}>
        {imgs.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label={`نمایش اسلاید ${idx + 1}`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="6" r="6" fill={active === idx ? '#FFF' : '#E5E7EB'} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DetailsImage; 