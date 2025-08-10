import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import SectionTitle from './CompDetails/Text/SectionTitle';
import { getStoryCardsInfo, StoryCardData } from '../../Functions/storyCardsInfo';

const EventCardCarousel: React.FC = () => {
  const [isMobile, setIsMobile] = useState<undefined | boolean>(undefined);
  const [stories, setStories] = useState<StoryCardData[]>([]);

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
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
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
                    backgroundImage: `url('${story.profileImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardCarousel; 