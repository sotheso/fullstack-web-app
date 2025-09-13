import React from 'react';
import DetailsImage from '../components/CompViewDetails/DetailsImage';
import EventInfoCard from '../components/CompViewDetails/EventInfoCard';
import DateTimeCard from '../components/CompViewDetails/DateTimeCard';
import AddressCard from '../components/CompViewDetails/AddressCard';
import EventProgramCard from '../components/CompViewDetails/EventProgramCard';
import BrandsCard from '../components/CompViewDetails/BrandsCard';

const DetailsPage: React.FC = () => {
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
          <DetailsImage images={["image1.jpg", "image2.jpg"]} />
          
          {/* Title and Description Section */}
          <EventInfoCard
            title="ایونت بساط"
            description="وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه! پس سیخ یادتون نره!وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه! پس سیخ یادتون نره!وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه! پس سیخ یادتون نره!وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه! پس سیخ یادتون نره!"
          />

          {/* Date and Time Section */}
          <DateTimeCard
            time="۲۵ فروردین الی ۳ اسفند - از ساعت ۲۲ تا ۴ صبح"
            date="تاریخ برگزاری: ۲۵ فروردین ۱۴۰۳"
          />

          {/* Address Section */}
          <AddressCard
            address="خیابان ایرانشهر، تقاطع بهشتی، کوچه علیمرادی، پلاک ۱۲، کافه عمارت دل"
            mapUrl="https://maps.google.com/?q=خیابان+ایرانشهر+تقاطع+بهشتی+کوچه+علیمرادی+پلاک+۱۲+کافه+عمارت+دل"
          />

          {/* Program Section */}
          <EventProgramCard
            programs={[
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
            ]}
          />

          {/* Brands Section */}
          <BrandsCard
            brands={[
              { id: '1', name: 'لویی ویتون', isSelected: false },
              { id: '2', name: 'دولچه گابانا', isSelected: false },
              { id: '3', name: 'سواروسکی', isSelected: false },
              { id: '4', name: 'دولچه لویی گابام', isSelected: true },
              { id: '5', name: 'گابانا سواروسکی', isSelected: false }
            ]}
          />

        </div>

        <div style={{ height: 120 }} />

        </div>
      </div>
    </>
  );
};

export default DetailsPage; 