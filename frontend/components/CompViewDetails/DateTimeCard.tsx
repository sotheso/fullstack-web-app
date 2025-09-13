import React from 'react';

interface DateTimeCardProps {
  time: string;
  date?: string;
}

const DateTimeCard: React.FC<DateTimeCardProps> = ({ time, date }) => {
  return (
    <>
      <style jsx>{`
        .datetime-card {
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
        
        .datetime-header {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          justify-content: flex-end;
          padding-bottom: 8px;
          border-bottom: 1px solid #EDEDED;
        }
        
        .datetime-title {
          color: #F26430;
          text-align: right;
          font-family: Ravi;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
        
        
        .datetime-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          align-items: flex-end;
        }
        
        .datetime-text {
          color: #000;
          text-align: right;
          font-family: Ravi;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 1.5;
          width: 100%;
        }
        
        .date-text {
          color: #666;
          text-align: right;
          font-family: Ravi;
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 1.4;
          width: 100%;
        }
        
        @media (min-width: 768px) {
          .datetime-card {
            width: 80%;
            max-width: 800px;
            padding: 16px;
            gap: 12px;
          }
          
          .datetime-title {
            font-size: 18px;
          }
          
          .datetime-text {
            font-size: 15px;
            line-height: 1.6;
          }
          
          .date-text {
            font-size: 14px;
            line-height: 1.5;
          }
        }
        
        @media (min-width: 1024px) {
          .datetime-card {
            width: 70%;
            max-width: 1000px;
          }
          
          .datetime-title {
            font-size: 20px;
          }
          
          .datetime-text {
            font-size: 16px;
            line-height: 1.7;
          }
          
          .date-text {
            font-size: 15px;
            line-height: 1.6;
          }
        }
      `}</style>
      <div className="datetime-card">
        <div className="datetime-header">
          <div className="datetime-title">تاریخ و  زمان</div>
        </div>
        <div className="datetime-content">
          <div className="datetime-text">
            {time}
          </div>
          {date && (
            <div className="date-text">
              {date}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DateTimeCard;
