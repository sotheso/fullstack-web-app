import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MoreEventsButton from '../components/CompViewAsli/CompDetails/ButtonCard/MoreEventsButton';

export const useResponsiveLoadMore = <T,>(items: T[]) => {
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Detect mobile/desktop once on mount and when viewport changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const decide = () => {
      const isMobile = window.innerWidth < 768;
      setVisibleCount(isMobile ? 4 : 6);
    };
    decide();
    window.addEventListener('resize', decide);
    return () => window.removeEventListener('resize', decide);
  }, []);

  // Reset visible count when items change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth < 768;
    setVisibleCount(isMobile ? 4 : 6);
  }, [items.length]);

  const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);
  const hasMore = items.length > visibleCount;

  const handleLoadMore = useCallback(() => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const increment = isMobile ? 4 : 6;
    setVisibleCount((prev) => Math.min(items.length, prev + increment));
  }, [items.length]);

  return { visibleItems, hasMore, handleLoadMore };
};

export const LoadMoreControls: React.FC<{ onClick: () => void, label?: string }>= ({ onClick, label = 'ایونت های بیشتر' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: -16 }}>
    <button
      onClick={onClick}
      aria-label="more"
      style={{
        width: 24,
        height: 24,
        flexShrink: 0,
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 10.5C5.17157 10.5 4.5 11.1716 4.5 12C4.5 12.8284 5.17157 13.5 6 13.5C6.82843 13.5 7.5 12.8284 7.5 12C7.5 11.1716 6.82843 10.5 6 10.5Z" fill="#F26430"/>
        <path d="M10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12Z" fill="#F26430"/>
        <path d="M16.5 12C16.5 11.1716 17.1716 10.5 18 10.5C18.8284 10.5 19.5 11.1716 19.5 12C19.5 12.8284 18.8284 13.5 18 13.5C17.1716 13.5 16.5 12.8284 16.5 12Z" fill="#F26430"/>
      </svg>
    </button>
    <MoreEventsButton onClick={onClick}>{label}</MoreEventsButton>
  </div>
);


