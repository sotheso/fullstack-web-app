import React from 'react';
import { useRouter } from 'next/router';

const SettingsPage: React.FC = () => {
  const router = useRouter();

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

      {/* Content */}
      <div className="settings-content">
        <p className="coming-soon">محتوای تنظیمات به زودی اضافه خواهد شد...</p>
      </div>

      <style jsx>{`
        .settings-container {
          min-height: 100vh;
          background: #FCFCFC;
          padding: 20px;
          direction: rtl;
        }

        .settings-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
          padding: 0 4px;
        }

        .back-button {
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }

        .back-button:hover {
          background-color: rgba(242, 100, 48, 0.1);
        }

        .settings-title {
          font-family: Ravi;
          font-size: 24px;
          font-weight: 700;
          color: #000;
          margin: 0;
          text-align: right;
        }

        .settings-content {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .coming-soon {
          font-family: Ravi;
          font-size: 16px;
          color: #666;
          text-align: center;
        }

        @media (min-width: 768px) {
          .settings-container {
            padding: 40px 94px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .settings-title {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;
