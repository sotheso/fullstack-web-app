import React from 'react';

interface EventDescriptionProps {
  description: string;
}

const EventDescription: React.FC<EventDescriptionProps> = ({ description }) => {
  return (
    <>
      <style jsx>{`
        .event-description {
          color: #000;
          text-align: right;
          font-family: Ravi;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 1.5;
          width: 100%;
        }
        
        @media (min-width: 768px) {
          .event-description {
            font-size: 15px;
            line-height: 1.6;
          }
        }
        
        @media (min-width: 1024px) {
          .event-description {
            font-size: 16px;
            line-height: 1.7;
          }
        }
      `}</style>
      <div className="event-description">
        {description}
      </div>
    </>
  );
};

export default EventDescription;
