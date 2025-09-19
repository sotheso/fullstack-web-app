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
          gap: 4px;
          width: 100%;
          justify-content: flex-end;
          padding-bottom: 8px;
          border-bottom: 1px solid #EDEDED;
        }
        
        .program-title {
          color: #000000;
          text-align: right;
          font-family: Ravi;
          font-size: 16px;
          font-style: normal;
          font-weight: 520;
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
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, aspectRatio: '1/1' }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M10.4331 2.84193L10.9753 2.90947C12.2269 3.06534 13.1663 4.12906 13.1663 5.3903V12.3832C13.1663 13.6078 12.2542 14.6407 11.039 14.792C9.02057 15.0434 6.97878 15.0434 4.96039 14.792C3.74518 14.6407 2.83301 13.6078 2.83301 12.3832V5.3903C2.83301 4.12906 3.77247 3.06534 5.02404 2.90947L5.56628 2.84193C5.78106 2.06804 6.4907 1.5 7.33301 1.5H8.66634C9.50865 1.5 10.2183 2.06804 10.4331 2.84193ZM5.49967 3.85795L5.14763 3.9018C4.39669 3.99532 3.83301 4.63356 3.83301 5.3903V12.3832C3.83301 13.1034 4.36939 13.7107 5.08398 13.7997C7.0203 14.0408 8.97905 14.0408 10.9154 13.7997C11.63 13.7107 12.1663 13.1034 12.1663 12.3832V5.3903C12.1663 4.63356 11.6027 3.99532 10.8517 3.9018L10.4997 3.85795V4.66667C10.4997 4.94281 10.2758 5.16667 9.99967 5.16667H5.99967C5.72353 5.16667 5.49967 4.94281 5.49967 4.66667V3.85795ZM6.49967 3.33333C6.49967 2.8731 6.87277 2.5 7.33301 2.5H8.66634C9.12658 2.5 9.49967 2.8731 9.49967 3.33333V4.16667H6.49967V3.33333Z" fill="#F26430"/>
            <path d="M10.4997 7.83333C10.4997 7.55719 10.2758 7.33333 9.99967 7.33333H5.99967C5.72353 7.33333 5.49967 7.55719 5.49967 7.83333C5.49967 8.10948 5.72353 8.33333 5.99967 8.33333H9.99967C10.2758 8.33333 10.4997 8.10948 10.4997 7.83333Z" fill="#F26430"/>
            <path d="M9.83301 9.83333C9.83301 9.55719 9.60915 9.33333 9.33301 9.33333H5.99967C5.72353 9.33333 5.49967 9.55719 5.49967 9.83333C5.49967 10.1095 5.72353 10.3333 5.99967 10.3333H9.33301C9.60915 10.3333 9.83301 10.1095 9.83301 9.83333Z" fill="#F26430"/>
          </svg>
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
