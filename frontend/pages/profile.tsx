import React from 'react';
import { useRouter } from 'next/router';
import EventCard from '../components/CompViewAsli/EventCard';
import ProfileHeader from '../components/CompProfile/ProfileHeader';
import { EventCardData } from '../Functions/eventCardInfo';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // Debug logging
  React.useEffect(() => {
    console.log('Profile page loaded successfully!');
    console.log('Current path:', router.pathname);
  }, [router.pathname]);

  // Sample user data
  const userData = {
    name: 'سجاد کنگرانی فراهانی',
    phone: '۰۹۱۰۶۷۰۴۳۳۲',
    avatar: '/iconProfile.svg'
  };

  // Sample events data
  const userEvents: EventCardData[] = [
    {
      id: '1',
      image: '/banner.png',
      eventName: 'ایونت بساط',
      description: 'وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه!',
      date: 'پنجشنبه، ۲۴ فروردین',
      tags: ['بازارچه'],
      filterTag: 'بازارچه',
      detailsLink: '/details'
    },
    {
      id: '2',
      image: '/banner.png',
      eventName: 'ایونت بساط',
      description: 'وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه!',
      date: 'پنجشنبه، ۲۴ فروردین',
      tags: ['بازارچه'],
      filterTag: 'بازارچه',
      detailsLink: '/details'
    },
    {
      id: '3',
      image: '/banner.png',
      eventName: 'ایونت بساط',
      description: 'وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه!',
      date: 'پنجشنبه، ۲۴ فروردین',
      tags: ['بازارچه'],
      filterTag: 'بازارچه',
      detailsLink: '/details'
    }
  ];

  const menuItems = [
    {
      id: 'about',
      title: 'درباره ما',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'invite',
      title: 'دعوت از دوستان',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="8.5" cy="7" r="4" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 8V14" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 11H17" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'terms',
      title: 'قوانین و شرایط استفاده',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 13H8" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 17H8" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 9H8" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  const handleMenuClick = (itemId: string) => {
    // Handle menu item clicks
    console.log('Menu item clicked:', itemId);
  };

  const handleMoreEvents = () => {
    // Navigate to events page or load more events
    router.push('/events');
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <ProfileHeader 
        userName={userData.name}
        userPhone={userData.phone}
        userAvatar={userData.avatar}
        onBackClick={() => router.back()}
      />

      {/* Page Title */}
      <h1 className="page-title">ایونت های من</h1>

      {/* Events Section */}
      <div className="events-section">
        {userEvents.map((event) => (
          <div key={event.id} className="event-card-wrapper">
            <EventCard eventData={event} />
          </div>
        ))}
      </div>

      {/* More Events Button */}
      <div className="more-events-section">
        <div className="dots-indicator">...</div>
        <button className="more-events-button" onClick={handleMoreEvents}>
          ایونت های بیشتر
        </button>
      </div>

      {/* Menu Section */}
      <div className="menu-section">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            className="menu-item"
            onClick={() => handleMenuClick(item.id)}
          >
            <div className="menu-item-content">
              <span className="menu-item-title">{item.title}</span>
              <div className="menu-item-icon">
                {item.icon}
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}
      </div>

      <style jsx>{`
        .profile-container {
          min-height: 100vh;
          background: #FCFCFC;
          padding: 20px;
          direction: rtl;
        }


        .page-title {
          font-family: Ravi;
          font-size: 24px;
          font-weight: 700;
          color: #000;
          margin: 0 0 24px 0;
          text-align: right;
        }

        .events-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .event-card-wrapper {
          width: 100%;
          max-width: 360px;
          margin: 0 auto;
        }

        .more-events-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 48px;
        }

        .dots-indicator {
          font-size: 24px;
          color: #666;
          font-weight: bold;
        }

        .more-events-button {
          padding: 12px 24px;
          border: 1px solid #F26430;
          background: transparent;
          color: #F26430;
          border-radius: 24px;
          font-family: Ravi;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .more-events-button:hover {
          background: #F26430;
          color: #fff;
        }

        .menu-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          background: none;
          border: none;
          border-bottom: 1px solid #EDEDED;
          cursor: pointer;
          width: 100%;
        }

        .menu-item:last-child {
          border-bottom: none;
        }

        .menu-item-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .menu-item-title {
          font-family: Ravi;
          font-size: 16px;
          color: #000;
          text-align: right;
        }

        .menu-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .profile-container {
            padding: 40px 94px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .events-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
            gap: 24px;
            justify-items: center;
          }

          .event-card-wrapper {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
