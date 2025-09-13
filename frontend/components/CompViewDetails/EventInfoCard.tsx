import React from 'react';
import EventTitle from './EventTitle';
import EventDescription from './EventDescription';

interface EventInfoCardProps {
  title: string;
  description: string;
  width?: number;
  height?: number;
}

const EventInfoCard: React.FC<EventInfoCardProps> = ({ 
  title, 
  description, 
  width = 300, 
  height = 250 
}) => {
  return (
    <>
      <style jsx>{`
        .event-info-card {
          width: ${width}px;
          max-width: 300px;
          min-height: auto;
          flex-shrink: 0;
          border-radius: 16px;
          border: 1px solid #EDEDED;
          background: #FCFCFC;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: flex-end;
        }
        
        @media (min-width: 768px) {
          .event-info-card {
            width: 80%;
            max-width: 800px;
            min-height: auto;
            padding: 16px;
            gap: 12px;
          }
        }
        
        @media (min-width: 1024px) {
          .event-info-card {
            width: 70%;
            max-width: 1000px;
            min-height: auto;
          }
        }
      `}</style>
      <div className="event-info-card">
        <EventTitle title={title} />
        <EventDescription description={description} />
      </div>
    </>
  );
};

export default EventInfoCard;
