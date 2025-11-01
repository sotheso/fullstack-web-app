import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DetailsImage from '../components/CompViewDetails/DetailsImage';
import EventInfoCard from '../components/CompViewDetails/EventInfoCard';
import DateTimeCard from '../components/CompViewDetails/DateTimeCard';
import AddressCard from '../components/CompViewDetails/AddressCard';
import EventProgramCard from '../components/CompViewDetails/EventProgramCard';
import BrandsCard from '../components/CompViewDetails/BrandsCard';
import { EventData } from '../services/api';
import { useEventDetailsContext } from '../contexts/EventDetailsContext';
import { useRegisteredEvents } from '../contexts/RegisteredEventsContext';
import Loader from '../components/Loader';
import OfflineErrorPage from '../components/OfflineErrorPage';
import { useNetwork } from '../contexts/NetworkContext';

const DetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [mounted, setMounted] = useState(false);
  const { getEventData, fetchEventData, loading, error } = useEventDetailsContext();
  const { isOnline } = useNetwork();
  const { registerForEvent, unregisterFromEvent, isRegistered } = useRegisteredEvents();

  // Track when component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // صبر کن تا router آماده بشه (برای client-side navigation)
    if (!router.isReady || !mounted) {
      return;
    }

    console.log('[DetailsPage] useEffect triggered, id:', id);
    if (id && typeof id === 'string') {
      // ابتدا چک کن آیا در cache هست
      const cachedData = getEventData(id);
      console.log('[DetailsPage] Cached data:', cachedData ? 'Found' : 'Not found');
      if (cachedData) {
        console.log('[DetailsPage] Setting cached data');
        setEventData(cachedData);
      } else {
        // اگر نبود، از API بگیر
        console.log('[DetailsPage] Fetching from API');
        fetchEventData(id).then(data => {
          if (data) {
            console.log('[DetailsPage] Fetched event data:', data);
            console.log('[DetailsPage] Programs:', data.programs);
            console.log('[DetailsPage] Brands:', data.brands);
            setEventData(data);
          }
        });
      }
    }
  }, [router.isReady, id, getEventData, fetchEventData, mounted]);

  // داده‌های پیش‌فرض اگر ایونت پیدا نشد یا در حال بارگذاری
  const defaultData: EventData = {
    eventName: 'ایونت بساط',
    description: 'وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه! پس سیخ یادتون نره!',
    date: 'پنجشنبه، ۲۴ فروردین',
    image: '/banner.png',
    images: ['/banner.png'],
    address: 'خیابان ایرانشهر، تقاطع بهشتی، کوچه علیمرادی، پلاک ۱۲، کافه عمارت دل',
    mapUrl: 'https://maps.google.com/?q=خیابان+ایرانشهر+تقاطع+بهشتی+کوچه+علیمرادی+پلاک+۱۲+کافه+عمارت+دل',
    timeDetails: '۲۵ فروردین الی ۳ اسفند - از ساعت ۲۲ تا ۴ صبح',
    programs: [
      {
        day: "چهارشنبه",
        date: "۲۲ فروردین",
        description: "موسیقی زنده بعلاوه پذیرایی و خرید"
      },
      {
        day: "پنج‌شنبه", 
        date: "۲۳ فروردین",
        description: "موسیقی زنده بعلاوه پذیرایی و خرید"
      },
      {
        day: "جمعه",
        date: "۲۴ فروردین", 
        description: "موسیقی زنده بعلاوه پذیرایی و خرید"
      }
    ],
    brands: [
      { id: '1', name: 'لویی ویتون', isSelected: false },
      { id: '2', name: 'دولچه گابانا', isSelected: false },
      { id: '3', name: 'سواروسکی', isSelected: false },
      { id: '4', name: 'دولچه لویی گابام', isSelected: true },
      { id: '5', name: 'گابانا سواروسکی', isSelected: false }
    ]
  };

  // اگر component هنوز mount نشده یا router هنوز آماده نیست، منتظر بمان
  if (!mounted || !router.isReady) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Loader />
      </div>
    );
  }

  // اگر id وجود ندارد، صفحه خطا نشان بده
  if (!id || typeof id !== 'string') {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <p style={{ color: '#F26430', fontSize: '18px', fontFamily: 'Ravi' }}>ایونت یافت نشد</p>
        <button 
          onClick={() => router.back()}
          style={{
            padding: '12px 24px',
            background: '#F26430',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontFamily: 'Ravi',
            cursor: 'pointer'
          }}
        >
          بازگشت
        </button>
      </div>
    );
  }

  const data = eventData || defaultData;
  
  console.log('[DetailsPage] Rendering with data:', {
    hasEventData: !!eventData,
    hasPrograms: !!data.programs,
    hasBrands: !!data.brands,
    brandsCount: data.brands?.length || 0
  });

  // Handle registration button click
  const handleRegister = () => {
    if (eventData) {
      if (isRegistered(String(eventData.id))) {
        unregisterFromEvent(String(eventData.id));
      } else {
        registerForEvent(eventData);
      }
    }
  };

  const registered = eventData ? isRegistered(String(eventData.id)) : false;

  // اگر نت قطع است و داده cache شده نداریم
  if (!isOnline && !eventData) {
    return <OfflineErrorPage />;
  }

  if (loading && !eventData) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Loader />
      </div>
    );
  }

  if (error && !eventData && isOnline) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <p style={{ color: '#F26430', fontSize: '18px', fontFamily: 'Ravi' }}>{error}</p>
        <button 
          onClick={() => router.back()}
          style={{
            padding: '12px 24px',
            background: '#F26430',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontFamily: 'Ravi',
            cursor: 'pointer'
          }}
        >
          بازگشت
        </button>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        
        @media (min-width: 768px) {
          .main-content {
            gap: 24px;
          }
        }
        
        @media (min-width: 1024px) {
          .main-content {
            gap: 32px;
          }
        }
      `}</style>
      <div>
        <div className="details-container">
        <div style={{ height: 16 }} />
        <div style={{ height: 20 }} />
        {/* Main content */}
        <div className="main-content">
          {/* Banner box */}
          <DetailsImage images={data.images && data.images.length > 0 ? data.images : [data.image || '/banner.png']} />
          
          {/* Title and Description Section */}
          <EventInfoCard
            title={data.eventName}
            description={data.description}
          />

          {/* Date and Time Section */}
          {(data.timeDetails || data.date) && (
            <DateTimeCard
              time={data.timeDetails || data.date}
              date={data.date !== data.timeDetails ? `تاریخ برگزاری: ${data.date}` : undefined}
            />
          )}

          {/* Address Section */}
          {data.address && (
            <AddressCard
              address={data.address}
              mapUrl={data.mapUrl}
            />
          )}

          {/* Program Section */}
          {data.programs && data.programs.length > 0 && (
            <EventProgramCard programs={data.programs} />
          )}

          {/* Brands Section */}
          {data.brands && data.brands.length > 0 && (
            <BrandsCard brands={data.brands} />
          )}

        </div>

        <div style={{ height: 120 }} />

        </div>

        {/* Register Button - Same style as TopBar */}
        <div style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 20,
          zIndex: 9999,
          display: 'flex',
          width: '240px',
          height: '52px',
          padding: '10px 14px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '90px',
          background: registered ? 'rgba(34, 197, 94, 0.15)' : 'rgba(242, 100, 48, 0.15)',
          boxShadow: '0 0 8px 0 rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: registered ? '2px solid rgba(34, 197, 94, 0.30)' : '2px solid rgba(242, 100, 48, 0.30)',
          transition: 'all 0.3s ease-in-out',
        }}>
          <button
            onClick={handleRegister}
            style={{
              background: 'transparent',
              border: 'none',
              color: registered ? '#22c55e' : '#F26430',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: 'Ravi',
              cursor: 'pointer',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {registered ? (
              <>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                ثبت نام شده
              </>
            ) : (
              'ثبت نام'
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailsPage; 