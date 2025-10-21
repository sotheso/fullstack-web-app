import React, { useEffect, useState } from 'react';
import { useNetwork } from '../contexts/NetworkContext';

const NetworkStatusBanner: React.FC = () => {
  const { isOnline, showOfflineBanner, errorMessage, clearErrorMessage, showErrorMessage } = useNetwork();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showOfflineBanner || errorMessage) {
      setVisible(true);
    } else {
      // افکت fade out
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showOfflineBanner, errorMessage]);

  useEffect(() => {
    // گوش دادن به custom event برای خطاهای شبکه از API calls
    const handleNetworkError = (event: any) => {
      showErrorMessage(event.detail);
    };

    window.addEventListener('network-error', handleNetworkError);
    return () => {
      window.removeEventListener('network-error', handleNetworkError);
    };
  }, [showErrorMessage]);

  if (!visible && !showOfflineBanner && !errorMessage) {
    return null;
  }

  return (
    <>
      {/* بنر قطع اینترنت - در بالای صفحه */}
      {showOfflineBanner && (
        <div 
          className={`offline-banner ${showOfflineBanner ? 'slide-down' : 'slide-up'}`}
          role="alert"
        >
          <div className="offline-content">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="white"/>
            </svg>
            <span>اتصال به اینترنت قطع است</span>
          </div>
        </div>
      )}

      {/* پیام خطا - وقتی درخواست به خاطر قطع نت لود نمی‌شود */}
      {errorMessage && (
        <div 
          className={`error-toast ${errorMessage ? 'slide-down' : 'slide-up'}`}
          role="alert"
        >
          <div className="error-content">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="white"/>
            </svg>
            <span>{errorMessage}</span>
            <button 
              onClick={clearErrorMessage}
              className="close-btn"
              aria-label="بستن"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .offline-banner,
        .error-toast {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          padding: 12px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        }

        .offline-banner {
          background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%);
        }

        .error-toast {
          background: linear-gradient(135deg, #f26430 0%, #d9534f 100%);
        }

        .offline-content,
        .error-content {
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          font-family: 'Ravi', sans-serif;
          font-size: 14px;
          font-weight: 500;
        }

        .error-content {
          position: relative;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: white;
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
          padding: 0 0 0 8px;
          margin: 0;
          opacity: 0.8;
          transition: opacity 0.2s;
        }

        .close-btn:hover {
          opacity: 1;
        }

        .slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }

        .slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        @media (min-width: 768px) {
          .offline-banner,
          .error-toast {
            padding: 16px 94px;
          }

          .offline-content,
          .error-content {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default NetworkStatusBanner;

