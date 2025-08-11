import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import SectionTitle from './CompDetails/Text/SectionTitle';
import { getStoryCardsInfo, StoryCardData } from '../../Functions/storyCardsInfo';

const EventCardCarousel: React.FC = () => {
  const [isMobile, setIsMobile] = useState<undefined | boolean>(undefined);
  const [stories, setStories] = useState<StoryCardData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Get stories data
    const storiesData = getStoryCardsInfo();
    setStories(storiesData);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile === undefined || stories.length === 0) return null;

  const cardWidth = 350.462;
  const cardGap = 30;

  return (
    <div style={{
      width: '100%',
      overflowX: 'auto', // Enable horizontal scrolling
      overflowY: 'hidden',
      direction: 'rtl', // Set direction to right-to-left
      // Hide scrollbar
      scrollbarWidth: 'none', // Firefox
      msOverflowStyle: 'none', // IE and Edge
    }}>
      {/* Hide scrollbar for WebKit browsers (Chrome, Safari) */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: '24px',
        margin: '32px 0',
        width: '100%'
      }}>
        {/* Cards Container - Horizontally scrollable from right to left */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end', // Start from right side
          alignItems: 'center',
          minHeight: '620.953px',
          overflow: 'visible',
          position: 'relative',
          width: '100%',
          paddingLeft: '94px',
          paddingRight: '20px', // Reduced from 94px to 20px
          boxSizing: 'border-box',
          direction: 'ltr', // Reset direction for the cards container
        }}>
          <div 
            style={{
              display: 'flex',
              gap: `${cardGap}px`,
              width: `${stories.length * (cardWidth + cardGap)}px`,
              flexShrink: 0,
              overflow: 'visible',
              transform: 'translateX(0)', // Start position
            }}
          >
            {stories.map((story, idx) => (
              <div 
                key={story.id} 
                style={{
                  width: `${cardWidth}px`,
                  height: '620.953px',
                  background: '#F26430',
                  borderRadius: '24px',
                  position: 'relative',
                  flexShrink: 0,
                  transform: 'scale(1)',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={() => setActiveIndex(idx)}
              >
                {/* Gray circle in bottom-right corner with event name */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {/* Event name */}
                  <span style={{
                    color: '#fff',
                    fontSize: '16px',
                    fontFamily: 'Ravi',
                    fontWeight: '600',
                    textAlign: 'right'
                  }}>
                    {story.eventName}
                  </span>
                  {/* Profile circle */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: '#fff',
                    borderRadius: '9999px',
                    flexShrink: 0,
                    backgroundImage: story.profileImage.startsWith('/')
                      ? `url('${BASE_PATH}${story.profileImage}')`
                      : `url('${story.profileImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {activeIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveIndex(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.95)',
              zIndex: 3000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            {/* Back button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(null);
              }}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: 12,
                padding: '8px 14px',
                fontFamily: 'Ravi',
                cursor: 'pointer',
                zIndex: 2,
              }}
            >
              بازگشت
            </button>
            {/* Story content container (stops click bubbling) */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: stories[activeIndex].posterImage.startsWith('/')
                    ? `url('${BASE_PATH}${stories[activeIndex].posterImage}')`
                    : `url('${stories[activeIndex].posterImage}')`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                }}
              />
              {/* Caption at bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  color: '#fff',
                  fontFamily: 'Ravi',
                  fontSize: 16,
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                }}
              >
                {stories[activeIndex].eventName}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCardCarousel; 