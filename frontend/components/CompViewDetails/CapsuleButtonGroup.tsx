import React from 'react';

const rectangleDiv: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(242, 100, 48, 1)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
};

const textDiv: React.CSSProperties = {
  position: 'relative',
  fontSize: 32,
  fontWeight: 600,
  fontFamily: 'Ravi',
  color: '#fff',
  textAlign: 'center',
  display: 'inline-block'
};

const bechinimStyle: React.CSSProperties = {
  width: '60px',
  position: 'relative',
  fontSize: 19,
  fontWeight: 600,
  fontFamily: 'Ravi',
  color: '#FF6B35',
  textAlign: 'center',
  display: 'inline-block'
};

const iconStyle: React.CSSProperties = {
  width: '24px',
  height: '24px',
  flexShrink: 0,
  marginLeft: '10px',
  display: 'inline-block',
  verticalAlign: 'middle'
};

interface CapsuleButtonGroupProps {
  showReminder?: boolean;
  showConfirm?: boolean;
  mapUrl?: string;
}

const CapsuleButtonGroup: React.FC<CapsuleButtonGroupProps> = ({
  showReminder = true,
  showConfirm = true,
  mapUrl
}) => {
  const handleMapClick = () => {
    if (mapUrl) {
      window.open(mapUrl, '_blank');
    }
  };

  const handleReminderClick = () => {
    // Add reminder functionality here
    console.log('Reminder clicked');
  };

  const handleConfirmClick = () => {
    // Add confirm functionality here
    console.log('Confirm clicked');
  };

  return (
    <div className="capsule-button-group">
      {showReminder && (
        <div className="capsule-btn" style={rectangleDiv} onClick={handleReminderClick} role="button" tabIndex={0}>
          <div style={textDiv}>یادآوری</div>
        </div>
      )}
      <div
        className="capsule-btn"
        style={{
          ...rectangleDiv,
          opacity: mapUrl ? 1 : 0.5,
          cursor: mapUrl ? 'pointer' : 'not-allowed'
        }}
        onClick={mapUrl ? handleMapClick : undefined}
        role="button"
        tabIndex={0}
        aria-disabled={!mapUrl}
      >
        <div style={textDiv}>گوگل‌مپ</div>
      </div>
      {/* {showConfirm && (
        <div className="capsule-btn" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center' }} onClick={handleConfirmClick} role="button" tabIndex={0}>
            <svg style={iconStyle} xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
              <circle cx="14.5" cy="14.5" r="14.5" fill="#F26430" />
              <circle cx="14.5" cy="14.5" r="7.5" fill="#FFF" />
            </svg>
            <div style={{ ...bechinimStyle, marginLeft: '16px', color: '#FF6B35' }}>بچینیم!</div>
          </span>
        </div>
      )} */}
    </div>
  );
};

export default CapsuleButtonGroup; 