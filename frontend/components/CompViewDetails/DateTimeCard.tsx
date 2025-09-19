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
          gap: 4px;
          width: 100%;
          justify-content: flex-end;
          padding-bottom: 8px;
          border-bottom: 1px solid #EDEDED;
        }
        
        .datetime-title {
          color: #000000;
          text-align: right;
          font-family: Ravi;
          font-size: 16px;
          font-style: normal;
          font-weight: 520;
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
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, aspectRatio: '1/1' }}>
            <path d="M8.50033 4.66669C8.50033 4.39054 8.27647 4.16669 8.00033 4.16669C7.72418 4.16669 7.50033 4.39054 7.50033 4.66669V8.00002C7.50033 8.17242 7.58914 8.33265 7.73533 8.42402L9.73533 9.67402C9.96949 9.82037 10.278 9.74919 10.4243 9.51502C10.5707 9.28085 10.4995 8.97238 10.2653 8.82602L8.50033 7.7229V4.66669Z" fill="#F26430"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.00033 2.16669C4.77866 2.16669 2.16699 4.77836 2.16699 8.00002C2.16699 11.2217 4.77866 13.8334 8.00033 13.8334C11.222 13.8334 13.8337 11.2217 13.8337 8.00002C13.8337 4.77836 11.222 2.16669 8.00033 2.16669ZM3.16699 8.00002C3.16699 5.33064 5.33095 3.16669 8.00033 3.16669C10.6697 3.16669 12.8337 5.33064 12.8337 8.00002C12.8337 10.6694 10.6697 12.8334 8.00033 12.8334C5.33095 12.8334 3.16699 10.6694 3.16699 8.00002Z" fill="#F26430"/>
          </svg>
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
