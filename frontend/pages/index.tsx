import React, { useRef, useEffect, useState } from 'react';
import EventCard from '../components/CompViewAsli/EventCard';
import TopBar from '../components/CompViewAsli/TopBar';
import EventCardCarousel from '../components/CompViewAsli/StoryCards';
import BannerCard from '../components/CompViewAsli/TopBanner';
import SectionTitle from '../components/CompViewAsli/CompDetails/Text/SectionTitle';
import FilterButton from '../components/CompViewAsli/CompDetails/ButtonCard/FilterButton';
import BottomImage from '../components/CompViewAsli/BottomImage';

const filterOptions = [
  { label: 'نزدیک‌ترین' },
  { label: 'محبوب‌ترین' },
  { label: 'جدیدترین' },
];

const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <div style={{ paddingLeft: '94px', paddingRight: '94px' }}>
      <style jsx>{`
        @media (max-width: 700px) {
          div[style*='padding-left: 94px'] {
            padding-left: 54px !important;
            padding-right: 54px !important;
          }
        }
      `}</style>
      
      
      <TopBar />

      <div style={{ height: 64 }} />


      {/* Banner Card - New Position */}
      <SectionTitle>!اگه قرار باشه فقط یه جا بری</SectionTitle>
      <BannerCard />


      {/* Event Card Carousel - New Position */}
      <SectionTitle>:بهترین هایی که دعوتی</SectionTitle>
      <div style={{
        position: 'relative',
        left: '-94px',
        width: 'calc(100% + 188px)',
        paddingLeft: '10px',
        paddingRight: '10px',
        boxSizing: 'border-box'
      }}>
        <EventCardCarousel />
      </div>


      <div style={{ height: 60 }} />
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <SectionTitle>:همه جاهایی که دعوتی</SectionTitle>
      </div>


      {/* Filter Buttons */}
      <div
        style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', margin: '24px 0' }}
        className="filter-bar-responsive"
      >
        {filterOptions.map((option, idx) => (
          <FilterButton
            key={option.label}
            label={option.label}
            active={activeFilter === idx}
            onClick={() => setActiveFilter(idx)}
          />
        ))}
      </div>
      <style jsx>{`
        @media (max-width: 700px) {
          div[style*='padding-left: 94px'] {
            padding-left: 54px !important;
            padding-right: 54px !important;
          }
          .filter-bar-responsive {
            justify-content: center !important;
          }
        }
      `}</style>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(373px, 1fr))',
          columnGap: -100, // فاصله افقی کم
          rowGap: 32,    // فاصله عمودی فعلی
          margin: '32px auto',
          maxWidth: (4 * 373) + (3 * 12), // برای ۴ کارت
          width: '100%',
          justifyContent: 'center',
          justifyItems: 'center',
          direction: 'ltr',
        }}
      >
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>


      <div style={{ height: 64 }} />


      <SectionTitle>برندها</SectionTitle>
      <BottomImage />
    </div>
  );
};

export default HomePage; 