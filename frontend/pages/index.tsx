import React, { useState } from 'react';
import EventCard from '../components/CompViewAsli/EventCard';
import TopBar from '../components/CompViewAsli/TopBar';
import EventCardCarousel from '../components/CompViewAsli/StoryCards';
import BannerCard from '../components/CompViewAsli/TopBanner';
import SectionTitle from '../components/CompViewAsli/CompDetails/Text/SectionTitle';
import FilterButton from '../components/CompViewAsli/CompDetails/ButtonCard/FilterButton';
import BottomImage from '../components/CompViewAsli/BottomImage';
import { useEventCard } from '../Functions/useEventInfo';
import { EventCardData } from '../Functions/eventCardInfo';

// دکمه‌های فیلتر را از روی مقادیر filterTag ایونت‌ها می‌سازیم

const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState(0);
  const [activeFilterTag, setActiveFilterTag] = useState<string | null>(null);

  const { events, loading, error } = useEventCard();

  const toEventCardData = (e: any): EventCardData => ({
    id: String(e.id),
    image: e.image,
    eventName: e.eventName,
    description: e.description,
    date: e.date,
    tags: Array.isArray(e.tags) ? e.tags : [],
    filterTag: e.filterTag,
    detailsLink: e.detailsLink || '/details',
  });

  const filteredEvents = activeFilterTag
    ? events.filter((e: any) => e.filterTag === activeFilterTag)
    : events;

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

      {/* Filter Buttons - fixed categories */}
      <div className="filter-bar">
        <FilterButton
          key="all"
          label="همه"
          active={activeFilter === 0}
          onClick={() => {
            setActiveFilter(0);
            setActiveFilterTag(null);
          }}
        />
        <FilterButton
          key="popular"
          label="محبوب‌ترین"
          active={activeFilter === 1}
          onClick={() => {
            setActiveFilter(1);
            setActiveFilterTag('محبوب‌ترین');
          }}
        />
        <FilterButton
          key="newest"
          label="جدید ترین"
          active={activeFilter === 2}
          onClick={() => {
            setActiveFilter(2);
            setActiveFilterTag('جدید ترین');
          }}
        />
      </div>

      <div
        className="events-grid"
      >
        {loading && (
          <>
            <EventCard />
            <EventCard />
          </>
        )}
        {!loading && !error && filteredEvents.map((e) => (
          <EventCard
            key={e.id}
            eventData={toEventCardData(e)}
            onFilter={(tag) => setActiveFilterTag(tag)}
          />
        ))}
        {!loading && error && (
          <>
            <EventCard />
            <EventCard />
          </>
        )}
      </div>

      <div style={{ height: 64 }} />

      <SectionTitle>برندها</SectionTitle>
      <BottomImage />

      <div style={{ height: 60}} />


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
          flex-direction: row-reverse;
          gap: 16px;
          justify-content: center; /* وسط چین در موبایل */
          margin: 24px 0;
        }

        @media (min-width: 768px) {
          .filter-bar { justify-content: flex-start; } /* راست‌چین در دسکتاپ */
        }

        .events-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin: 32px auto;
          width: 100%;
          max-width: 373px;
          justify-items: center; /* وسط چین کارت‌ها در موبایل */
        }

        @media (min-width: 768px) {
          .events-grid {
            grid-template-columns: repeat(auto-fit, minmax(373px, 1fr));
            column-gap: 12px;
            max-width: none;
            padding: 0px;
          }
        }

        @media (min-width: 1200px) {
          .events-grid {
            grid-template-columns: repeat(3, 373px);
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage; 