import React, { useMemo, useState, useEffect } from 'react';
import Loader from '../components/Loader';
import EventCard from '../components/CompViewAsli/EventCard';
import EventCardCarousel from '../components/CompViewAsli/StoryCards';
import BannerCard from '../components/CompViewAsli/TopBanner';
import ReadInvite from '../components/CompViewAsli/ReadInvite';
import SectionTitle from '../components/CompViewAsli/CompDetails/Text/SectionTitle';
import FilterButton from '../components/CompViewAsli/CompDetails/ButtonCard/FilterButton';
import MoreEventsButton from '../components/CompViewAsli/CompDetails/ButtonCard/MoreEventsButton';
import BottomImage from '../components/CompViewAsli/BottomImage';
import Footer from '../components/Footer';
import { useEventCard } from '../Functions/useEventInfo';
import { EventCardData } from '../Functions/eventCardInfo';
import { useResponsiveLoadMore, LoadMoreControls } from '../Functions/useResponsiveLoadMore';
import { eventsAPI } from '../services/api';

// دکمه‌های فیلتر را از روی مقادیر filterTag ایونت‌ها می‌سازیم

const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState(0);
  const [activeFilterTag, setActiveFilterTag] = useState<string | null>(null);
  // visibleCount logic moved to useResponsiveLoadMore

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMoreServer, setHasMoreServer] = useState<boolean>(true);
  const pageSize = 6;

  const fetchPage = async (p: number, tag: string | null) => {
    try {
      setLoading(true);
      const res = await eventsAPI.getEventsPaged({ page: p, limit: pageSize, filterTag: tag || undefined });
      if (res.data && Array.isArray(res.data.items)) {
        setEvents(prev => p === 1 ? res.data.items : [...prev, ...res.data.items]);
        setHasMoreServer(p < (res.data.totalPages || 1));
      } else if (Array.isArray(res.data)) {
        setEvents(res.data);
        setHasMoreServer(false);
      }
      setError(null);
    } catch (e) {
      console.error(e);
      setError('خطا در بارگذاری ایونت‌ها');
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    // initial load
    fetchPage(1, activeFilterTag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilterTag]);

  const handleLoadMoreServer = () => {
    const next = page + 1;
    setPage(next);
    fetchPage(next, activeFilterTag);
  };

  return (
    <div className="home-container">
      <div style={{ height: 36}} />

      {/* Banner Card - New Position */}
      <div>
        <SectionTitle>!اگه قرار باشه فقط یه جا بری</SectionTitle>
        <div style={{ height: 8}} />
        <BannerCard />
      </div>
      <div style={{ height: 16}} />

      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <SectionTitle>:همه جاهایی که دعوتی</SectionTitle>
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
                setPage(1);
                setEvents([]);
                fetchPage(1, null);
              }}
            />
            <FilterButton
              key="popular"
              label="محبوب‌ترین"
              active={activeFilter === 1}
              onClick={() => {
                setActiveFilter(1);
                setActiveFilterTag('محبوب‌ترین');
                setPage(1);
                setEvents([]);
                fetchPage(1, 'محبوب‌ترین');
              }}
            />
            <FilterButton
              key="newest"
              label="جدید ترین"
              active={activeFilter === 2}
              onClick={() => {
                setActiveFilter(2);
                setActiveFilterTag('جدید ترین');
                setPage(1);
                setEvents([]);
                fetchPage(1, 'جدید ترین');
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="events-grid"
      >
        {loading && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Loader />
          </div>
        )}
        {!loading && !error && filteredEvents.map((e: any) => (
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

      {/* Load more controls */}
      {!loading && !error && hasMoreServer && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
          <MoreEventsButton onClick={handleLoadMoreServer}>ایونت‌های بیشتر</MoreEventsButton>
        </div>
      )}

      <div style={{ height: 48 }} />

      {/* Event Card Carousel - Moved below event cards */}
      <SectionTitle>:بهترین هایی که دعوتی</SectionTitle>
      <div className="carousel-container">
        <EventCardCarousel />
      </div>

      <div style={{ height: 16 }} />

      <SectionTitle>دعوت به خواندن</SectionTitle>
      <div style={{ height: 8}} />
      <ReadInvite />

      {/* Brands section - temporarily disabled */}
      {/* <SectionTitle>برندها</SectionTitle>
      <BottomImage /> */}

      <div style={{ height: 100}} />

      {/* Footer */}
      <Footer />

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

        .carousel-container {
          position: relative;
          left: -20px;
          width: calc(100% + 40px);
          padding-left: 0px;
          padding-right: 0px;
          box-sizing: border-box;
        }

        @media (min-width: 768px) {
          .carousel-container {
            left: -94px;
            width: calc(100% + 188px);
            padding-left: 10px;
            padding-right: 10px;
          }
        }

        .filter-bar {
          display: flex;
          flex-direction: row-reverse;
          gap: 16px;
          justify-content: flex-start; /* راست‌چین */
          margin: 24px 0;
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
          margin: 0.5rem 0 2rem 0;
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
            margin: 0.5rem 0 2rem 0;
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

export default HomePage; 



// test