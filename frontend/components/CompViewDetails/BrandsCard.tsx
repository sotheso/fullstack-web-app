import React, { useState } from 'react';

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
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    brands.filter(brand => brand.isSelected).map(brand => brand.id)
  );

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
          gap: 8px;
          width: 100%;
          justify-content: flex-end;
          padding-bottom: 4px;
          border-bottom: 1px solid #EDEDED;
        }
        
        .brands-title {
          color: #F26430;
          text-align: right;
          font-family: Ravi;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
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
        
        .brand-tag.selected {
          background: #F26430;
          color: #FFF;
        }
        
        .brand-tag.unselected {
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
        </div>
        <div className="brands-content">
          {brands.map((brand) => (
            <button
              key={brand.id}
              className={`brand-tag ${selectedBrands.includes(brand.id) ? 'selected' : 'unselected'}`}
              onClick={() => handleBrandClick(brand.id)}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrandsCard;
