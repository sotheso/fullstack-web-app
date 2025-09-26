import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LogoutModal from '../components/CompSetting/LogoutModal';

const SettingsPage: React.FC = () => {
  const router = useRouter();
  
  // User data state
  const [userData, setUserData] = useState({
    firstName: 'سجاد',
    lastName: 'کنگرانی فراهانی',
    phone: '۰۹۱۰۶۷۰۴۳۳۲',
    email: 'saj.kangarani@gmail.com'
  });

  // Modal state
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Handle logout logic here
    console.log('Logging out...');
    setIsLogoutModalOpen(false);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="settings-container">
      {/* Header */}
      <div className="settings-header">
        <button 
          className="back-button"
          onClick={() => router.push('/profile')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="5" height="7" viewBox="0 0 7 10" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.96967 0.46967C1.26256 0.176777 1.73744 0.176777 2.03033 0.46967L6.03033 4.46967C6.32322 4.76256 6.32322 5.23744 6.03033 5.53033L2.03033 9.53033C1.73744 9.82322 1.26256 9.82322 0.96967 9.53033C0.676777 9.23744 0.676777 8.76256 0.96967 8.46967L4.43934 5L0.96967 1.53033C0.676777 1.23744 0.676777 0.762563 0.96967 0.46967Z" fill="#F26430"/>
          </svg>
        </button>
        <h1 
          className="settings-title"
          onClick={() => router.push('/profile')}
          role="button"
        >
          برگشت
        </h1>
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
            <div className="field-container">
              <div className="field-content">
                <div className="field-label">اسمت:</div>
                <div className="field-divider"></div>
                <div className="field-value">سجاد</div>
                <button className="edit-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.0911 2.31312C9.99735 2.21935 9.87018 2.16667 9.73757 2.16667C9.60496 2.16667 9.47778 2.21935 9.38402 2.31312L3.25576 8.44138C3.19294 8.50419 3.14799 8.58261 3.12554 8.66857L2.45887 11.2209C2.41401 11.3926 2.46357 11.5753 2.58909 11.7008C2.71461 11.8263 2.89726 11.8758 3.06901 11.831L5.62129 11.1643C5.70724 11.1419 5.78566 11.0969 5.84848 11.0341L11.9767 4.90584C12.172 4.71058 12.172 4.394 11.9767 4.19874L10.0911 2.31312ZM4.05879 9.05255L9.73757 3.37378L10.9161 4.55229L5.23731 10.2311L3.64213 10.6477L4.05879 9.05255Z" fill="#F26430"/>
                    <path d="M2.6665 12.8333C2.39036 12.8333 2.1665 13.0572 2.1665 13.3333C2.1665 13.6095 2.39036 13.8333 2.6665 13.8333H12.6665C12.9426 13.8333 13.1665 13.6095 13.1665 13.3333C13.1665 13.0572 12.9426 12.8333 12.6665 12.8333H2.6665Z" fill="#F26430"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="form-field">
            <div className="field-container">
              <div className="field-content">
                <div className="field-label">نام خانوادگیت:</div>
                <div className="field-divider"></div>
                <div className="field-value">کنگرانی</div>
                <button className="edit-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.0911 2.31312C9.99735 2.21935 9.87018 2.16667 9.73757 2.16667C9.60496 2.16667 9.47778 2.21935 9.38402 2.31312L3.25576 8.44138C3.19294 8.50419 3.14799 8.58261 3.12554 8.66857L2.45887 11.2209C2.41401 11.3926 2.46357 11.5753 2.58909 11.7008C2.71461 11.8263 2.89726 11.8758 3.06901 11.831L5.62129 11.1643C5.70724 11.1419 5.78566 11.0969 5.84848 11.0341L11.9767 4.90584C12.172 4.71058 12.172 4.394 11.9767 4.19874L10.0911 2.31312ZM4.05879 9.05255L9.73757 3.37378L10.9161 4.55229L5.23731 10.2311L3.64213 10.6477L4.05879 9.05255Z" fill="#F26430"/>
                    <path d="M2.6665 12.8333C2.39036 12.8333 2.1665 13.0572 2.1665 13.3333C2.1665 13.6095 2.39036 13.8333 2.6665 13.8333H12.6665C12.9426 13.8333 13.1665 13.6095 13.1665 13.3333C13.1665 13.0572 12.9426 12.8333 12.6665 12.8333H2.6665Z" fill="#F26430"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="form-field full-width">
          <div className="field-container">
            <div className="field-content">
              <div className="field-label">شماره ات:</div>
              <div className="field-divider"></div>
              <div className="field-value">{userData.phone}</div>
              <button className="edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.0911 2.31312C9.99735 2.21935 9.87018 2.16667 9.73757 2.16667C9.60496 2.16667 9.47778 2.21935 9.38402 2.31312L3.25576 8.44138C3.19294 8.50419 3.14799 8.58261 3.12554 8.66857L2.45887 11.2209C2.41401 11.3926 2.46357 11.5753 2.58909 11.7008C2.71461 11.8263 2.89726 11.8758 3.06901 11.831L5.62129 11.1643C5.70724 11.1419 5.78566 11.0969 5.84848 11.0341L11.9767 4.90584C12.172 4.71058 12.172 4.394 11.9767 4.19874L10.0911 2.31312ZM4.05879 9.05255L9.73757 3.37378L10.9161 4.55229L5.23731 10.2311L3.64213 10.6477L4.05879 9.05255Z" fill="#F26430"/>
                  <path d="M2.6665 12.8333C2.39036 12.8333 2.1665 13.0572 2.1665 13.3333C2.1665 13.6095 2.39036 13.8333 2.6665 13.8333H12.6665C12.9426 13.8333 13.1665 13.6095 13.1665 13.3333C13.1665 13.0572 12.9426 12.8333 12.6665 12.8333H2.6665Z" fill="#F26430"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="form-field full-width">
          <div className="field-container">
            <div className="field-content">
              <div className="field-label">ایمیلت:</div>
              <div className="field-divider"></div>
              <div className="field-value">{userData.email}</div>
              <button className="edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.0911 2.31312C9.99735 2.21935 9.87018 2.16667 9.73757 2.16667C9.60496 2.16667 9.47778 2.21935 9.38402 2.31312L3.25576 8.44138C3.19294 8.50419 3.14799 8.58261 3.12554 8.66857L2.45887 11.2209C2.41401 11.3926 2.46357 11.5753 2.58909 11.7008C2.71461 11.8263 2.89726 11.8758 3.06901 11.831L5.62129 11.1643C5.70724 11.1419 5.78566 11.0969 5.84848 11.0341L11.9767 4.90584C12.172 4.71058 12.172 4.394 11.9767 4.19874L10.0911 2.31312ZM4.05879 9.05255L9.73757 3.37378L10.9161 4.55229L5.23731 10.2311L3.64213 10.6477L4.05879 9.05255Z" fill="#F26430"/>
                  <path d="M2.6665 12.8333C2.39036 12.8333 2.1665 13.0572 2.1665 13.3333C2.1665 13.6095 2.39036 13.8333 2.6665 13.8333H12.6665C12.9426 13.8333 13.1665 13.6095 13.1665 13.3333C13.1665 13.0572 12.9426 12.8333 12.6665 12.8333H2.6665Z" fill="#F26430"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>
          خروج از حساب کاربری
        </button>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />

    </div>
  );
};

export default SettingsPage;
