import React from 'react';

interface AddressCardProps {
  address: string;
  mapUrl?: string;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, mapUrl }) => {
  const handleMapClick = () => {
    if (mapUrl) {
      window.open(mapUrl, '_blank');
    }
  };

  return (
    <>
      <style jsx>{`
        .address-card {
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
        
        
        .address-header {
          display: flex;
          align-items: center;
          gap: 4px;
          width: 100%;
          justify-content: flex-end;
          padding-bottom: 8px;
          border-bottom: 1px solid #EDEDED;
        }
        
        .address-title {
          color: #000000;
          text-align: right;
          font-family: Ravi;
          font-size: 16px;
          font-style: normal;
          font-weight: 520;
          line-height: normal;
        }
        
        
        .address-text {
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
          .address-card {
            width: 80%;
            max-width: 800px;
            padding: 16px;
            gap: 12px;
          }
          
          .address-title {
            font-size: 18px;
          }
          
          .address-text {
            font-size: 15px;
            line-height: 1.6;
          }
        }
        
        @media (min-width: 1024px) {
          .address-card {
            width: 70%;
            max-width: 1000px;
          }
          
          .address-title {
            font-size: 20px;
          }
          
          .address-text {
            font-size: 16px;
            line-height: 1.7;
          }
        }
      `}</style>
      <div className="address-card">
        <div className="address-header">
          <div className="address-title">آدرس</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, aspectRatio: '1/1' }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.00033 3.16669C5.33095 3.16669 3.16699 5.33064 3.16699 8.00002C3.16699 10.6694 5.33095 12.8334 8.00033 12.8334C10.6697 12.8334 12.8337 10.6694 12.8337 8.00002C12.8337 5.33064 10.6697 3.16669 8.00033 3.16669ZM2.16699 8.00002C2.16699 4.77836 4.77866 2.16669 8.00033 2.16669C11.222 2.16669 13.8337 4.77836 13.8337 8.00002C13.8337 11.2217 11.222 13.8334 8.00033 13.8334C4.77866 13.8334 2.16699 11.2217 2.16699 8.00002Z" fill="#F26430"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M7.23352 6.20585C6.61114 6.71788 6.19535 7.43806 6.06311 8.23306L5.77115 9.98829C5.61954 10.8998 6.67936 11.5117 7.39292 10.9246L8.767 9.79416C9.38938 9.28213 9.80518 8.56196 9.93742 7.76695L10.2294 6.01173C10.381 5.10025 9.32116 4.48836 8.6076 5.0754L7.23352 6.20585ZM8.00033 7.00002C7.44804 7.00002 7.00033 7.44774 7.00033 8.00002C7.00033 8.55231 7.44804 9.00002 8.00033 9.00002C8.55261 9.00002 9.00033 8.55231 9.00033 8.00002C9.00033 7.44774 8.55261 7.00002 8.00033 7.00002Z" fill="#F26430"/>
          </svg>
        </div>
        <div className="address-text">
          {address}
        </div>
      </div>
    </>
  );
};

export default AddressCard;
