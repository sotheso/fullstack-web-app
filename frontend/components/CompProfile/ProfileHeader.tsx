import React from 'react';
import { useRouter } from 'next/router';

interface ProfileHeaderProps {
  userName: string;
  userPhone: string;
  userAvatar?: string;
  onBackClick?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  userName, 
  userPhone, 
  userAvatar = '/iconProfile.svg',
  onBackClick 
}) => {
  const router = useRouter();
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.push('/settings');
    }
  };

  return (
    <div className="profile-header">
      <div className="user-info">
        <div className="user-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="31.5" fill="#F3F3F3" stroke="#EDEDED"/>
            <g transform="translate(20, 20)">
              <path d="M12 3.75C9.92893 3.75 8.25 5.42893 8.25 7.5C8.25 9.57107 9.92893 11.25 12 11.25C14.0711 11.25 15.75 9.57107 15.75 7.5C15.75 5.42893 14.0711 3.75 12 3.75Z" fill="#F26430"/>
              <path d="M8 13.25C5.92893 13.25 4.25 14.9289 4.25 17V18.1883C4.25 18.9415 4.79588 19.5837 5.53927 19.7051C9.8181 20.4037 14.1819 20.4037 18.4607 19.7051C19.2041 19.5837 19.75 18.9415 19.75 18.1883V17C19.75 14.9289 18.0711 13.25 16 13.25H15.6591C15.4746 13.25 15.2913 13.2792 15.1159 13.3364L14.2504 13.6191C12.7881 14.0965 11.2119 14.0965 9.74959 13.6191L8.88407 13.3364C8.70869 13.2792 8.52536 13.25 8.34087 13.25H8Z" fill="#F26430"/>
            </g>
          </svg>
        </div>
        <div className="user-details">
          <h2 className="user-name">{userName}</h2>
          <p className="user-phone">{userPhone}</p>
        </div>
      </div>
      
      <button 
        className="back-button"
        onClick={handleBackClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.03033 9.53033C5.73744 9.82322 5.26256 9.82322 4.96967 9.53033L0.96967 5.53033C0.676777 5.23744 0.676777 4.76256 0.96967 4.46967L4.96967 0.46967C5.26256 0.176777 5.73744 0.176777 6.03033 0.46967C6.32322 0.762563 6.32322 1.23744 6.03033 1.53033L2.56066 5L6.03033 8.46967C6.32322 8.76256 6.32322 9.23744 6.03033 9.53033Z" fill="#F26430"/>
        </svg>
      </button>

      <style jsx>{`
        .profile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
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

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .user-details {
          flex: 1;
          text-align: right;
        }

        .user-name {
          font-family: Ravi;
          font-size: 16px;
          font-weight: 600;
          color: #000;
          margin: 0 0 4px 0;
          text-align: right;
          line-height: 1.3;
        }

        .user-phone {
          font-family: Ravi;
          font-size: 14px;
          color: #666;
          margin: 0;
          text-align: right;
          line-height: 1.3;
        }

        .user-avatar {
          width: 64px;
          height: 64px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-avatar svg {
          width: 100%;
          height: 100%;
        }

        @media (min-width: 768px) {
          .profile-header {
            padding: 0 8px;
          }

          .user-name {
            font-size: 18px;
          }

          .user-phone {
            font-size: 15px;
          }

          .user-avatar {
            width: 72px;
            height: 72px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileHeader;
