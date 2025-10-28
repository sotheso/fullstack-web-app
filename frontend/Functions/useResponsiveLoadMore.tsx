import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MoreEventsButton from '../components/CompViewAsli/CompDetails/ButtonCard/MoreEventsButton';

export const useResponsiveLoadMore = <T,>(items: T[]) => {
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const isMobileRef = useRef<boolean | null>(null);

  // Decide base visible count on mount and ONLY when width breakpoint crosses
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const computeIsMobile = () => window.innerWidth < 768;
    const applyBase = () => setVisibleCount(prev => {
      // Base is always 6 on first render; do not reduce if user loaded more
      const base = 6;
      return Math.max(base, prev || base);
    });

    const initialMobile = computeIsMobile();
    isMobileRef.current = initialMobile;
    setVisibleCount(6);

    const onResize = () => {
      const mobile = computeIsMobile();
      if (isMobileRef.current !== mobile) {
        isMobileRef.current = mobile;
        applyBase();
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // When items change, clamp down only if fewer items than currently visible
  useEffect(() => {
    setVisibleCount(prev => {
      if (!items.length) return 0;
      const base = 6;
      const desired = Math.max(base, prev || base);
      return Math.min(desired, items.length);
    });
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
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginTop: '-1rem' }}>
    <button
      onClick={onClick}
      aria-label="more"
      style={{
        width: '1.5rem',
        height: '1.5rem',
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


