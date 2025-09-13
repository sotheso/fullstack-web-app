import React, { useState, useEffect } from 'react';
import EventCard from '../components/CompViewAsli/EventCard';
import { EventCardData } from '../Functions/eventCardInfo';

const EventsPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state during hydration to prevent mismatch
  if (!mounted) {
    return (
      <div style={{ 
        padding: '20px',
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          fontSize: '18px',
          color: '#666',
          fontFamily: 'Ravi'
        }}>
          در حال بارگذاری...
        </div>
      </div>
    );
  }

  // Sample data for testing all EventCard variations
  const sampleEventData: EventCardData[] = [
    {
      id: 'event-1',
      image: '/banner.png',
      eventName: 'ایونت بساط',
      description: 'وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه!',
      date: 'پنجشنبه، ۲۴ فروردین',
      tags: ['بازارچه'],
      filterTag: 'بازارچه',
      detailsLink: '/details'
    },
    {
      id: 'event-2',
      image: '/banner.png',
      eventName: 'کنسرت موسیقی کلاسیک',
      description: 'شب موسیقی و هنر با بهترین نوازندگان شهر. اجرای آثار کلاسیک و معاصر در فضایی آرام و دلنشین.',
      date: 'شنبه، ۲۶ فروردین',
      tags: ['موزیک', 'هنر'],
      filterTag: 'موزیک',
      detailsLink: '/details'
    },
    {
      id: 'event-3',
      image: '/banner.png',
      eventName: 'کارگاه آموزشی تکنولوژی',
      description: 'آموزش مهارت‌های جدید در حوزه تکنولوژی و برنامه‌نویسی برای علاقه‌مندان',
      date: 'یکشنبه، ۲۷ فروردین',
      tags: ['دانش', 'تکنولوژی'],
      filterTag: 'دانش',
      detailsLink: '/details'
    },
    {
      id: 'event-4',
      image: '/banner.png',
      eventName: 'نمایشگاه هنر معاصر',
      description: 'نمایش آثار هنرمندان جوان و تجربه‌های نو در هنر معاصر',
      date: 'دوشنبه، ۲۸ فروردین',
      tags: ['هنر', 'نمایشگاه'],
      filterTag: 'هنر',
      detailsLink: '/details'
    },
    {
      id: 'event-5',
      image: '/banner.png',
      eventName: 'جشنواره غذاهای محلی',
      description: 'تجربه طعم‌های اصیل و محلی از سراسر کشور در یک مکان',
      date: 'سه‌شنبه، ۲۹ فروردین',
      tags: ['غذا', 'فرهنگ'],
      filterTag: 'غذا',
      detailsLink: '/details'
    },
    {
      id: 'event-6',
      image: '/banner.png',
      eventName: 'ورزشگاه عمومی',
      description: 'برنامه‌های ورزشی گروهی و تفریحی برای همه سنین',
      date: 'چهارشنبه، ۳۰ فروردین',
      tags: ['ورزش', 'سلامت'],
      filterTag: 'ورزش',
      detailsLink: '/details'
    },
    {
      id: 'event-7',
      image: '/banner.png',
      eventName: 'سینمای روباز',
      description: 'پخش فیلم‌های کلاسیک و جدید در فضای باز و رمانتیک',
      date: 'پنجشنبه، ۱ اردیبهشت',
      tags: ['سینما', 'تفریح'],
      filterTag: 'سینما',
      detailsLink: '/details'
    },
    {
      id: 'event-8',
      image: '/banner.png',
      eventName: 'بازارچه دست‌سازها',
      description: 'فروشگاه محصولات دست‌ساز و هنری از هنرمندان محلی',
      date: 'جمعه، ۲ اردیبهشت',
      tags: ['بازارچه', 'دست‌ساز'],
      filterTag: 'بازارچه',
      detailsLink: '/details'
    },
    {
      id: 'event-9',
      image: '/banner.png',
      eventName: 'کتابخانه سیار',
      description: 'امکان مطالعه و امانت کتاب در فضای باز و آرام',
      date: 'شنبه، ۳ اردیبهشت',
      tags: ['کتاب', 'مطالعه'],
      filterTag: 'کتاب',
      detailsLink: '/details'
    }
  ];

  const handleFilter = (filterTag: string) => {
    console.log('Filter clicked:', filterTag);
  };

  return (
    <div className="events-container">
      <div style={{ 
        padding: '20px',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '30px',
          color: '#333',
          fontFamily: 'Ravi'
        }}>
          همه ایونت‌ها
        </h1>
        
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          color: '#666',
          fontSize: '16px'
        }}>
          نمایش تمام ایونت‌ها با محتوای مختلف
        </div>

        {/* Event Cards Grid */}
        <div className="event-cards-grid">
          {sampleEventData.map((eventData, index) => (
            <div key={eventData.id} style={{ marginBottom: '20px' }}>
              <div style={{
                fontSize: '14px',
                color: '#888',
                marginBottom: '8px',
                textAlign: 'right'
              }}>
                کارت شماره {index + 1} - {eventData.filterTag}
              </div>
              <EventCard
                eventData={eventData}
                onFilter={handleFilter}
              />
            </div>
          ))}
        </div>

        {/* Default EventCard (without props) */}
        <div style={{ marginTop: '40px', marginBottom: '20px' }}>
          <div style={{
            fontSize: '14px',
            color: '#888',
            marginBottom: '8px',
            textAlign: 'right'
          }}>
            کارت پیش‌فرض (بدون props)
          </div>
          <EventCard />
        </div>

        {/* Statistics */}
        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{
            textAlign: 'center',
            marginBottom: '15px',
            color: '#333'
          }}>
            آمار ایونت‌ها
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#F26430' }}>
                {sampleEventData.length}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>کارت با داده</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#F26430' }}>
                1
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>کارت پیش‌فرض</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#F26430' }}>
                {new Set(sampleEventData.map(e => e.filterTag)).size}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>دسته‌بندی مختلف</div>
            </div>
          </div>
        </div>

        {/* Filter Tags */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{
            textAlign: 'center',
            marginBottom: '15px',
            color: '#333'
          }}>
            دسته‌بندی‌های موجود
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center'
          }}>
            {Array.from(new Set(sampleEventData.map(e => e.filterTag))).map(tag => (
              <span key={tag} style={{
                padding: '6px 12px',
                backgroundColor: '#F26430',
                color: 'white',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .events-container {
          direction: rtl;
          font-family: 'Ravi', Arial, sans-serif;
        }

        .event-cards-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          max-width: 400px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .event-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
            gap: 30px;
            max-width: 1200px;
            justify-items: center;
          }
        }

        @media (min-width: 1200px) {
          .event-cards-grid {
            grid-template-columns: repeat(3, 360px);
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default EventsPage;
