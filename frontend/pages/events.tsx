import React, { useState, useEffect, useCallback } from 'react';
import Loader from '../components/Loader';
import EventCard from '../components/CompViewAsli/EventCard';
import SectionTitle from '../components/CompViewAsli/CompDetails/Text/SectionTitle';
import FilterButton from '../components/CompViewAsli/CompDetails/ButtonCard/FilterButton';
import { EventCardData } from '../Functions/eventCardInfo';
import { useEventsPageContext } from '../contexts/EventsPageContext';
import OfflineErrorPage from '../components/OfflineErrorPage';
import { useNetwork } from '../contexts/NetworkContext';
import { usePullToRefresh } from '../Functions/usePullToRefresh';

const EventsPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { isOnline } = useNetwork();
  
  const {
    events,
    loading,
    error,
    page,
    totalPages,
    activeFilter,
    activeFilterTag,
    fetchPage,
    setActiveFilter,
    setActiveFilterTag,
    setPage,
    isCached,
  } = useEventsPageContext();

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

  useEffect(() => {
    // فقط اگر cache نشده باشد یا فیلتر یا صفحه تغییر کرده باشد، دیتا را لود کن
    if (!isCached) {
      fetchPage(page, activeFilterTag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memoize refresh callback to prevent unnecessary re-renders
  const handleRefresh = useCallback(async () => {
    await fetchPage(1, activeFilterTag);
  }, [fetchPage, activeFilterTag]);

  // Pull to refresh functionality - MUST be called before any conditional returns
  const { isPulling, isRefreshing, pullDistance, containerRef } = usePullToRefresh({
    onRefresh: handleRefresh,
    disabled: loading || !isOnline,
  });

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

  // اگر صفحه mount شده و نت قطع است و cache هم نداریم
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
                setPage(1);
                fetchPage(1, null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
                fetchPage(1, 'محبوب‌ترین');
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
                fetchPage(1, 'جدید ترین');
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
        {!loading && !error && events.map((e: any) => (
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


      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '16px 0 32px 0', alignItems: 'center' }}>
          {/* Previous button */}
          <button
            className="pagination-button"
            onClick={() => {
              const newPage = Math.max(1, page - 1);
              setPage(newPage);
              fetchPage(newPage, activeFilterTag);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={page === 1}
            style={{
              padding: '0 12px',
              height: 36,
              borderRadius: 18,
              border: '1px solid #E5E5E5',
              background: page === 1 ? '#F3F3F3' : '#F3F3F3',
              color: page === 1 ? '#CCC' : '#000',
              fontFamily: 'Ravi',
              fontSize: 14,
              fontWeight: 600,
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              opacity: page === 1 ? 0.5 : 1,
            }}
          >
            صفحه قبل
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === page;
            return (
              <button
                key={pageNum}
                className="pagination-button"
                onClick={() => {
                  setPage(pageNum);
                  fetchPage(pageNum, activeFilterTag);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  minWidth: 36,
                  height: 36,
                  borderRadius: 18,
                  border: '1px solid #E5E5E5',
                  background: isActive ? '#F2C1AE' : '#F3F3F3',
                  color: isActive ? '#F26430' : '#000',
                  fontFamily: 'Ravi',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next button */}
          <button
            className="pagination-button"
            onClick={() => {
              const newPage = Math.min(totalPages, page + 1);
              setPage(newPage);
              fetchPage(newPage, activeFilterTag);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={page === totalPages}
            style={{
              padding: '0 12px',
              height: 36,
              borderRadius: 18,
              border: '1px solid #E5E5E5',
              background: page === totalPages ? '#F3F3F3' : '#F3F3F3',
              color: page === totalPages ? '#CCC' : '#000',
              fontFamily: 'Ravi',
              fontSize: 14,
              fontWeight: 600,
              cursor: page === totalPages ? 'not-allowed' : 'pointer',
              opacity: page === totalPages ? 0.5 : 1,
            }}
          >
            صفحه بعد
          </button>
        </div>
      )}

      <div style={{ height: 110 }} />

      <style jsx>{`
        .home-container {
          padding-left: 20px;
          padding-right: 20px; /* فاصله یکسان از راست و چپ */
          padding-top: 0;
        }

        @media (min-width: 768px) {
          .home-container {
            padding-left: 0px;
            padding-right: 0px; /* فاصله یکسان از راست و چپ */
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
            /* استفاده از auto-fill برای حفظ ساختار grid حتی با کارت‌های کمتر */
            grid-template-columns: repeat(auto-fill, minmax(23rem, 1fr));
            gap: 1rem;
            max-width: none;
            margin: 1rem 0 2rem 0;
            padding: 0;
            direction: rtl; /* RTL - کارت‌ها از راست به چپ */
            justify-content: start; /* شروع از راست */
            justify-items: stretch;
          }
        }
      `}</style>
    </div>
  );
};

export default EventsPage;
