import React from 'react';
import { useRouter } from 'next/router';
import BazaarcheButton from './CompDetails/ButtonCard/BazaarcheButton';
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

  return (
    <div
      className="event-card"
      onClick={() => {
        const link = data.detailsLink || '/details';
        if (link.startsWith('/')) {
          router.push(`${BASE_PATH}${link}`);
        } else {
          router.push(link);
        }
      }}
      style={{
      position: 'relative', 
      display: 'flex', 
      flexDirection: 'row-reverse', 
      alignItems: 'stretch', 
      width: 349.444, 
      height: 185, 
      flexShrink: 0,
      borderRadius: 24,
      border: '1px solid #EDEDED',
      background: '#FCFCFC',
      padding: 8, 
      gap: 8, 
      boxSizing: 'border-box', 
      overflow: 'hidden',
      cursor: 'pointer',
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
        {/* Date directly below the image */}
        <div style={{marginTop: 2}}>
          <DateButton>{data.date}</DateButton>
        </div>
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
        {/* Bottom row: tags - anchored to bottom; padding responsive via CSS */}
        <div className="event-tags" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', width: '100%', marginTop: 'auto'}}>
          <div style={{maxWidth: '100%', overflow: 'hidden', width: '100%', textAlign: 'right', display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end'}}>
            {data.tags.map((tag, index) => (
              <BazaarcheButton
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onFilter) onFilter(data.filterTag);
                }}
              >
                {tag}
              </BazaarcheButton>
            ))}
          </div>
        </div>
      </div>
      <RoundIconButton>
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.2432 5.77704L6.20262 0.736437L1.16208 5.77704" stroke="white" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </RoundIconButton>
      <style jsx>{`
        .event-tags { padding-bottom: 6px; }
        @media (max-width: 700px) {
          .event-card { height: 190px !important; }
          .event-left-col { gap: 4px; }
          .event-description { margin-bottom: 4px !important; }
          .event-tags { margin-top: 2px; padding-bottom: 8px; }
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
      textAlign: 'right',
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
      textAlign: 'right',
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