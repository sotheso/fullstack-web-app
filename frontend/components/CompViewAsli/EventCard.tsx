import React from 'react';
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

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = data.detailsLink || '/details';
    if (link.startsWith('/')) {
      router.push(`${BASE_PATH}${link}`);
    } else {
      router.push(link);
    }
  };

  return (
    <div
      className="event-card"
      style={{
      position: 'relative', 
      display: 'flex', 
      flexDirection: 'row-reverse', 
      alignItems: 'stretch', 
      width: 360, 
      height: 145, 
      flexShrink: 0,
      borderRadius: 24,
      border: '1px solid #EDEDED',
      background: '#FCFCFC',
      padding: 8, 
      gap: 8, 
      boxSizing: 'border-box', 
      overflow: 'hidden',
      paddingBottom: 7,
    }}
    >
      {/* Right column: Banner and Date */}
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%', minWidth: 120}}>
        {/* Banner with icon placeholder */}
        <div
          style={{
            width: 126.481,
            height: 126.481,
            borderRadius: 27,
            backgroundImage: data.image?.startsWith('/')
              ? `url('${BASE_PATH}${data.image}')`
              : `url('${data.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scaleX(-1)',
            flexShrink: 0,
            aspectRatio: '126.48/126.48',
            marginBottom: 8,
            backgroundColor: '#E6C7C1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        {/* Date positioned next to the image */}
        <div style={{
          position: 'absolute',
          top: 107,
          right: 140,
          zIndex: 1,
        }}>
          <DateButton>{data.date}</DateButton>
        </div>
        
        {/* Divider line below description */}
        <div style={{
          position: 'absolute',
          top: 100,
          left: 15,
          width: '200px',
          height: '1px',
          background: '#E0E0E0',
          zIndex: 1,
        }} />
      </div>
      {/* Left column: Title, description, bottom row */}
      <div className="event-left-col" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
        paddingTop: 4,
        gap: 8,
        minWidth: 0,
      }}>
        {/* Title at the top */}
        <EventTitle title={data.eventName} />
        {/* Description */}
        <EventDescription description={data.description} />
        {/* View button instead of round icon */}
        <div style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          zIndex: 2,
        }}>
          <button
            onClick={handleViewClick}
            style={{
              padding: '6px 12px',
              background: 'transparent',
              color: '#F26430',
              border: 'none',
              fontSize: '12px',
              fontFamily: 'Ravi',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'color 0.2s ease',
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
      </div>
      <style jsx>{`
        @media (max-width: 700px) {
          .event-card { height: 145px !important; }
          .event-left-col { gap: 4px; }
          .event-description { margin-bottom: 4px !important; }
        }
      `}</style>
    </div>
  );
};

// Description component
const EventDescription: React.FC<{ description: string }> = ({ description }) => (
  <p
    className="event-description"
    style={{
      margin: 0,
      textAlign: 'justify',
      textAlignLast: 'right',
      fontSize: 12,
      color: '#444',
      marginBottom: 24,
      display: '-webkit-box',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitLineClamp: 2 as unknown as number,
      WebkitBoxOrient: 'vertical' as unknown as any,
      lineHeight: '16px',
      maxHeight: '32px',
    }}
  >
    {description}
  </p>
);

// Title component
const EventTitle: React.FC<{ title: string }> = ({ title }) => (
  <h3
    style={{
      fontWeight: 700,
      fontSize: 16,
      margin: 0,
      textAlign: 'justify',
      textAlignLast: 'right',
      marginBottom: 8,
      display: '-webkit-box',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitLineClamp: 2 as unknown as number,
      WebkitBoxOrient: 'vertical' as unknown as any,
      lineHeight: '18px',
      maxHeight: '36px',
    }}
  >
    {title}
  </h3>
);

export default EventCard; 

/* Mobile spacing tweaks */
<style jsx>{`
  @media (max-width: 700px) {
    .event-left-col { gap: 8px; }
    .event-description { margin-bottom: 6.5px !important; }
  }
`}</style>