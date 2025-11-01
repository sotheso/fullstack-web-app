import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import RoundIconButton from './CompDetails/ButtonCard/RoundIconButton';
import DateButton from './CompDetails/ButtonCard/DateButton';
import { EventCardData } from '../../Functions/eventCardInfo';

interface EventCardProps {
  eventData?: EventCardData;
  onFilter?: (filterTag: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ eventData, onFilter }) => {
  const router = useRouter();
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // Default data if no props provided
  const defaultData: EventCardData = {
    id: 'default-event',
    image: '/banner.png',
    eventName: 'ایونت بساط',
    description: 'وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه!',
    date: 'پنجشنبه، ۲۴ فروردین',
    tags: ['بازارچه'],
    filterTag: 'بازارچه',
    detailsLink: '/details'
  };

  const data = eventData || defaultData;

  // Dynamically reduce title font-size for very long titles so the action button stays in place
  const computeTitleFontSize = (titleText: string): string => {
    const titleLength = (titleText || '').length;
    // Primary rule requested: if > 20 characters, shrink
    if (titleLength > 28) return '0.8125rem';
    if (titleLength > 20) return '0.875rem';
    return '0.9375rem';
  };

  // Title font-size state with dynamic fitting logic
  const [titleFontSize, setTitleFontSize] = useState<string>(
    computeTitleFontSize(data.eventName)
  );
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const isMountedRef = useRef(true);
  const rafRef = useRef<number | null>(null);

  // Recompute base font-size when event title changes
  useEffect(() => {
    setTitleFontSize(computeTitleFontSize(data.eventName));
  }, [data.eventName]);

  // Shrink the title font-size only if it overflows (shows ellipsis)
  useEffect(() => {
    isMountedRef.current = true;
    
    const shrinkToFit = () => {
      const el = titleRef.current;
      if (!el || !isMountedRef.current) return;

      const parseRem = (rem: string): number => parseFloat(rem.replace('rem', '')) || 0.9375;
      let current = parseRem(getComputedStyle(el).fontSize.endsWith('rem') ? getComputedStyle(el).fontSize : titleFontSize);
      if (!current) current = parseRem(titleFontSize);

      const minRem = 0.75; // hard lower bound
      const step = 0.0625; // 1px at 16px base
      let guard = 12;

      // Reduce until fits or we hit min size/guard
      while (el.scrollWidth > el.clientWidth && current > minRem && guard > 0) {
        current = Math.max(minRem, current - step);
        el.style.fontSize = `${current}rem`;
        guard -= 1;
      }

      // Persist final size so future renders keep it
      if (isMountedRef.current) {
        setTitleFontSize(`${current}rem`);
      }
    };

    // Run after layout with requestAnimationFrame
    rafRef.current = requestAnimationFrame(shrinkToFit);
    
    const handleResize = () => {
      if (isMountedRef.current) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(shrinkToFit);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      isMountedRef.current = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [titleFontSize, data.eventName]);

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // ارسال ID ایونت به صفحه details
    router.push(`${BASE_PATH}/details?id=${data.id}`);
  };

  return (
    <div
      className="event-card event-card-wrapper"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'stretch',
        maxWidth: '100%',
        minHeight: '11.5rem',
        flexShrink: 0,
        borderRadius: '1.5rem',
        background: '#FCFCFC',
        padding: 0,
        marginLeft: '-20px',
        marginRight: '-20px',
        width: 'calc(100% + 40px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
        cursor: 'pointer',
        direction: 'ltr',
      }}
      onClick={handleViewClick}
    >
      {/* Right column: Banner with fixed size */}
      <div style={{
        position: 'relative',
        width: '7.625rem',
        height: '9.5625rem',
        flexShrink: 0,
        // Add right margin for spacing from card edge
        margin: '1.25rem 1.25rem 1.25rem 1.25rem',
        overflow: 'hidden',
        borderRadius: '0.75rem',
      }}>
        <div
          className="event-card-image"
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: data.image?.startsWith('/')
              ? `url('${BASE_PATH}${data.image}')`
              : `url('${data.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#D4B5A8',
          }}
        />
      </div>

      {/* Left column: Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '1.25rem',
        direction: 'rtl',
      }}>
        {/* Top Row: Title and مشاهده button */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          columnGap: '0.5rem',
          width: '100%',
          minWidth: 0,
        }}>
          {/* Title */}
          <h3 ref={titleRef} style={{
            color: '#000',
            textAlign: 'right',
            fontFamily: 'Ravi',
            fontSize: titleFontSize,
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
            margin: 0,
            flex: '1 1 auto',
            minWidth: 0, // allow shrinking so ellipsis works and button stays fixed
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {data.eventName}
          </h3>

          {/* مشاهده button */}
          <button
            onClick={handleViewClick}
            style={{
              padding: '0rem',
              background: 'transparent',
              color: '#F26430',
              textAlign: 'justify',
              fontFamily: 'Ravi',
              fontSize: '0.804rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0, // don't let the button shrink or move
              minWidth: '48px', // reserve space so title never pushes it
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#E55A2B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#F26430';
            }}
          >
            مشاهده
          </button>
        </div> 

{/* تست    */}

        {/* Divider Line */}
        <div style={{
          width: '100%',
          height: '1px',
          background: '#E8E8E8',
          margin: '0.5rem 0 0.5rem 0',
        }} />

        {/* Description */}
        <p style={{
          margin: '0 0 0.125rem 0',
          fontSize: '0.8125rem',
          color: '#000',
          fontFamily: 'Ravi',
          fontWeight: 300,
          lineHeight: '1.5',
          display: '-webkit-box',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {data.description}
        </p>

        {/* Info Items */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.3125rem',
          marginTop: 'auto',
        }}>
          {/* Date */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.875rem',
            color: '#888',
            fontFamily: 'Ravi',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="7.99984" cy="8.00002" r="6" stroke="#AEAEAE" strokeWidth="1.33333"/>
              <path d="M11 8.00002H8.16667C8.07462 8.00002 8 7.9254 8 7.83335V5.66669" stroke="#AEAEAE" strokeWidth="1.33333" strokeLinecap="round"/>
            </svg>
            <span>{data.date}</span>
          </div>

          {/* Location - if available */}
          {data.tags && data.tags.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontSize: '0.875rem',
              color: '#888',
              fontFamily: 'Ravi',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9.00049 2.99969L9.00053 2.33303H9.00049V2.99969ZM14.2505 8.24969H14.9172V8.24965L14.2505 8.24969ZM9.26514 14.8698L9.56956 15.4629L9.56978 15.4628L9.26514 14.8698ZM8.73486 14.8698L8.43022 15.4628L8.43022 15.4628L8.73486 14.8698ZM3.75049 8.24969L3.08382 8.24965V8.24969H3.75049ZM8.99951 5.99969V5.33303H8.99938L8.99951 5.99969ZM6.74951 8.24969L6.08284 8.2496V8.24969H6.74951ZM8.99951 10.4997L8.99938 11.1664H8.99951V10.4997ZM11.2495 8.24969H11.9162V8.2496L11.2495 8.24969ZM9.00049 2.99969L9.00045 3.66636C11.5315 3.66652 13.5837 5.71866 13.5838 8.24974L14.2505 8.24969L14.9172 8.24965C14.917 4.98226 12.2679 2.33323 9.00053 2.33303L9.00049 2.99969ZM14.2505 8.24969H13.5838C13.5838 9.90588 12.7318 11.2642 11.6867 12.3077C10.6427 13.3503 9.46421 14.018 8.96049 14.2768L9.26514 14.8698L9.56978 15.4628C10.1328 15.1736 11.4469 14.4315 12.6289 13.2512C13.8099 12.0718 14.9172 10.3941 14.9172 8.24969H14.2505ZM9.26514 14.8698L8.96072 14.2767C8.96874 14.2726 8.98251 14.2682 8.99993 14.2682C9.01736 14.2682 9.03128 14.2726 9.03951 14.2768L8.73486 14.8698L8.43022 15.4628C8.79046 15.6479 9.20977 15.6476 9.56956 15.4629L9.26514 14.8698ZM8.73486 14.8698L9.03951 14.2768C8.53581 14.018 7.35754 13.3503 6.31377 12.3078C5.26902 11.2642 4.41715 9.90591 4.41715 8.24969H3.75049H3.08382C3.08382 10.394 4.19076 12.0717 5.3715 13.2511C6.55322 14.4315 7.86715 15.1735 8.43022 15.4628L8.73486 14.8698ZM3.75049 8.24969L4.41715 8.24974C4.41731 5.71851 6.46933 3.66636 9.00049 3.66636V2.99969V2.33303C5.73287 2.33303 3.08402 4.98219 3.08382 8.24965L3.75049 8.24969ZM8.99951 5.99969L8.99938 5.33303C7.38902 5.33336 6.08308 6.63912 6.08284 8.2496L6.74951 8.24969L7.41618 8.24979C7.41631 7.37561 8.12538 6.66654 8.99965 6.66636L8.99951 5.99969ZM6.74951 8.24969H6.08284C6.08284 9.8605 7.389 11.166 8.99938 11.1664L8.99951 10.4997L8.99965 9.83303C8.12517 9.83285 7.41618 9.12385 7.41618 8.24969H6.74951ZM8.99951 10.4997V11.1664C10.6103 11.1664 11.9162 9.86053 11.9162 8.24969H11.2495H10.5828C10.5828 9.12415 9.87396 9.83303 8.99951 9.83303V10.4997ZM11.2495 8.24969L11.9162 8.2496C11.9159 6.6391 10.6103 5.33303 8.99951 5.33303V5.99969V6.66636C9.87375 6.66636 10.5827 7.37532 10.5828 8.24979L11.2495 8.24969Z" fill="#AEAEAE"/>
              </svg>
              <span>{data.tags[0]}</span>
            </div>
          )}

          {/* Rating
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.719rem',
            color: '#F59E0B',
            fontFamily: 'Ravi',
            fontWeight: 500,
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6.76241 4.4184C7.28681 3.11106 7.54901 2.4574 7.9999 2.4574C8.45078 2.4574 8.71298 3.11106 9.23739 4.4184L9.26181 4.47927C9.55807 5.21785 9.7062 5.58714 10.0081 5.8116C10.31 6.03606 10.7063 6.07155 11.4989 6.14254L11.6422 6.15537C12.9394 6.27155 13.588 6.32963 13.7268 6.74229C13.8656 7.15494 13.3839 7.59317 12.4205 8.46963L12.099 8.76215C11.6114 9.20583 11.3675 9.42767 11.2539 9.71842C11.2327 9.77265 11.215 9.82822 11.2011 9.88476C11.1264 10.1879 11.1978 10.5097 11.3406 11.1533L11.3851 11.3537C11.6475 12.5366 11.7787 13.128 11.5496 13.3831C11.464 13.4785 11.3527 13.5471 11.2291 13.5808C10.8983 13.6711 10.4287 13.2884 9.48937 12.523C8.87259 12.0204 8.5642 11.7691 8.21013 11.7126C8.07086 11.6903 7.92894 11.6903 7.78967 11.7126C7.4356 11.7691 7.12721 12.0204 6.51043 12.523C5.57113 13.2884 5.10148 13.6711 4.77068 13.5808C4.64706 13.5471 4.53579 13.4785 4.45018 13.3831C4.22106 13.128 4.35228 12.5366 4.61473 11.3537L4.65918 11.1533C4.80199 10.5097 4.87339 10.1879 4.79869 9.88476C4.78475 9.82822 4.76713 9.77265 4.74593 9.71842C4.63228 9.42767 4.38844 9.20583 3.90077 8.76215L3.57925 8.46963C2.61589 7.59317 2.13421 7.15494 2.27299 6.74229C2.41178 6.32963 3.06038 6.27155 4.35759 6.15537L4.50088 6.14254C5.29349 6.07155 5.6898 6.03606 5.9917 5.8116C6.2936 5.58714 6.44173 5.21785 6.73799 4.47927L6.76241 4.4184Z" stroke="#FFB200" strokeWidth="1.33333"/>
            </svg>
            <span>۴.۵ ستاره از۸۴ نظر</span>
          </div> */}

          
        </div>
      </div>

      <style jsx>{`
        /* Title font-size is controlled inline to allow dynamic sizing */
        
        @media (max-width: 43.75rem) {
          .event-card {
            width: calc(100% + 40px) !important;
            max-width: calc(100% + 40px) !important;
            height: auto !important;
            min-height: 8.75rem !important;
          }
          .event-card > div:first-child {
            margin: 1.25rem 1.25rem 1.25rem 0rem !important; /* restore margin on mobile */
          }
        }
        
        @media (min-width: 43.76rem) {
          .event-card {
            width: calc(100% + 40px) !important;
            max-width: calc(100% + 40px) !important;
          }
          .event-card > div:first-child {
            margin: 1.25rem 1.25rem 1.25rem 0rem !important; /* restore margin on desktop */
          }
          .event-card > div:last-child > div:nth-child(2) {
            margin: 0.125rem 0 0.5rem 0 !important;
          }
          .event-card h3 {
            font-size: 1.1rem !important; /* larger title on desktop */
          }
          .event-card button {
            font-size: 0.7rem !important; /* larger button text on desktop */
          }
        }
      `}</style>
    </div>
  );
};

export default EventCard;