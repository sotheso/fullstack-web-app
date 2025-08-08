import { useState, useEffect } from 'react';

export function useCarousel(maxIndex: number, intervalMs: number = 3500) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
    }, intervalMs);
    return () => clearInterval(interval);
  }, [maxIndex, intervalMs]);

  const goToPrevious = () => setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
  const goToNext = () => setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : prev));

  return { currentIndex, goToPrevious, goToNext, setCurrentIndex };
} 