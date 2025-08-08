import React from 'react';

interface FilterButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, active = false, onClick }) => {
  return (
    <div
      style={{
        width: 104,
        height: 32,
        flexShrink: 0,
        background: active ? '#F2C1AE' : '#F3F3F3',
        borderRadius: 30,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s',
      }}
      onClick={onClick}
    >
      <div
        style={{
          textAlign: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: active ? '#F26430' : 'black',
          fontSize: 16,
          fontFamily: 'Ravi',
          fontWeight: 500,
          wordWrap: 'break-word',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default FilterButton; 