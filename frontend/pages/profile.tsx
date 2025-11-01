import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import EventCard from '../components/CompViewAsli/EventCard';
import ProfileHeader from '../components/CompProfile/ProfileHeader';
import { EventCardData } from '../Functions/eventCardInfo';
import { useRegisteredEvents } from '../contexts/RegisteredEventsContext';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [isEventsExpanded, setIsEventsExpanded] = React.useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = React.useState(false);
  const [isInviteExpanded, setIsInviteExpanded] = React.useState(false);
  const [isTermsExpanded, setIsTermsExpanded] = React.useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { registeredEvents } = useRegisteredEvents();
  
  // Pagination state for registered events
  const [eventsPage, setEventsPage] = useState(1);
  const eventsPerPage = 8;

  // Load user data from localStorage or fetch from server
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // First try to get from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserData({
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
            phone: user.phone,
            email: user.email,
            avatar: '/iconProfile.svg'
          });
          setIsLoading(false);
          return;
        }

        // If no localStorage data, redirect to login
        router.push('/login');
      } catch (error) {
        console.error('Error loading user data:', error);
        router.push('/login');
      }
    };

    loadUserData();
  }, [router]);

  // Debug logging
  React.useEffect(() => {
    console.log('Profile page loaded successfully!');
    console.log('Current path:', router.pathname);
    console.log('User data:', userData);
  }, [router.pathname, userData]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Convert registered events to EventCardData format
  const allUserEvents: EventCardData[] = registeredEvents.map(event => ({
    id: String(event.id),
    image: event.image || '/banner.png',
    eventName: event.eventName,
    description: event.description,
    date: event.date,
    tags: event.tags || [],
    filterTag: event.filterTag || '',
    detailsLink: `/details?id=${event.id}`
  }));

  // Pagination calculations
  const totalEventsPages = Math.ceil(allUserEvents.length / eventsPerPage);
  const startIndex = (eventsPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const userEvents = allUserEvents.slice(startIndex, endIndex);

  const menuItems = [
    {
      id: 'events',
      title: 'ایونت های من',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2V5" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2V5" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 10H21" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 10V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V10" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      isExpandable: true,
      isExpanded: isEventsExpanded
    },
    {
      id: 'about',
      title: 'درباره ما',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M9.07602 1.53997C9.26045 1.61849 9.38016 1.79956 9.38016 2.00001V6.66547H12.0002C12.178 6.66547 12.3424 6.7599 12.432 6.91346C12.5216 7.06703 12.5229 7.25664 12.4355 7.41144L12.1074 7.99201C10.8633 10.1938 9.27676 12.1835 7.40721 13.8865L6.87687 14.3696C6.7305 14.503 6.51923 14.5374 6.33812 14.4574C6.157 14.3774 6.04016 14.198 6.04016 14V9.37411H3.3335C3.05735 9.37411 2.8335 9.15025 2.8335 8.87411C2.8335 8.78467 2.85698 8.70071 2.89812 8.62807C4.07064 6.46044 5.57183 4.48746 7.34831 2.77931L8.53361 1.6396C8.6781 1.50066 8.89159 1.46145 9.07602 1.53997ZM4.18988 8.37411H6.54016C6.81631 8.37411 7.04016 8.59796 7.04016 8.87411V12.863C8.65257 11.3393 10.0346 9.58845 11.1424 7.66547H8.88016C8.60402 7.66547 8.38016 7.44161 8.38016 7.16547V3.17442L8.04142 3.50014C6.5409 4.94295 5.24537 6.58296 4.18988 8.37411Z" fill="#F26430"/>
        </svg>
      ),
      isExpandable: true,
      isExpanded: isAboutExpanded
    },
    {
      id: 'invite',
      title: 'دعوت از دوستان',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M4.49984 5.00002C4.49984 3.43521 5.76836 2.16669 7.33317 2.16669C8.89798 2.16669 10.1665 3.43521 10.1665 5.00002C10.1665 6.56483 8.89798 7.83335 7.33317 7.83335C5.76836 7.83335 4.49984 6.56483 4.49984 5.00002ZM7.33317 3.16669C6.32065 3.16669 5.49984 3.9875 5.49984 5.00002C5.49984 6.01254 6.32065 6.83335 7.33317 6.83335C8.34569 6.83335 9.1665 6.01254 9.1665 5.00002C9.1665 3.9875 8.34569 3.16669 7.33317 3.16669Z" fill="#F26430"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M2.1665 11.3334C2.1665 9.95264 3.28579 8.83335 4.6665 8.83335H4.89375C5.01674 8.83335 5.13897 8.8528 5.25589 8.89098L5.8329 9.07939C6.80775 9.39771 7.85859 9.39771 8.83345 9.07939L9.41046 8.89098C9.52738 8.8528 9.6496 8.83335 9.77259 8.83335H9.99984C11.3805 8.83335 12.4998 9.95264 12.4998 11.3334V12.1255C12.4998 12.6277 12.1359 13.0559 11.6403 13.1368C8.78777 13.6025 5.87857 13.6025 3.02602 13.1368C2.53043 13.0559 2.1665 12.6277 2.1665 12.1255V11.3334ZM4.6665 9.83335C3.83808 9.83335 3.1665 10.5049 3.1665 11.3334V12.1255C3.1665 12.1376 3.17525 12.1479 3.18715 12.1498C5.93299 12.5981 8.73335 12.5981 11.4792 12.1498C11.4911 12.1479 11.4998 12.1376 11.4998 12.1255V11.3334C11.4998 10.5049 10.8283 9.83335 9.99984 9.83335H9.77259C9.75502 9.83335 9.73756 9.83613 9.72086 9.84159L9.14385 10.03C7.9673 10.4142 6.69904 10.4142 5.52249 10.03L4.94548 9.84159C4.92878 9.83613 4.91132 9.83335 4.89375 9.83335H4.6665Z" fill="#F26430"/>
          <path d="M12.9998 4.16669C13.276 4.16669 13.4998 4.39054 13.4998 4.66669V5.83335H14.6665C14.9426 5.83335 15.1665 6.05721 15.1665 6.33335C15.1665 6.6095 14.9426 6.83335 14.6665 6.83335H13.4998V8.00002C13.4998 8.27616 13.276 8.50002 12.9998 8.50002C12.7237 8.50002 12.4998 8.27616 12.4998 8.00002V6.83335H11.3332C11.057 6.83335 10.8332 6.6095 10.8332 6.33335C10.8332 6.05721 11.057 5.83335 11.3332 5.83335H12.4998V4.66669C12.4998 4.39054 12.7237 4.16669 12.9998 4.16669Z" fill="#F26430"/>
        </svg>
      ),
      isExpandable: true,
      isExpanded: isInviteExpanded
    },
    {
      id: 'terms',
      title: 'قوانین و شرایط استفاده',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path d="M5.5 5.33335C5.5 5.05721 5.72386 4.83335 6 4.83335H10.6667C10.9428 4.83335 11.1667 5.05721 11.1667 5.33335C11.1667 5.6095 10.9428 5.83335 10.6667 5.83335H6C5.72386 5.83335 5.5 5.6095 5.5 5.33335Z" fill="#F26430"/>
          <path d="M6 6.83335C5.72386 6.83335 5.5 7.05721 5.5 7.33335C5.5 7.6095 5.72386 7.83335 6 7.83335H9.33333C9.60948 7.83335 9.83333 7.6095 9.83333 7.33335C9.83333 7.05721 9.60948 6.83335 9.33333 6.83335H6Z" fill="#F26430"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M5.66667 2.16669C3.91777 2.16669 2.5 3.58445 2.5 5.33335V12C2.5 13.3807 3.61929 14.5 5 14.5H12.3333C12.9777 14.5 13.5 13.9777 13.5 13.3334V3.33335C13.5 2.68902 12.9777 2.16669 12.3333 2.16669H5.66667ZM12.5 9.50002V3.33335C12.5 3.24131 12.4254 3.16669 12.3333 3.16669H5.66667C4.47005 3.16669 3.5 4.13674 3.5 5.33335V9.99984C3.91783 9.68599 4.4372 9.50002 5 9.50002H12.5ZM12.5 10.5H5C4.17157 10.5 3.5 11.1716 3.5 12C3.5 12.8284 4.17157 13.5 5 13.5H12.3333C12.4254 13.5 12.5 13.4254 12.5 13.3334V10.5Z" fill="#F26430"/>
        </svg>
      ),
      isExpandable: true,
      isExpanded: isTermsExpanded
    },
    {
      id: 'logout',
      title: 'خروج از حساب',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path d="M6 3.5C6 3.22386 6.22386 3 6.5 3H13.5C13.7761 3 14 3.22386 14 3.5V12.5C14 12.7761 13.7761 13 13.5 13H6.5C6.22386 13 6 12.7761 6 12.5V3.5Z" fill="#F26430"/>
          <path d="M4.5 6L2 8.5L4.5 11" stroke="#F26430" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 8.5H9" stroke="#F26430" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      isExpandable: false,
      isExpanded: false
    }
  ];

  const handleMenuClick = (itemId: string) => {
    // Handle menu item clicks
    console.log('Menu item clicked:', itemId);
    
    if (itemId === 'events') {
      setIsEventsExpanded(!isEventsExpanded);
    } else if (itemId === 'about') {
      setIsAboutExpanded(!isAboutExpanded);
    } else if (itemId === 'invite') {
      setIsInviteExpanded(!isInviteExpanded);
    } else if (itemId === 'terms') {
      setIsTermsExpanded(!isTermsExpanded);
    } else if (itemId === 'logout') {
      handleLogout();
    }
  };

  const handleMoreEvents = () => {
    // Navigate to events page or load more events
    router.push('/events');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="profile-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // Show error if no user data
  if (!userData) {
    return (
      <div className="profile-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>خطا در بارگذاری اطلاعات کاربر</p>
          <button onClick={handleLogout} style={{ marginTop: '20px' }}>
            بازگشت به ورود
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <ProfileHeader 
        userName={userData.name}
        userPhone={userData.phone}
        userAvatar={userData.avatar}
      />

      {/* Menu Section */}
      <div className="menu-section">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item-container">
            <button 
              className="menu-item"
              onClick={() => handleMenuClick(item.id)}
            >
              <div className="menu-item-content">
                <span className="menu-item-title">{item.title}</span>
                <div className="menu-item-icon">
                  {item.icon}
                </div>
              </div>
              <svg 
                width="7" 
                height="10" 
                viewBox="0 0 7 10" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`arrow-icon ${item.isExpandable && item.isExpanded ? 'rotated' : ''}`}
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M6.03033 9.53033C5.73744 9.82322 5.26256 9.82322 4.96967 9.53033L0.96967 5.53033C0.676777 5.23744 0.676777 4.76256 0.96967 4.46967L4.96967 0.46967C5.26256 0.176777 5.73744 0.176777 6.03033 0.46967C6.32322 0.762563 6.32322 1.23744 6.03033 1.53033L2.56066 5L6.03033 8.46967C6.32322 8.76256 6.32322 9.23744 6.03033 9.53033Z" fill="#F26430"/>
              </svg>
            </button>
            
            {/* Expandable Content */}
            {item.isExpandable && item.isExpanded && (
              <div className="expanded-content">
                {item.id === 'events' && (
                  <>
                    {userEvents.length === 0 ? (
                      <div style={{
                        padding: '40px 20px',
                        textAlign: 'center',
                        color: '#888',
                        fontFamily: 'Ravi',
                      }}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="64" 
                          height="64" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          style={{ margin: '0 auto 16px' }}
                        >
                          <path d="M8 2V5" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 2V5" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3 10H21" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19 10V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V10" stroke="#F26430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p style={{ fontSize: '16px', marginBottom: '8px' }}>هنوز در هیچ ایونتی ثبت نام نکرده‌اید</p>
                        <p style={{ fontSize: '14px', color: '#aaa' }}>برای ثبت نام در ایونت‌ها، به صفحه جزئیات ایونت بروید</p>
                        <button 
                          onClick={handleMoreEvents}
                          style={{
                            marginTop: '20px',
                            padding: '12px 24px',
                            background: '#F26430',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '14px',
                            fontFamily: 'Ravi',
                            cursor: 'pointer',
                          }}
                        >
                          مشاهده ایونت‌ها
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="events-section">
                          {userEvents.map((event) => (
                            <div key={event.id} className="event-card-wrapper">
                              <EventCard eventData={event} />
                            </div>
                          ))}
                        </div>
                        
                        {/* Pagination - only show if more than 8 events */}
                        {totalEventsPages > 1 && (
                          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '16px 0 16px 0', alignItems: 'center' }}>
                            {/* Previous button */}
                            <button
                              onClick={() => {
                                const newPage = Math.max(1, eventsPage - 1);
                                setEventsPage(newPage);
                              }}
                              disabled={eventsPage === 1}
                              style={{
                                padding: '0 12px',
                                height: 36,
                                borderRadius: 18,
                                border: '1px solid #E5E5E5',
                                background: eventsPage === 1 ? '#F3F3F3' : '#F3F3F3',
                                color: eventsPage === 1 ? '#CCC' : '#000',
                                fontFamily: 'Ravi',
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: eventsPage === 1 ? 'not-allowed' : 'pointer',
                                opacity: eventsPage === 1 ? 0.5 : 1,
                              }}
                            >
                              قبلی
                            </button>

                            {/* Page numbers */}
                            {Array.from({ length: totalEventsPages }).map((_, i) => {
                              const pageNum = i + 1;
                              const isActive = pageNum === eventsPage;
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => setEventsPage(pageNum)}
                                  style={{
                                    minWidth: 36,
                                    height: 36,
                                    borderRadius: 18,
                                    border: '1px solid #E5E5E5',
                                    background: isActive ? '#F2C1AE' : '#F3F3F3',
                                    color: isActive ? '#F26430' : '#000',
                                    fontFamily: 'Ravi',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                  }}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}

                            {/* Next button */}
                            <button
                              onClick={() => {
                                const newPage = Math.min(totalEventsPages, eventsPage + 1);
                                setEventsPage(newPage);
                              }}
                              disabled={eventsPage === totalEventsPages}
                              style={{
                                padding: '0 12px',
                                height: 36,
                                borderRadius: 18,
                                border: '1px solid #E5E5E5',
                                background: eventsPage === totalEventsPages ? '#F3F3F3' : '#F3F3F3',
                                color: eventsPage === totalEventsPages ? '#CCC' : '#000',
                                fontFamily: 'Ravi',
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: eventsPage === totalEventsPages ? 'not-allowed' : 'pointer',
                                opacity: eventsPage === totalEventsPages ? 0.5 : 1,
                              }}
                            >
                              بعدی
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
                
                {item.id === 'about' && (
                  <div className="about-content">
                    <p className="about-text">
                      اپلیکیشن دعوت یک پلتفرم جامع برای مدیریت و شرکت در رویدادهای مختلف است. 
                      ما با ارائه امکانات متنوع و رابط کاربری ساده، تجربه‌ای به یاد ماندنی 
                      برای کاربران خود فراهم می‌کنیم.
                    </p>
                    <div className="about-features">
                      <div className="feature-item">
                        <span className="feature-icon">📅</span>
                        <span className="feature-text">مدیریت رویدادها</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-icon">👥</span>
                        <span className="feature-text">دعوت دوستان</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-icon">🎯</span>
                        <span className="feature-text">تجربه کاربری عالی</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {item.id === 'invite' && (
                  <div className="invite-content">
                    <p className="invite-text">
                      دوستان خود را به اپلیکیشن دعوت کنید و از امکانات ویژه بهره‌مند شوید!
                    </p>
                    <div className="invite-actions">
                      <button className="invite-button primary">
                        <span className="invite-icon">📱</span>
                        اشتراک‌گذاری لینک
                      </button>
                      <button className="invite-button secondary">
                        <span className="invite-icon">📋</span>
                        کپی لینک دعوت
                      </button>
                    </div>
                    <div className="invite-code">
                      <span className="invite-label">کد دعوت شما:</span>
                      <span className="invite-code-value">DAVVAT2024</span>
                    </div>
                  </div>
                )}
                
                {item.id === 'terms' && (
                  <div className="terms-content">
                    <div className="terms-section">
                      <h4 className="terms-title">قوانین استفاده</h4>
                      <ul className="terms-list">
                        <li>استفاده از اپلیکیشن فقط برای اهداف قانونی مجاز است</li>
                        <li>کاربران موظف به رعایت قوانین و مقررات هستند</li>
                        <li>اطلاعات شخصی کاربران محفوظ و محرمانه است</li>
                        <li>هرگونه سوءاستفاده از حساب کاربری ممنوع است</li>
                      </ul>
                    </div>
                    
                    <div className="terms-section">
                      <h4 className="terms-title">شرایط استفاده</h4>
                      <ul className="terms-list">
                        <li>کاربران باید بالای 18 سال سن داشته باشند</li>
                        <li>اطلاعات ارائه شده باید صحیح و به‌روز باشد</li>
                        <li>تیم دعوت حق تغییر قوانین را محفوظ می‌دارد</li>
                        <li>در صورت نقض قوانین، حساب کاربری مسدود خواهد شد</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProfilePage;
