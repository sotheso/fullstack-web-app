import React, { useState, useEffect } from 'react';

interface Brand {
  id: string;
  name: string;
  isSelected?: boolean;
}

interface BrandsCardProps {
  brands: Brand[];
  onBrandSelect?: (brandId: string) => void;
}

const BrandsCard: React.FC<BrandsCardProps> = ({ brands, onBrandSelect }) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  useEffect(() => {
    if (!brands || !Array.isArray(brands)) {
      return;
    }
    console.log('[BrandsCard] Initializing selectedBrands from brands:', brands);
    const initialSelected = brands.filter(brand => brand.isSelected && brand.id).map(brand => brand.id);
    console.log('[BrandsCard] Initial selected brands:', initialSelected);
    setSelectedBrands(initialSelected);
  }, [brands]);

  const handleBrandClick = (brandId: string) => {
    const newSelectedBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter(id => id !== brandId)
      : [...selectedBrands, brandId];
    
    setSelectedBrands(newSelectedBrands);
    onBrandSelect?.(brandId);
  };

  return (
    <>
      <style jsx>{`
        .brands-card {
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
        
        .brands-header {
          display: flex;
          align-items: center;
          gap: 4px;
          width: 100%;
          justify-content: flex-end;
          padding-bottom: 4px;
          border-bottom: 1px solid #EDEDED;
        }
        
        .brands-title {
          color: #000000;
          text-align: right;
          font-family: Ravi;
          font-size: 16px;
          font-style: normal;
          font-weight: 520;
          line-height: normal;
        }
        
        
        .brands-content {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          width: 100%;
          justify-content: flex-end;
        }
        
        .brand-tag {
          padding: 4px 12px;
          border-radius: 20px;
          font-family: Ravi;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          outline: none;
        }
        
        .brand-tag {
          background: #F5F5F5;
          color: #000;
        }
        
        .brand-tag:hover {
          opacity: 0.8;
        }
        
        @media (min-width: 768px) {
          .brands-card {
            width: 80%;
            max-width: 800px;
            padding: 16px;
            gap: 12px;
          }
          
          .brands-title {
            font-size: 18px;
          }
          
          .brand-tag {
            font-size: 13px;
            padding: 6px 14px;
          }
        }
        
        @media (min-width: 1024px) {
          .brands-card {
            width: 70%;
            max-width: 1000px;
          }
          
          .brands-title {
            font-size: 20px;
          }
          
          .brand-tag {
            font-size: 14px;
            padding: 8px 16px;
          }
        }
      `}</style>
      <div className="brands-card">
        <div className="brands-header">
          <div className="brands-title">برندها</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, aspectRatio: '1/1' }}>
            <path d="M8.00033 7.16669C8.27647 7.16669 8.50033 7.39054 8.50033 7.66669V11C8.50033 11.2762 8.27647 11.5 8.00033 11.5C7.72418 11.5 7.50033 11.2762 7.50033 11V7.66669C7.50033 7.39054 7.72418 7.16669 8.00033 7.16669Z" fill="#F26430"/>
            <path d="M8.00033 6.00002C8.36852 6.00002 8.66699 5.70154 8.66699 5.33335C8.66699 4.96516 8.36852 4.66669 8.00033 4.66669C7.63214 4.66669 7.33366 4.96516 7.33366 5.33335C7.33366 5.70154 7.63214 6.00002 8.00033 6.00002Z" fill="#F26430"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M2.16699 8.00002C2.16699 4.77836 4.77866 2.16669 8.00033 2.16669C11.222 2.16669 13.8337 4.77836 13.8337 8.00002C13.8337 11.2217 11.222 13.8334 8.00033 13.8334C4.77866 13.8334 2.16699 11.2217 2.16699 8.00002ZM8.00033 3.16669C5.33095 3.16669 3.16699 5.33064 3.16699 8.00002C3.16699 10.6694 5.33095 12.8334 8.00033 12.8334C10.6697 12.8334 12.8337 10.6694 12.8337 8.00002C12.8337 5.33064 10.6697 3.16669 8.00033 3.16669Z" fill="#F26430"/>
          </svg>
        </div>
        <div className="brands-content">
          {brands && Array.isArray(brands) && brands.length > 0 ? brands.map((brand, index) => (
            <button
              key={brand.id || index}
              className="brand-tag"
              onClick={() => brand.id && handleBrandClick(brand.id)}
            >
              {brand.name}
            </button>
          )) : null}
        </div>
      </div>
    </>
  );
};

export default BrandsCard;
