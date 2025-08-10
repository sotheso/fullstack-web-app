import React from 'react';
import BazaarcheButton from './CompDetails/ButtonCard/BazaarcheButton';
import RoundIconButton from './CompDetails/ButtonCard/RoundIconButton';
import DateButton from './CompDetails/ButtonCard/DateButton';
import { EventCardData } from '../../Functions/eventCardInfo';

interface EventCardProps {
  eventData?: EventCardData;
}

const EventCard: React.FC<EventCardProps> = ({ eventData }) => {
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
    <div className="event-card" style={{
      position: 'relative', 
      display: 'flex', 
      flexDirection: 'row-reverse', 
      alignItems: 'stretch', 
      width: 349.444, 
      height: 180, 
      flexShrink: 0,
      borderRadius: 24,
      border: '1px solid #EDEDED',
      background: '#FCFCFC',
      padding: 8, 
      gap: 8, 
      boxSizing: 'border-box', 
      overflow: 'hidden',
      paddingBottom: 7,
    }}>
      {/* Right column: Banner and Date */}
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%', minWidth: 120}}>
        {/* Banner with icon placeholder */}
        <div
          style={{
            width: 126.481,
            height: 126.481,
            borderRadius: 27,
            backgroundImage: `url('${data.image}')`,
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
        {/* Date box */}
        <DateButton>{data.date}</DateButton>
      </div>
      {/* Left column: Title, description, bottom row */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingTop: 4}}>
        {/* Title at the top */}
        <EventTitle title={data.eventName} />
        {/* Description */}
        <EventDescription description={data.description} />
        {/* Bottom row: bazarche, stars - Centered */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div>
            {data.tags.map((tag, index) => (
              <BazaarcheButton key={index}>{tag}</BazaarcheButton>
            ))}
          </div>
        </div>
      </div>
      <RoundIconButton>
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.2432 5.77704L6.20262 0.736437L1.16208 5.77704" stroke="white" strokeWidth="1.13" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </RoundIconButton>
    </div>
  );
};

// Description component
const EventDescription: React.FC<{ description: string }> = ({ description }) => (
  <p style={{margin: 0, textAlign: 'right', fontSize: 12, color: '#444', marginBottom: 36}}>
    {description}
  </p>
);

// Title component
const EventTitle: React.FC<{ title: string }> = ({ title }) => (
  <h3 style={{fontWeight: 700, fontSize: 16, margin: 0, textAlign: 'right', marginBottom: 8}}>
    {title}
  </h3>
);

export default EventCard; 