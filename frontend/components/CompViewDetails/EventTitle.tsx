import React from 'react';

interface EventTitleProps {
  title: string;
}

const EventTitle: React.FC<EventTitleProps> = ({ title }) => {
  return (
    <>
      <style jsx>{`
        .event-title {
          display: flex;
          width: 100%;
          min-height: 15px;
          flex-direction: column;
          justify-content: center;
          flex-shrink: 0;
          color: #F26430;
          text-align: right;
          font-family: Ravi;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          white-space: nowrap;
        }
        
        @media (min-width: 768px) {
          .event-title {
            font-size: 18px;
            min-height: 20px;
          }
        }
        
        @media (min-width: 1024px) {
          .event-title {
            font-size: 20px;
            min-height: 24px;
          }
        }
      `}</style>
      <div className="event-title">
        {title}
      </div>
    </>
  );
};

export default EventTitle;
