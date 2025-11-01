import { useEffect, useRef, useState } from 'react';

interface PullToRefreshOptions {
  onRefresh: () => void | Promise<void>;
  threshold?: number; // Minimum distance to trigger refresh (default: 80px)
  resistance?: number; // How much resistance when pulling (default: 2.5)
  disabled?: boolean;
}

interface PullToRefreshState {
  isPulling: boolean;
  isRefreshing: boolean;
  pullDistance: number;
}

export const usePullToRefresh = (options: PullToRefreshOptions) => {
  const { onRefresh, threshold = 80, resistance = 2.5, disabled = false } = options;
  
  const [state, setState] = useState<PullToRefreshState>({
    isPulling: false,
    isRefreshing: false,
    pullDistance: 0,
  });

  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isAtTop = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPullingRef = useRef<boolean>(false);
  const pullDistanceRef = useRef<number>(0);
  const onRefreshRef = useRef(onRefresh);

  // Update ref when onRefresh changes
  useEffect(() => {
    onRefreshRef.current = onRefresh;
  }, [onRefresh]);

  useEffect(() => {
    if (disabled) return;

    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      // Check if we're at the top of the page
      isAtTop.current = window.scrollY === 0;
      
      if (isAtTop.current) {
        startY.current = e.touches[0].clientY;
        currentY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isAtTop.current) return;

      currentY.current = e.touches[0].clientY;
      const deltaY = currentY.current - startY.current;

      // Only allow downward pull
      if (deltaY > 0) {
        e.preventDefault();
        
        const pullDistance = Math.min(deltaY / resistance, threshold * 1.5);
        isPullingRef.current = true;
        pullDistanceRef.current = pullDistance;
        
        setState(prev => ({
          ...prev,
          isPulling: true,
          pullDistance,
        }));
      }
    };

    const handleTouchEnd = async () => {
      if (!isPullingRef.current) return;

      const shouldRefresh = pullDistanceRef.current >= threshold;
      
      if (shouldRefresh) {
        isPullingRef.current = false;
        pullDistanceRef.current = 0;
        setState(prev => ({
          ...prev,
          isRefreshing: true,
          isPulling: false,
          pullDistance: 0,
        }));

        try {
          await onRefreshRef.current();
        } catch (error) {
          console.error('Refresh failed:', error);
        } finally {
          setState(prev => ({
            ...prev,
            isRefreshing: false,
          }));
        }
      } else {
        isPullingRef.current = false;
        pullDistanceRef.current = 0;
        setState(prev => ({
          ...prev,
          isPulling: false,
          pullDistance: 0,
        }));
      }
    };

    // Add event listeners
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [disabled, threshold, resistance]);

  return {
    ...state,
    containerRef,
  };
};
