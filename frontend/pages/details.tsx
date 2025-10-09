import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DetailsImage from '../components/CompViewDetails/DetailsImage';
import EventInfoCard from '../components/CompViewDetails/EventInfoCard';
import DateTimeCard from '../components/CompViewDetails/DateTimeCard';
import AddressCard from '../components/CompViewDetails/AddressCard';
import EventProgramCard from '../components/CompViewDetails/EventProgramCard';
import BrandsCard from '../components/CompViewDetails/BrandsCard';
import { eventsAPI, EventData } from '../services/api';
import Loader from '../components/Loader';

const DetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchEventData();
    }
  }, [id]);

  const fetchEventData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventsAPI.getEventById(id as string);
      setEventData(response.data);
    } catch (err) {
      console.error('Error fetching event data:', err);
      setError('خطا در دریافت اطلاعات ایونت');
    } finally {
      setLoading(false);
    }
  };

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

  const data = eventData || defaultData;

  if (loading) {
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

  if (error && !eventData) {
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
      </div>
    </>
  );
};

export default DetailsPage; 