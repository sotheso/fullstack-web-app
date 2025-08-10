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
    <div className="home-container">
      <TopBar />

      <div style={{ height: 120 }} />

      {/* Banner Card - New Position */}
      <SectionTitle>!اگه قرار باشه فقط یه جا بری</SectionTitle>
      <BannerCard />

      {/* Event Card Carousel - New Position */}
      <SectionTitle>:بهترین هایی که دعوتی</SectionTitle>
      <div className="carousel-container">
        <EventCardCarousel />
      </div>

      <div style={{ height: 60 }} />
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <SectionTitle>:همه جاهایی که دعوتی</SectionTitle>
      </div>

      {/* Filter Buttons */}
      <div className="filter-bar">
        {filterOptions.map((option, idx) => (
          <FilterButton
            key={option.label}
            label={option.label}
            active={activeFilter === idx}
            onClick={() => setActiveFilter(idx)}
          />
        ))}
      </div>

      <div
        className="events-grid"
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

      <div style={{ height: 140 }} />


      <style jsx>{`
        .home-container {
          padding-left: 20px;
          padding-right: 20px;
          padding-top: 0;
        }

        @media (min-width: 768px) {
          .home-container {
            padding-left: 94px;
            padding-right: 94px;
            padding-top: 0;
          }
        }

        .carousel-container {
          position: relative;
          left: -20px;
          width: calc(100% + 40px);
          padding-left: 10px;
          padding-right: 10px;
          box-sizing: border-box;
        }

        @media (min-width: 768px) {
          .carousel-container {
            left: -94px;
            width: calc(100% + 188px);
          }
        }

        .filter-bar {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin: 24px 0;
        }

        @media (min-width: 768px) {
          .filter-bar {
            justify-content: flex-end;
          }
        }

        .events-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin: 32px auto;
          width: 100%;
          max-width: 373px;
        }

        @media (min-width: 768px) {
          .events-grid {
            grid-template-columns: repeat(auto-fit, minmax(373px, 1fr));
            column-gap: 12px;
            max-width: none;
          }
        }

        @media (min-width: 1200px) {
          .events-grid {
            grid-template-columns: repeat(4, 373px);
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage; 