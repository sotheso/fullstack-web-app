import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import EventCard from '../components/CompViewAsli/EventCard';
import SectionTitle from '../components/CompViewAsli/CompDetails/Text/SectionTitle';
import FilterButton from '../components/CompViewAsli/CompDetails/ButtonCard/FilterButton';
import { useEventCard } from '../Functions/useEventInfo';
import { EventCardData } from '../Functions/eventCardInfo';

const EventsPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
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

  // نمایش همه ایونت‌ها بدون محدودیت
  const visibleEvents = filteredEvents;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state during hydration to prevent mismatch
  if (!mounted) {
    return (
      <div className="home-container">
        <div style={{ height: 36}} />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <SectionTitle>:همه ایونت‌ها</SectionTitle>
        </div>
        <div className="events-grid" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div style={{ height: 36}} />

      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <SectionTitle>:همه ایونت‌ها</SectionTitle>
      </div>

      {/* Filter Buttons - wrapped in capsule background */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '8px 0 16px 0', width: '100%' }}>
        <div className="glassy-action-bar-inner">
          <div className="filter-bar" style={{ margin: 0 }}>
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
        </div>
      </div>

      <div className="events-grid">
        {loading && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Loader />
          </div>
        )}
        {!loading && !error && visibleEvents.map((e: any) => (
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


      <div style={{ height: 110 }} />

      <style jsx>{`
        .home-container {
          padding-left: 20px;
          padding-right: 20px; /* فاصله یکسان از راست و چپ */
          padding-top: 0;
        }

        @media (min-width: 768px) {
          .home-container {
            padding-left: 94px;
            padding-right: 94px; /* فاصله یکسان از راست و چپ */
            padding-top: 0;
          }
        }

        .filter-bar {
          display: flex;
          flex-direction: row-reverse;
          gap: 16px;
          justify-content: flex-start; /* راست‌چین */
          margin: 16px 0;
        }

        @media (min-width: 768px) {
          .filter-bar { 
            justify-content: flex-start; /* راست‌چین در دسکتاپ */
          }
        }

        .events-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin: 1rem 0 2rem 0;
          width: 100%;
          max-width: 23.3125rem;
          direction: rtl;
          justify-items: stretch;
          margin-right: 0;
          margin-left: auto;
        }

        @media (min-width: 768px) {
          .events-grid {
            grid-template-columns: repeat(auto-fit, minmax(23rem, 1fr));
            gap: 1rem;
            max-width: none;
            margin: 1rem 0 2rem 0;
            padding: 0;
            direction: rtl; /* RTL - کارت‌ها از راست به چپ */
            justify-content: start; /* شروع از راست */
            justify-items: stretch;
          }
        }

        @media (min-width: 1200px) {
          .events-grid {
            grid-template-columns: repeat(auto-fit, minmax(23rem, 1fr));
            justify-content: start;
          }
        }
      `}</style>
    </div>
  );
};

export default EventsPage;
