import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number; // مدت زمان نمایش loading به میلی‌ثانیه
  showOfflineError?: boolean; // نمایش پیام خطای قطع اینترنت
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete, 
  duration = 2000,
  showOfflineError = false 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // بررسی تغییرات وضعیت آنلاین/آفلاین در حین loading
    const handleOffline = () => setShowError(true);
    const handleOnline = () => setShowError(false);
    
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    
    const timer = setTimeout(() => {
      if (showOfflineError || !navigator.onLine) {
        // اگر نت قطع است، پیام خطا را نشان بده
        setShowError(true);
      } else {
        // اگر همه چیز خوب است، loading را ببند
        setIsVisible(false);
        onLoadingComplete?.();
      }
    }, duration);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [duration, onLoadingComplete, showOfflineError]);

  // Prevent hydration mismatch by not rendering on server
  if (!isMounted || !isVisible) return null;

  return (
    <div className={`loading-screen ${showError ? 'show-error' : ''}`}>
      <div className="loading-content">
        <div className={`logo-container ${showError ? 'error-state' : ''}`}>
          <svg 
            id="Layer_1" 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1543.13 270.17"
            className="logo-svg"
          >
            <defs>
              <style>
                {`
                  .cls-1 {
                    fill: #f26430;
                    stroke-width: 0px;
                  }
                `}
              </style>
            </defs>
            <g>
              <path className="cls-1" d="M802.55,140.64c-4.43,10.41-19.21,10.35-23.56-.1l-51-122.63c-2.27-5.46-7.61-9.02-13.52-9.02h-42.95c-10.51,0-17.6,10.74-13.47,20.4l92.14,215.71c2.3,5.39,7.6,8.89,13.47,8.89h48.92c5.86,0,11.15-3.49,13.46-8.87l44.8-104.52c1.38-3.21,1.38-6.84,0-10.06l-20.27-47.43c-4.42-10.35-19.1-10.34-23.51.02l-24.52,57.61Z"/>
              <path className="cls-1" d="M673.69,130.05c1.37,3.21,1.37,6.85,0,10.06l-44.97,104.92c-2.31,5.38-7.6,8.87-13.46,8.87h-48.92c-5.87,0-11.17-3.5-13.47-8.89L460.73,29.3c-4.13-9.66,2.96-20.4,13.47-20.4h42.95c5.91,0,11.25,3.56,13.52,9.02l50.99,122.62c4.35,10.45,19.13,10.52,23.57.1l24.68-57.97c4.41-10.36,19.1-10.37,23.52-.01l20.25,47.4Z"/>
              <path className="cls-1" d="M946.99,245.01l-92.14-215.71c-4.13-9.66,2.96-20.4,13.47-20.4h42.95c5.92,0,11.25,3.56,13.52,9.02l76.02,182.81c4.01,9.64-3.08,20.27-13.52,20.27h0c-10.5,0-17.59-10.72-13.47-20.38l77.83-182.81c2.3-5.4,7.6-8.91,13.47-8.91h36.71c10.51,0,17.6,10.75,13.46,20.41l-92.45,215.71c-2.31,5.38-7.6,8.88-13.46,8.88h-48.92c-5.86,0-11.16-3.5-13.47-8.89Z"/>
            </g>
            <path className="cls-1" d="M1257.87,17.79l92.14,215.71c4.13,9.66-2.96,20.4-13.47,20.4h-42.95c-5.92,0-11.25-3.56-13.52-9.02l-76.02-182.81c-4.01-9.64,3.08-20.27,13.52-20.27h0c10.5,0,17.59,10.72,13.47,20.38l-77.83,182.81c-2.3,5.4-7.6,8.91-13.47,8.91h-36.71c-10.51,0-17.6-10.75-13.46-20.41l92.45-215.71c2.31-5.38,7.6-8.88,13.46-8.88h48.92c5.86,0,11.16,3.5,13.47,8.89Z"/>
            <path className="cls-1" d="M418.92,17.79l92.14,215.71c4.13,9.66-2.96,20.4-13.47,20.4h-42.95c-5.92,0-11.25-3.56-13.52-9.02l-76.02-182.81c-4.01-9.64,3.08-20.27,13.52-20.27h0c10.5,0,17.59,10.72,13.47,20.38l-77.83,182.81c-2.3,5.4-7.6,8.91-13.47,8.91h-36.71c-10.51,0-17.6-10.75-13.46-20.41L343.06,17.78c2.31-5.38,7.6-8.88,13.46-8.88h48.92c5.86,0,11.16,3.5,13.47,8.89Z"/>
            <path className="cls-1" d="M236.11,169.5L20.4,261.64c-9.66,4.13-20.4-2.96-20.4-13.47v-42.95c0-5.92,3.56-11.25,9.02-13.52l182.81-76.02c9.64-4.01,20.27,3.08,20.27,13.52h0c0,10.5-10.72,17.59-20.38,13.47L8.91,64.84c-5.4-2.3-8.91-7.6-8.91-13.47V14.66C0,4.15,10.75-2.94,20.41,1.2l215.71,92.45c5.38,2.31,8.88,7.6,8.88,13.46v48.92c0,5.86-3.5,11.16-8.89,13.47Z"/>
            <path className="cls-1" d="M1398.93,238.08V79.68c0-8.74-7.08-15.82-15.82-15.82h-43.6c-8.74,0-15.82-7.08-15.82-15.82v-23.3c0-8.74,7.08-15.82,15.82-15.82h187.8c8.74,0,15.82,7.08,15.82,15.82v23.3c0,8.74-7.08,15.82-15.82,15.82h-43.25c-8.74,0-15.82,7.08-15.82,15.82v158.4c0,8.74-7.08,15.82-15.82,15.82h-37.65c-8.74,0-15.82-7.08-15.82-15.82Z"/>
          </svg>
        </div>

        {showError && (
          <div className="error-message">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#6B7280" opacity="0.2"/>
              <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="error-title">اتصال به اینترنت برقرار نیست</h2>
            <p className="error-description">
              لطفاً اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید
            </p>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              تلاش مجدد
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          animation: fadeOut 0.5s ease-in-out 1.5s forwards;
        }

        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .logo-container {
          animation: logoFloat 2s ease-in-out infinite;
          transition: all 0.5s ease;
        }

        .logo-container.error-state {
          animation: none;
          transform: translateY(-30px);
        }

        .logo-svg {
          width: 200px;
          height: auto;
          max-width: 90vw;
        }

        .error-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin-top: 24px;
          padding: 0 20px;
          animation: slideUp 0.5s ease-out;
        }

        .error-message svg {
          animation: pulse 2s ease-in-out infinite;
        }

        .error-title {
          font-family: 'Ravi', sans-serif;
          font-size: 24px;
          font-weight: 600;
          color: #374151;
          margin: 0;
          text-align: center;
        }

        .error-description {
          font-family: 'Ravi', sans-serif;
          font-size: 16px;
          font-weight: 400;
          color: #6B7280;
          margin: 0;
          text-align: center;
          max-width: 400px;
          line-height: 1.6;
        }

        .retry-button {
          font-family: 'Ravi', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: white;
          background: #F26430;
          border: none;
          border-radius: 12px;
          padding: 12px 32px;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 8px;
        }

        .retry-button:hover {
          background: #E5532A;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(242, 100, 48, 0.3);
        }

        .retry-button:active {
          transform: translateY(0);
        }

        .loading-screen.show-error {
          animation: none;
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        @media (max-width: 768px) {
          .logo-svg {
            width: 160px;
          }

          .error-title {
            font-size: 20px;
          }

          .error-description {
            font-size: 14px;
          }

          .retry-button {
            font-size: 14px;
            padding: 10px 24px;
          }
        }

        @media (max-width: 480px) {
          .logo-svg {
            width: 140px;
          }

          .error-title {
            font-size: 18px;
          }

          .error-description {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
