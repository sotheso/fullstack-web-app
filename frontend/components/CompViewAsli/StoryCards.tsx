import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import EventCard from './EventCard';
import SectionTitle from './CompDetails/Text/SectionTitle';
import { useStories } from '../../Functions/useStories';

const EventCardCarousel: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<undefined | boolean>(undefined);

  const { stories, loading, error } = useStories();
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile === undefined) return null;
  
  const skeletonCount = 6;
  
  if (stories.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        هیچ استوری‌ای یافت نشد
      </div>
    );
  }

  const cardWidth = 280; // Slightly increased from 280.37
  const cardHeight = 498; // Slightly increased from 400
  const cardGap = 30;

  return (
    <div style={{
      width: '100%',
      overflowX: 'auto', // Enable horizontal scrolling
      overflowY: 'visible',
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
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton {
          background: linear-gradient(90deg, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.18) 37%, rgba(255,255,255,0.08) 63%);
          background-size: 400% 100%;
          animation: shimmer 1.4s ease-in-out infinite;
        }
      `}</style>
      <div 
        ref={scrollContainerRef}
        style={{
          width: '100%',
          overflowX: 'auto', // Enable horizontal scrolling
          overflowY: 'hidden',
          direction: 'rtl', // Set direction to right-to-left
          // Hide scrollbar
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        }}
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '24px',
          margin: '16px 0',
          width: '100%'
        }}>
          {/* Cards Container - Horizontally scrollable from right to left */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end', // Start from right side
            alignItems: 'center',
            minHeight: `${cardHeight}px`,
            overflow: 'visible',
            position: 'relative',
            width: '100%',
            paddingLeft: isMobile ? '0px' : '40px',
            paddingRight: isMobile ? '0px' : '0px', // No right padding on mobile
            boxSizing: 'border-box',
            direction: 'ltr', // Reset direction for the cards container
          }}>
            <div 
              style={{
                display: 'flex',
                gap: `${cardGap}px`,
                width: `${(loading ? skeletonCount : stories.length) * (cardWidth + cardGap)}px`,
                flexShrink: 0,
                overflow: 'visible',
                transform: 'translateX(0)', // Start position
              }}
            >
              {loading
                ? Array.from({ length: skeletonCount }).map((_, idx) => (
                    <div
                      key={`skeleton-${idx}`}
                      className="skeleton"
                      style={{
                        width: `${cardWidth}px`,
                        height: `${cardHeight}px`,
                        background: '#F26430',
                        borderRadius: '24px',
                        position: 'relative',
                        flexShrink: 0,
                        overflow: 'hidden',
                      }}
                    />
                  ))
                : stories.map((story, idx) => (
                    <div 
                      key={story.id} 
                      style={{
                        width: `${cardWidth}px`,
                        height: `${cardHeight}px`,
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
                      onClick={() => router.push('/details')}
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
        </div>
      </div>
      
      {/* Navigation buttons - placed below the carousel */}
      <div style={{
        width: '100%',
        display: 'flex',
        gap: '12px',
        justifyContent: isMobile ? 'center' : 'flex-end',
        paddingLeft: isMobile ? '20px' : '94px',
        paddingRight: isMobile ? '20px' : '94px',
        boxSizing: 'border-box',
      }}>
        <button
          onClick={() => {
            if (scrollContainerRef.current) {
              const scrollAmount = 200; // Reduced scroll amount
              scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
          }}
          style={{
            width: '48px',
            height: '48px',
            background: '#F26430',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(242, 100, 48, 0.3)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button
          onClick={() => {
            if (scrollContainerRef.current) {
              const scrollAmount = 200; // Reduced scroll amount
              scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
          }}
          style={{
            width: '48px',
            height: '48px',
            background: '#F26430',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(242, 100, 48, 0.3)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      
    </div>
  );
};

export default EventCardCarousel; 