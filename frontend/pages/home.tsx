import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../components/Loader';
import EventCard from '../components/CompViewAsli/EventCard';
import EventCardCarousel from '../components/CompViewAsli/StoryCards';
import BannerCard from '../components/CompViewAsli/TopBanner';
import ReadInvite from '../components/CompViewAsli/ReadInvite';
import SectionTitle from '../components/CompViewAsli/CompDetails/Text/SectionTitle';
import FilterButton from '../components/CompViewAsli/CompDetails/ButtonCard/FilterButton';
import MoreEventsButton from '../components/CompViewAsli/CompDetails/ButtonCard/MoreEventsButton';
import Footer from '../components/Footer';
import { EventCardData } from '../Functions/eventCardInfo';
import { useEventsContext } from '../contexts/EventsContext';
import OfflineErrorPage from '../components/OfflineErrorPage';
import { useNetwork } from '../contexts/NetworkContext';
import { usePullToRefresh } from '../Functions/usePullToRefresh';

// دکمه‌های فیلتر را از روی مقادیر filterTag ایونت‌ها می‌سازیم

const HomePage: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isOnline } = useNetwork();
  
  const {
    events,
    loading,
    error,
    page,
    hasMoreServer,
    activeFilter,
    activeFilterTag,
    fetchPage,
    setActiveFilter,
    setActiveFilterTag,
    isCached,
  } = useEventsContext();

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
    setMounted(true);
  }, []);

  useEffect(() => {
    // فقط اگر cache نشده باشد، دیتا را لود کن
    if (!isCached) {
      fetchPage(1, activeFilterTag, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMoreServer = () => {
    // Navigate to events page instead of loading more events
    router.push('/events');
  };

  // Pull to refresh functionality
  const { isPulling, isRefreshing, pullDistance, containerRef } = usePullToRefresh({
    onRefresh: async () => {
      await fetchPage(1, activeFilterTag, false);
    },
    disabled: loading || !isOnline,
  });

  // Show loading during mount
  if (!mounted) {
    return (
      <div className="home-container">
        <div style={{ height: 36}} />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', minHeight: '50vh', alignItems: 'center' }}>
          <Loader />
        </div>
      </div>
    );
  }

  // اگر نت قطع است و cache هم نداریم
  if (!isOnline && !isCached && events.length === 0) {
    return <OfflineErrorPage />;
  }

  return (
    <div className="home-container" ref={containerRef}>
      {/* Pull to refresh indicator */}
      {(isPulling || isRefreshing) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: `${Math.min(pullDistance, 80)}px`,
          background: 'linear-gradient(135deg, #F26430, #E55A2B)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transform: `translateY(${isRefreshing ? 0 : -80 + Math.min(pullDistance, 80)}px)`,
          transition: isRefreshing ? 'transform 0.3s ease' : 'none',
        }}>
          <div style={{
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'Ravi',
          }}>
            {isRefreshing ? 'در حال بروزرسانی...' : 'برای بروزرسانی رها کنید'}
          </div>
        </div>
      )}
      
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
                fetchPage(1, null, false);
              }}
            />
            <FilterButton
              key="popular"
              label="محبوب‌ترین"
              active={activeFilter === 1}
              onClick={() => {
                setActiveFilter(1);
                setActiveFilterTag('محبوب‌ترین');
                fetchPage(1, 'محبوب‌ترین', false);
              }}
            />
            <FilterButton
              key="newest"
              label="جدید ترین"
              active={activeFilter === 2}
              onClick={() => {
                setActiveFilter(2);
                setActiveFilterTag('جدید ترین');
                fetchPage(1, 'جدید ترین', false);
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
          <MoreEventsButton 
            onClick={handleLoadMoreServer}
          >
            ایونت‌های بیشتر
          </MoreEventsButton>
        </div>
      )}

      <div style={{ height: 48 }} />


{/* // استوری ///////////////////////////////////////////// STORY*/}
      {/* Event Card Carousel - Moved below event cards
      <SectionTitle>:بهترین هایی که دعوتی</SectionTitle>
      <div className="carousel-container">
        <EventCardCarousel />
      </div> */}

      <div style={{ height: 16 }} />

      <SectionTitle>دعوت به خواندن</SectionTitle>
      <div style={{ height: 8}} />
      <ReadInvite />

      {/* Brands section - temporarily disabled */}
      {/* <SectionTitle>برندها</SectionTitle>
      <BottomImage /> */}

      <div style={{ height: 30}} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;