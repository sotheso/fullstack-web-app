import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const TopBar: React.FC = () => {
  const router = useRouter();
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // تشخیص تب فعال
  const getActiveTab = () => {
    const path = router.pathname;
    if (path === '/') return 'home';
    if (path === '/events') return 'calendar';
    if (path === '/bookmarks') return 'bookmark';
    if (path === '/profile') return 'profile';
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

  // Handle scroll behavior for mobile
  useEffect(() => {
    if (!isClient || !isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // اگر اسکرول بیش از 10px تغییر کرده باشه
      if (Math.abs(currentScrollY - lastScrollY) > 10) {
        // اگر اسکرول به سمت پایین باشه و صفحه اصلی باشه
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        }
        // اگر اسکرول به سمت بالا باشه
        else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient, isMobile, lastScrollY]);

  const Item: React.FC<{
    label: string;
    onClick?: () => void;
    renderIcon?: (isActive: boolean) => React.ReactNode;
  }>
    = ({ label, onClick, renderIcon }) => {
    const isActive = activeTab === label;
    return (
      <button
        className={`tab-bar-item ${isActive ? 'active' : ''}`}
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
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: '4px',
          borderRadius: '8px',
          transition: 'all 0.2s ease',
        }}
      >
        <div style={{
          width: isMobile ? 36 : 42,
          height: isMobile ? 36 : 42,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {renderIcon ? renderIcon(isActive) : null}
        </div>
      </button>
    );
  };

  // Prevent hydration mismatch by using consistent initial state
  // Always render the same structure, but adjust styles based on client state
  const containerStyle = {
    position: 'fixed' as const,
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: isVisible ? 20 : -100,
    zIndex: 9999,
    display: 'flex',
    width: isMobile ? '240px' : '270px',
    height: isMobile ? '52px' : '56px',
    padding: isMobile ? '10px 14px 10px 14px' : '14px 18px 14px 18px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: isMobile ? '16px' : '20px',
    flexShrink: 0,
    borderRadius: '90px',
    background: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 0 8px 0 rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '2px solid rgba(255, 255, 255, 0.30)',
    transition: 'bottom 0.3s ease-in-out',
  };

  const itemsContainerStyle = {
    display: 'flex',
    gap: isMobile ? '12px' : '16px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '0 16px' : '0 24px',
  };

  return (
    <div style={containerStyle}>
      <div style={itemsContainerStyle}>
        <Item
          label="home"
          onClick={() => router.push('/')}
          renderIcon={(isActive) => (
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path d="M17.9995 21.333V28H13.9995V21.333H17.9995ZM15.9995 6.60156C17.4792 6.60156 18.7221 7.66639 21.2065 9.7959L22.5396 10.9385C23.9141 12.1166 24.6013 12.7063 24.9673 13.502C25.3331 14.2975 25.3335 15.2026 25.3335 17.0127V22.667C25.3335 25.1807 25.3331 26.4377 24.5522 27.2188C23.8435 27.9275 22.7427 27.992 20.6665 27.998V21.333C20.6663 19.8604 19.4722 18.667 17.9995 18.667H13.9995C12.5271 18.6673 11.3337 19.8606 11.3335 21.333V27.998C9.25713 27.992 8.15652 27.9275 7.44775 27.2188C6.66675 26.4377 6.6665 25.1809 6.6665 22.667V17.0127C6.6665 15.2025 6.66687 14.2975 7.03271 13.502C7.39866 12.7063 8.08593 12.1166 9.46045 10.9385L10.7935 9.7959C13.2777 7.66655 14.52 6.60172 15.9995 6.60156Z" fill={isActive ? '#F26430' : 'none'} stroke={isActive ? '#F26430' : '#33363F'} strokeWidth="2"/>
            </svg>
          )}
        />
        <Item
          label="calendar"
          onClick={() => router.push('/events')}
          renderIcon={(isActive) => (
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
              <rect x="5.3335" y="6.66669" width="21.3333" height="6.66667" rx="1.33333" fill={isActive ? '#F26430' : 'none'} stroke={isActive ? '#F26430' : '#33363F'} strokeWidth="2.66667" strokeLinejoin="round"/>
              <rect x="5.3335" y="18.6667" width="21.3333" height="6.66667" rx="1.33333" fill={isActive ? '#F26430' : 'none'} stroke={isActive ? '#F26430' : '#33363F'} strokeWidth="2.66667" strokeLinejoin="round"/>
            </svg>
          )}
        />
        <Item
          label="bookmark"
          onClick={() => router.push('/bookmarks')}
          renderIcon={(isActive) => (
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path d="M26.6668 16C26.6668 10.9717 26.6668 8.45751 25.1047 6.89541C25.1047 6.89541 25.1047 6.89541 25.1047 6.89541C23.5426 5.33331 21.0285 5.33331 16.0002 5.33331C10.9718 5.33331 8.45769 5.33331 6.89559 6.89541C6.89559 6.89541 6.89559 6.89541 6.89559 6.89541C5.3335 8.45751 5.3335 10.9717 5.3335 16V24C5.3335 25.2571 5.3335 25.8856 5.72402 26.2761C6.11454 26.6666 6.74308 26.6666 8.00016 26.6666H16.0002C21.0285 26.6666 23.5426 26.6666 25.1047 25.1046C25.1047 25.1046 25.1047 25.1045 25.1047 25.1045C26.6668 23.5425 26.6668 21.0283 26.6668 16Z" fill={isActive ? '#F26430' : 'none'} stroke={isActive ? '#F26430' : '#33363F'} strokeWidth="2.66667"/>
              <path d="M12 13.3333L20 13.3333" stroke={isActive ? '#F26430' : '#33363F'} strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 18.6667H16" stroke={isActive ? '#F26430' : '#33363F'} strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        />
        <Item
          label="profile"
          onClick={() => router.push('/profile')}
          renderIcon={(isActive) => (
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path d="M5.3335 12C5.3335 8.22876 5.3335 6.34315 6.50507 5.17157C7.67664 4 9.56226 4 13.3335 4H18.6668C22.4381 4 24.3237 4 25.4953 5.17157C26.6668 6.34315 26.6668 8.22876 26.6668 12V21.1035C26.6668 24.6812 26.6668 26.4701 25.5411 27.0172C24.4154 27.5643 23.0088 26.4591 20.1955 24.2487L19.2952 23.5413C17.7134 22.2985 16.9225 21.677 16.0002 21.677C15.0779 21.677 14.2869 22.2985 12.7051 23.5413L11.8048 24.2488C8.99156 26.4591 7.58495 27.5643 6.45922 27.0172C5.3335 26.4701 5.3335 24.6812 5.3335 21.1035V12Z" fill={isActive ? '#F26430' : 'none'} stroke={isActive ? '#F26430' : '#33363F'} strokeWidth="2.66667"/>
            </svg>
          )}
        />
      </div>
    </div>
  );
};

export default TopBar;