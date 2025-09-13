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
          gap: 8px;
          width: 100%;
          justify-content: flex-end;
          padding-bottom: 8px;
          border-bottom: 1px solid #EDEDED;
        }
        
        .address-title {
          color: #F26430;
          text-align: right;
          font-family: Ravi;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
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
        </div>
        <div className="address-text">
          {address}
        </div>
      </div>
    </>
  );
};

export default AddressCard;
