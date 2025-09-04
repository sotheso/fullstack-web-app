import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const TopBar: React.FC = () => {
  const router = useRouter();
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const decide = () => setIsMobile(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    decide();
    window.addEventListener('resize', decide);
    return () => window.removeEventListener('resize', decide);
  }, []);

  const Item: React.FC<{ label: string; onClick?: () => void; icon?: React.ReactNode; circleStyle?: React.CSSProperties }>
    = ({ label, onClick, icon, circleStyle }) => (
    <button
      onClick={onClick}
      style={{
        background: 'transparent',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontFamily: 'Ravi',
      }}
    >
      <div
        style={{
          width: 58,
          height: 58,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          ...circleStyle,
        }}
      >
        {icon}
      </div>
      {!isMobile && <span style={{ color: '#000', fontSize: 12, marginTop: 6 }}>{label}</span>}
    </button>
  );

  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 16,
        zIndex: 1000,
        width: isMobile ? 220 : 242,
        height: isMobile ? 70 : 95,
        borderRadius: isMobile ? 9999 : 16,
        background: 'rgba(255, 255, 255, 0.10)',
        boxShadow: '0 -1px 24px 0 rgba(0, 0, 0, 0.12)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.64)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '8px 8px 8px' : '4px 9px 8px',
      }}
    >
      <div style={{ display: 'flex', gap: isMobile ? 0 : 12 }}>
        <Item
          label="دعوت"
          onClick={() => router.push(`${BASE_PATH}/`)}
          circleStyle={{ background: '#F26430', boxShadow: '0 0 0 1px rgba(237,237,237,0.8)' }}
          icon={
            <Image
              src={`${BASE_PATH}/IMG_4885.PNG`}
              alt="Davvat"
              fill
              style={{ objectFit: 'contain', borderRadius: 999 }}
            />
          }
        />
        <Item
          label="ایونت ها"
          onClick={() => router.push(`${BASE_PATH}/`)}
          circleStyle={{ borderRadius: 54.925, border: '1px solid #EDEDED', background: '#F3F3F3' }}
          icon={
            <div style={{ width: 24, height: 24}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M19.202 3.94484C14.3852 3.47379 9.53401 3.47379 4.71725 3.94484C4.284 3.98721 3.91916 4.28435 3.78585 4.69502C3.25433 6.33239 3.25433 8.11851 3.78585 9.75588C3.91916 10.1665 4.284 10.4637 4.71725 10.5061C9.53401 10.9771 14.3852 10.9771 19.202 10.5061C19.6353 10.4637 20.0001 10.1665 20.1334 9.75588C20.6649 8.11851 20.6649 6.33239 20.1334 4.69502C20.0001 4.28435 19.6353 3.98721 19.202 3.94484Z" fill="#F26430"/>
                <path d="M19.202 13.4128C14.3852 12.9417 9.53401 12.9417 4.71725 13.4128C4.284 13.4551 3.91916 13.7523 3.78585 14.1629C3.25433 15.8003 3.25433 17.5864 3.78585 19.2238C3.91916 19.6345 4.284 19.9316 4.71725 19.974C9.53401 20.445 14.3852 20.445 19.202 19.974C19.6353 19.9316 20.0001 19.6345 20.1334 19.2238C20.6649 17.5864 20.6649 15.8003 20.1334 14.1629C20.0001 13.7523 19.6353 13.4551 19.202 13.4128Z" fill="#F26430"/>
              </svg>
            </div>
          }
        />
        <Item
          label="پروفایل"
          onClick={() => router.push(`${BASE_PATH}/`)}
          circleStyle={{ borderRadius: 54.925, border: '1px solid #EDEDED', background: '#F3F3F3' }}
          icon={
            <div style={{ width: 24, height: 24}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Z" fill="#F26430"/>
                <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6v1H4v-1Z" fill="#F26430"/>
              </svg>
            </div>
          }
        />
      </div>
      
    </div>
  );
};

export default TopBar;