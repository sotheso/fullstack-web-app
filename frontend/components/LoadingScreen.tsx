import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number; // مدت زمان نمایش loading به میلی‌ثانیه
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete, 
  duration = 2000 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onLoadingComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="logo-container">
          <svg 
            id="Layer_1" 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1543.13 483.07"
            className="logo-svg"
          >
            <defs>
              <style>
                {`
                  .cls-1 {
                    fill: #f26430;
                    stroke-width: 0px;
                  }
                  .cls-2 {
                    fill: #000;
                    font-family: Montserrat-ExtraLight, Montserrat;
                    font-size: 90px;
                    font-weight: 200;
                  }
                `}
              </style>
            </defs>
            <g>
              <g>
                <path className="cls-1" d="M802.55,140.64c-4.43,10.41-19.21,10.35-23.56-.1l-51-122.63c-2.27-5.46-7.61-9.02-13.52-9.02h-42.95c-10.51,0-17.6,10.74-13.47,20.4l92.14,215.71c2.3,5.39,7.6,8.89,13.47,8.89h48.92c5.86,0,11.15-3.49,13.46-8.87l44.8-104.52c1.38-3.21,1.38-6.84,0-10.06l-20.27-47.43c-4.42-10.35-19.1-10.34-23.51.02l-24.52,57.61Z"/>
                <path className="cls-1" d="M673.69,130.05c1.37,3.21,1.37,6.85,0,10.06l-44.97,104.92c-2.31,5.38-7.6,8.87-13.46,8.87h-48.92c-5.87,0-11.17-3.5-13.47-8.89L460.73,29.3c-4.13-9.66,2.96-20.4,13.47-20.4h42.95c5.91,0,11.25,3.56,13.52,9.02l50.99,122.62c4.35,10.45,19.13,10.52,23.57.1l24.68-57.97c4.41-10.36,19.1-10.37,23.52-.01l20.25,47.4Z"/>
                <path className="cls-1" d="M946.99,245.01l-92.14-215.71c-4.13-9.66,2.96-20.4,13.47-20.4h42.95c5.92,0,11.25,3.56,13.52,9.02l76.02,182.81c4.01,9.64-3.08,20.27-13.52,20.27h0c-10.5,0-17.59-10.72-13.47-20.38l77.83-182.81c2.3-5.4,7.6-8.91,13.47-8.91h36.71c10.51,0,17.6,10.75,13.46,20.41l-92.45,215.71c-2.31,5.38-7.6,8.88-13.46,8.88h-48.92c-5.86,0-11.16-3.5-13.47-8.89Z"/>
              </g>
              <path className="cls-1" d="M1257.87,17.79l92.14,215.71c4.13,9.66-2.96,20.4-13.47,20.4h-42.95c-5.92,0-11.25-3.56-13.52-9.02l-76.02-182.81c-4.01-9.64,3.08-20.27,13.52-20.27h0c10.5,0,17.59,10.72,13.47,20.38l-77.83,182.81c-2.3,5.4-7.6,8.91-13.47,8.91h-36.71c-10.51,0-17.6-10.75-13.46-20.41l92.45-215.71c2.31-5.38,7.6-8.88,13.46-8.88h48.92c5.86,0,11.16,3.5,13.47,8.89Z"/>
              <path className="cls-1" d="M418.92,17.79l92.14,215.71c4.13,9.66-2.96,20.4-13.47,20.4h-42.95c-5.92,0-11.25-3.56-13.52-9.02l-76.02-182.81c-4.01-9.64,3.08-20.27,13.52-20.27h0c10.5,0,17.59,10.72,13.47,20.38l-77.83,182.81c-2.3,5.4-7.6,8.91-13.47,8.91h-36.71c-10.51,0-17.6-10.75-13.46-20.41L343.06,17.78c2.31-5.38,7.6-8.88,13.46-8.88h48.92c5.86,0,11.16,3.5,13.47,8.89Z"/>
              <path className="cls-1" d="M236.11,169.5L20.4,261.64c-9.66,4.13-20.4-2.96-20.4-13.47v-42.95c0-5.92,3.56-11.25,9.02-13.52l182.81-76.02c9.64-4.01,20.27,3.08,20.27,13.52h0c0,10.5-10.72,17.59-20.38,13.47L8.91,64.84c-5.4-2.3-8.91-7.6-8.91-13.47V14.66C0,4.15,10.75-2.94,20.41,1.2l215.71,92.45c5.38,2.31,8.88,7.6,8.88,13.46v48.92c0,5.86-3.5,11.16-8.89,13.47Z"/>
              <path className="cls-1" d="M1398.93,238.08V79.68c0-8.74-7.08-15.82-15.82-15.82h-43.6c-8.74,0-15.82-7.08-15.82-15.82v-23.3c0-8.74,7.08-15.82,15.82-15.82h187.8c8.74,0,15.82,7.08,15.82,15.82v23.3c0,8.74-7.08,15.82-15.82,15.82h-43.25c-8.74,0-15.82,7.08-15.82,15.82v158.4c0,8.74-7.08,15.82-15.82,15.82h-37.65c-8.74,0-15.82-7.08-15.82-15.82Z"/>
            </g>
            <text className="cls-2" transform="translate(135.85 408.95)">
              <tspan x="0" y="0">You Always on The Guest List</tspan>
            </text>
          </svg>
        </div>
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
        }

        .logo-svg {
          width: 200px;
          height: auto;
          max-width: 90vw;
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
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
        }

        @media (max-width: 480px) {
          .logo-svg {
            width: 140px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
