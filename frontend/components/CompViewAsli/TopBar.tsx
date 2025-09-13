import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const TopBar: React.FC = () => {
  const router = useRouter();
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // تشخیص تب فعال
  const getActiveTab = () => {
    const path = router.pathname;
    if (path === '/') return 'دعوت';
    if (path === '/events') return 'ایونت ها';
    if (path === '/login') return 'پروفایل';
    return null;
  };

  const activeTab = getActiveTab();
  const isDetailsPage = router.pathname === '/details';

  useEffect(() => {
    setIsClient(true);
    const decide = () => setIsMobile(window.innerWidth < 768);
    decide();
    window.addEventListener('resize', decide);
    return () => window.removeEventListener('resize', decide);
  }, []);

  const Item: React.FC<{ label: string; onClick?: () => void; icon?: React.ReactNode; circleStyle?: React.CSSProperties }>
    = ({ label, onClick, icon, circleStyle }) => {
    const isActive = activeTab === label;
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Button clicked:', label);
          if (onClick) {
            console.log('Calling onClick for:', label);
            onClick();
          } else {
            console.log('No onClick handler for:', label);
          }
        }}
        style={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontFamily: 'Ravi',
          position: 'relative',
          zIndex: 10,
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
        {isClient && !isMobile && (
          <span style={{ 
            color: isActive ? '#F26430' : '#000', 
            fontSize: 12, 
            marginTop: 6,
            fontWeight: isActive ? 600 : 400
          }}>
            {label}
          </span>
        )}
      </button>
    );
  };

  // Prevent hydration mismatch by using consistent initial state
  // Always render the same structure, but adjust styles based on client state
  const containerStyle = {
    position: 'fixed' as const,
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 16,
    zIndex: 9999,
    width: isClient && isMobile ? 220 : 242,
    height: isClient && isMobile ? 70 : 95,
    borderRadius: isClient && isMobile ? 9999 : 16,
    background: 'rgba(255, 255, 255, 0.10)',
    boxShadow: '0 -1px 24px 0 rgba(0, 0, 0, 0.12)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.64)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isClient && isMobile ? '8px 8px 8px' : '4px 9px 8px',
  };

  const itemsContainerStyle = {
    display: 'flex',
    gap: isClient && isMobile ? 0 : 12,
  };

  return (
    <div style={containerStyle}>
      <div style={itemsContainerStyle}>
        {isDetailsPage ? (
          // دکمه‌های مخصوص صفحه details
          <>
            <Item
              label="پایه ام"
              onClick={() => console.log('میام')}
              circleStyle={{ background: '#F26430', boxShadow: '0 0 0 1px rgba(237,237,237,0.8)' }}
              icon={
                <div style={{ 
                  color: '#FFF',
                  textAlign: 'right',
                  fontFamily: 'Ravi',
                  fontSize: 16,
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%'
                }}>
                  میام
                </div>
              }
            />
            <Item
              label="شیر کردن"
              onClick={() => console.log('شیر کردن')}
              circleStyle={{ borderRadius: 54.925, border: '1px solid #EDEDED', background: '#F3F3F3' }}
              icon={
                <div style={{ width: 24, height: 24}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17.5 2.5C15.8431 2.5 14.5 3.84315 14.5 5.5C14.5 5.76447 14.5342 6.02096 14.5985 6.26526C14.5276 6.2799 14.4577 6.30512 14.3909 6.34157L11.6343 7.84513L8.1279 9.84881C8.09206 9.86929 8.05855 9.89228 8.02747 9.91743C7.58006 9.65224 7.05781 9.5 6.5 9.5C4.84315 9.5 3.5 10.8431 3.5 12.5C3.5 14.1569 4.84315 15.5 6.5 15.5C7.37407 15.5 8.16083 15.1262 8.70915 14.5297L11.6357 16.1556L14.5902 17.7671C14.5313 18.0017 14.5 18.2472 14.5 18.5C14.5 20.1569 15.8431 21.5 17.5 21.5C19.1569 21.5 20.5 20.1569 20.5 18.5C20.5 16.8431 19.1569 15.5 17.5 15.5C16.6356 15.5 15.8565 15.8656 15.3091 16.4506L12.3617 14.843L9.4163 13.2066C9.47101 12.98 9.5 12.7434 9.5 12.5C9.5 11.9603 9.35749 11.4539 9.10805 11.0164L12.3657 9.15486L15.1091 7.65842C15.1762 7.62185 15.2354 7.57653 15.2862 7.52466C15.8347 8.12408 16.6235 8.5 17.5 8.5C19.1569 8.5 20.5 7.15685 20.5 5.5C20.5 3.84315 19.1569 2.5 17.5 2.5Z" fill="#F26430"/>
                  </svg>
                </div>
              }
            />
            <Item
              label="لوکیشن"
              onClick={() => console.log('لوکیشن')}
              circleStyle={{ borderRadius: 54.925, border: '1px solid #EDEDED', background: '#F3F3F3' }}
              icon={
                <div style={{ width: 24, height: 24}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8.75 10C8.75 8.20507 10.2051 6.75 12 6.75C13.7949 6.75 15.25 8.20507 15.25 10C15.25 11.7949 13.7949 13.25 12 13.25C10.2051 13.25 8.75 11.7949 8.75 10Z" fill="#F26430"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.77354 8.87739C4.11718 4.70845 7.60097 1.5 11.7841 1.5H12.216C16.3991 1.5 19.8829 4.70845 20.2265 8.87739C20.4115 11.122 19.7182 13.3508 18.2925 15.0943L13.4995 20.9561C12.7245 21.9039 11.2756 21.9039 10.5006 20.9561L5.70752 15.0943C4.28187 13.3508 3.58852 11.122 3.77354 8.87739ZM12 5.25C9.37665 5.25 7.25 7.37665 7.25 10C7.25 12.6234 9.37665 14.75 12 14.75C14.6234 14.75 16.75 12.6234 16.75 10C16.75 7.37665 14.6234 5.25 12 5.25Z" fill="#F26430"/>
                  </svg>
                </div>
              }
            />
          </>
        ) : (
          // دکمه‌های عادی برای سایر صفحات
          <>
            <Item
              label="دعوت"
              onClick={() => router.push('/')}
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
              onClick={() => router.push('/events')}
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
              onClick={() => router.push('/login')}
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
          </>
        )}
      </div>
      
    </div>
  );
};

export default TopBar;