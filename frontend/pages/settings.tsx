import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SettingsPage: React.FC = () => {
  const router = useRouter();
  
  // User data state
  const [userData, setUserData] = useState({
    firstName: 'سجاد',
    lastName: 'کنگرانی فراهانی',
    phone: '۰۹۱۰۶۷۰۴۳۳۲',
    email: 'saj.kangarani@gmail.com'
  });

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    router.push('/login');
  };

  return (
    <div className="settings-container">
      {/* Header */}
      <div className="settings-header">
        <button 
          className="back-button"
          onClick={() => router.push('/profile')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.03033 9.53033C5.73744 9.82322 5.26256 9.82322 4.96967 9.53033L0.96967 5.53033C0.676777 5.23744 0.676777 4.76256 0.96967 4.46967L4.96967 0.46967C5.26256 0.176777 5.73744 0.176777 6.03033 0.46967C6.32322 0.762563 6.32322 1.23744 6.03033 1.53033L2.56066 5L6.03033 8.46967C6.32322 8.76256 6.32322 9.23744 6.03033 9.53033Z" fill="#F26430"/>
          </svg>
        </button>
        <h1 className="settings-title">تنظیمات</h1>
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="39.5" fill="#F3F3F3" stroke="#EDEDED"/>
            <g transform="translate(25, 25)">
              <path d="M15 4.6875C12.4112 4.6875 10.3125 6.78616 10.3125 9.375C10.3125 11.9638 12.4112 14.0625 15 14.0625C17.5888 14.0625 19.6875 11.9638 19.6875 9.375C19.6875 6.78616 17.5888 4.6875 15 4.6875Z" fill="#F26430"/>
              <path d="M10 16.5625C7.41116 16.5625 5.3125 18.6612 5.3125 21.25V22.7354C5.3125 23.6769 5.99485 24.4796 6.92409 24.6314C12.2726 25.5046 17.7274 25.5046 23.0759 24.6314C24.0051 24.4796 24.6875 23.6769 24.6875 22.7354V21.25C24.6875 18.6612 22.5888 16.5625 20 16.5625H19.5739C19.3432 16.5625 19.1141 16.599 18.8949 16.6705L17.813 16.9739C15.9851 17.6206 14.0149 17.6206 12.187 16.9739L11.1051 16.6705C10.8859 16.599 10.6568 16.5625 10.4261 16.5625H10Z" fill="#F26430"/>
            </g>
          </svg>
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{userData.firstName} {userData.lastName}</h2>
          <p className="profile-phone">{userData.phone}</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="form-section">
        <div className="form-row">
          <div className="form-field">
            <label className="field-label">اسمت:</label>
            <div className="field-container">
              <input
                type="text"
                value={userData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="field-input"
              />
              <button className="edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M11.3333 2.00002C11.5084 1.82491 11.7163 1.68602 11.9453 1.59128C12.1742 1.49654 12.4191 1.44775 12.6667 1.44775C12.9142 1.44775 13.1591 1.49654 13.388 1.59128C13.617 1.68602 13.8249 1.82491 14 2.00002C14.1751 2.17513 14.314 2.38305 14.4087 2.612C14.5035 2.84095 14.5523 3.08581 14.5523 3.33335C14.5523 3.58089 14.5035 3.82575 14.4087 4.0547C14.314 4.28365 14.1751 4.49157 14 4.66668L5.00001 13.6667L1.33334 14.6667L2.33334 11L11.3333 2.00002Z" stroke="#F26430" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="form-field">
            <label className="field-label">نام خانوادگیت:</label>
            <div className="field-container">
              <input
                type="text"
                value={userData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="field-input"
              />
              <button className="edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M11.3333 2.00002C11.5084 1.82491 11.7163 1.68602 11.9453 1.59128C12.1742 1.49654 12.4191 1.44775 12.6667 1.44775C12.9142 1.44775 13.1591 1.49654 13.388 1.59128C13.617 1.68602 13.8249 1.82491 14 2.00002C14.1751 2.17513 14.314 2.38305 14.4087 2.612C14.5035 2.84095 14.5523 3.08581 14.5523 3.33335C14.5523 3.58089 14.5035 3.82575 14.4087 4.0547C14.314 4.28365 14.1751 4.49157 14 4.66668L5.00001 13.6667L1.33334 14.6667L2.33334 11L11.3333 2.00002Z" stroke="#F26430" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="form-field full-width">
          <label className="field-label">شماره ات:</label>
          <div className="field-container">
            <input
              type="text"
              value={userData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="field-input"
            />
            <button className="edit-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.3333 2.00002C11.5084 1.82491 11.7163 1.68602 11.9453 1.59128C12.1742 1.49654 12.4191 1.44775 12.6667 1.44775C12.9142 1.44775 13.1591 1.49654 13.388 1.59128C13.617 1.68602 13.8249 1.82491 14 2.00002C14.1751 2.17513 14.314 2.38305 14.4087 2.612C14.5035 2.84095 14.5523 3.08581 14.5523 3.33335C14.5523 3.58089 14.5035 3.82575 14.4087 4.0547C14.314 4.28365 14.1751 4.49157 14 4.66668L5.00001 13.6667L1.33334 14.6667L2.33334 11L11.3333 2.00002Z" stroke="#F26430" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="form-field full-width">
          <label className="field-label">ایمیلت:</label>
          <div className="field-container">
            <input
              type="email"
              value={userData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="field-input"
            />
            <button className="edit-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.3333 2.00002C11.5084 1.82491 11.7163 1.68602 11.9453 1.59128C12.1742 1.49654 12.4191 1.44775 12.6667 1.44775C12.9142 1.44775 13.1591 1.49654 13.388 1.59128C13.617 1.68602 13.8249 1.82491 14 2.00002C14.1751 2.17513 14.314 2.38305 14.4087 2.612C14.5035 2.84095 14.5523 3.08581 14.5523 3.33335C14.5523 3.58089 14.5035 3.82575 14.4087 4.0547C14.314 4.28365 14.1751 4.49157 14 4.66668L5.00001 13.6667L1.33334 14.6667L2.33334 11L11.3333 2.00002Z" stroke="#F26430" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>
          خروج از حساب کاربری
        </button>
      </div>

    </div>
  );
};

export default SettingsPage;
