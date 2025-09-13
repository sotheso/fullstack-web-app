import React from 'react';

interface ProgramItem {
  day: string;
  date: string;
  description: string;
}

interface EventProgramCardProps {
  programs: ProgramItem[];
}

const EventProgramCard: React.FC<EventProgramCardProps> = ({ programs }) => {
  return (
    <>
      <style jsx>{`
        .program-card {
          width: 100%;
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
        
        .program-header {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          justify-content: flex-end;
          padding-bottom: 8px;
          border-bottom: 1px solid #EDEDED;
        }
        
        .program-title {
          color: #F26430;
          text-align: right;
          font-family: Ravi;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
        
        
        .program-content {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 0;
        }
        
        .program-item {
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 8px 0;
          border-bottom: 1px solid #F26430;
        }
        
        .program-item:first-child {
          padding-top: 4px;
        }
        
        .program-item:last-child {
          border-bottom: none;
        }
        
        .program-day {
          color: #000;
          text-align: right;
          font-family: Ravi;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 1.4;
          margin-bottom: 4px;
        }
        
        .program-description {
          color: #000;
          text-align: right;
          font-family: Ravi;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 1.4;
        }
        
        @media (min-width: 768px) {
          .program-card {
            width: 80%;
            max-width: 800px;
            padding: 16px;
            gap: 12px;
          }
          
          .program-title {
            font-size: 18px;
          }
          
          .program-day {
            font-size: 15px;
          }
          
          .program-description {
            font-size: 13px;
          }
        }
        
        @media (min-width: 1024px) {
          .program-card {
            width: 70%;
            max-width: 1000px;
          }
          
          .program-title {
            font-size: 20px;
          }
          
          .program-day {
            font-size: 16px;
          }
          
          .program-description {
            font-size: 14px;
          }
        }
      `}</style>
      <div className="program-card">
        <div className="program-header">
          <div className="program-title">برنامه ایونت</div>
        </div>
        <div className="program-content">
          {programs.map((program, index) => (
            <div key={index} className="program-item">
              <div className="program-day">
                {program.day} {program.date}
              </div>
              <div className="program-description">
                {program.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventProgramCard;
