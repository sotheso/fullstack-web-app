import React from 'react';
import BazaarcheButton from './CompDetails/ButtonCard/BazaarcheButton';
import RoundIconButton from './CompDetails/ButtonCard/RoundIconButton';
import DateButton from './CompDetails/ButtonCard/DateButton';

const EventCard: React.FC = () => {
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
            backgroundImage: "url('/banner.png')",
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
        <DateButton>پنجشنبه، ۲۴ فروردین</DateButton>
      </div>
      {/* Left column: Title, description, bottom row */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingTop: 4}}>
        {/* Title at the top */}
        <EventTitle />
        {/* Description */}
        <EventDescription />
        {/* Bottom row: bazarche, stars - Centered */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div>
            <BazaarcheButton>بازارچه</BazaarcheButton>
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
const EventDescription: React.FC = () => (
  <p style={{margin: 0, textAlign: 'right', fontSize: 12, color: '#444', marginBottom: 36}}>
    وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه!
  </p>
);

// Title component
const EventTitle: React.FC = () => (
  <h3 style={{fontWeight: 700, fontSize: 16, margin: 0, textAlign: 'right', marginBottom: 8}}>
    ایونت بساط
  </h3>
);

export default EventCard; 