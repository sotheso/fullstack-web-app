import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import SectionTitle from './CompDetails/Text/SectionTitle';
import { useCarousel } from '../../Functions/useCarousel';

const EventCardCarousel: React.FC = () => {
  const [isMobile, setIsMobile] = useState<undefined | boolean>(undefined);
  // مقدار اولیه امن برای جلوگیری از خطای هوک
  const { currentIndex, goToPrevious, goToNext, setCurrentIndex } = useCarousel(0, 3500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 9 total cards
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const cardWidth = 350.462;
  const cardGap = 30;
  // Desktop: 3 at a time, Mobile: 1 at a time
  const cardsPerView = isMobile ? 1 : 3;
  const sidePeek = isMobile ? 30 : 60; // مقدار دیده شدن کارت بعدی/قبلی
  const visibleCardsWidth = (cardWidth * cardsPerView) + (cardGap * (cardsPerView - 1)) - (2 * sidePeek);
  const maxIndex = cards.length - cardsPerView;

  // وقتی مقدار واقعی isMobile مشخص شد، مقدار maxIndex را ست کن
  useEffect(() => {
    if (isMobile !== undefined) {
      setCurrentIndex(0); // همیشه به اول برگردد
    }
  }, [isMobile, setCurrentIndex]);

  if (isMobile === undefined) return null;

  // Check if buttons should be disabled
  const isPreviousDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === maxIndex;

  return (
    <div style={{
      width: '100%',
      overflowX: 'hidden', // جلوگیری از اسکرول افقی
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: '24px',
        margin: '32px 0',
        width: '100%'
      }}>
        {/* Cards Container - Show visible cards */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          minHeight: '620.953px',
          overflow: 'visible',
          position: 'relative',
          width: '100vw', // تغییر داده شد
        }}>
          <div 
            style={{
              display: 'flex',
              gap: `${cardGap}px`,
              transform: `translateX(-${currentIndex * (cardWidth + cardGap)}px)` ,
              transition: 'transform 0.5s ease-in-out',
              width: `${cards.length * (cardWidth + cardGap)}px`,
              flexShrink: 0,
              overflow: 'visible',
            }}
          >
            {cards.map((cardId, idx) => (
              <div 
                key={cardId} 
                style={{
                  width: `${cardWidth}px`,
                  height: '620.953px',
                  background: '#F26430',
                  borderRadius: '24px',
                  position: 'relative',
                  flexShrink: 0,
                  transform: 'scale(1)',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {/* Gray circle in bottom-left corner */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#F3F4F6',
                  borderRadius: '9999px',
                  flexShrink: 0,
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px'
                }} />
              </div>
            ))}
          </div>
        </div>
        {/* Navigation Buttons - Below Cards */}
        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-start',
          marginTop: '16px',
          width: '100%',
          paddingLeft: '94px',
          paddingRight: '94px',
          boxSizing: 'border-box'
        }}>
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            disabled={isPreviousDisabled}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              width: '48px',
              height: '48px',
              background: isPreviousDisabled ? '#E5E7EB' : '#F3F4F6',
              borderRadius: '9999px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isPreviousDisabled ? 'not-allowed' : 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s ease',
              opacity: isPreviousDisabled ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (!isPreviousDisabled) {
                e.currentTarget.style.background = '#E5E7EB';
                e.currentTarget.style.transform = 'scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isPreviousDisabled) {
                e.currentTarget.style.background = '#F3F4F6';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke={isPreviousDisabled ? "#999" : "#666"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* Right Arrow */}
          <button
            onClick={goToNext}
            disabled={isNextDisabled}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              width: '48px',
              height: '48px',
              background: isNextDisabled ? '#E5E7EB' : '#F3F4F6',
              borderRadius: '9999px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isNextDisabled ? 'not-allowed' : 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s ease',
              opacity: isNextDisabled ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (!isNextDisabled) {
                e.currentTarget.style.background = '#E5E7EB';
                e.currentTarget.style.transform = 'scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isNextDisabled) {
                e.currentTarget.style.background = '#F3F4F6';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke={isNextDisabled ? "#999" : "#666"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCardCarousel; 