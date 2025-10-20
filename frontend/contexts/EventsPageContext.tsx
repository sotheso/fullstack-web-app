import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { eventsAPI } from '../services/api';

interface EventsPageContextType {
  events: any[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  activeFilter: number;
  activeFilterTag: string | null;
  fetchPage: (p: number, tag: string | null) => Promise<void>;
  setActiveFilter: (filter: number) => void;
  setActiveFilterTag: (tag: string | null) => void;
  setPage: (page: number) => void;
  resetEventsPage: () => void;
  isCached: boolean;
}

const EventsPageContext = createContext<EventsPageContextType | undefined>(undefined);

interface EventsPageProviderProps {
  children: ReactNode;
}

export const EventsPageProvider: React.FC<EventsPageProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [activeFilter, setActiveFilter] = useState(0);
  const [activeFilterTag, setActiveFilterTag] = useState<string | null>(null);
  const [isCached, setIsCached] = useState<boolean>(false);

  const pageSize = 8;

  const fetchPage = useCallback(async (p: number, tag: string | null) => {
    try {
      setLoading(true);
      const res = await eventsAPI.getEventsPaged({ 
        page: p, 
        limit: pageSize, 
        filterTag: tag || undefined 
      });
      
      if (res.data && Array.isArray(res.data.items)) {
        setEvents(res.data.items);
        setTotalPages(res.data.totalPages || 1);
      } else if (Array.isArray(res.data)) {
        setEvents(res.data);
        setTotalPages(1);
      }
      
      setError(null);
      setIsCached(true);
    } catch (e: any) {
      console.error(e);
      const isNetworkError = !e.response && e.message === 'Network Error';
      const errorMsg = isNetworkError 
        ? 'عدم اتصال به اینترنت. لطفا اتصال خود را بررسی کنید.'
        : 'خطا در بارگذاری ایونت‌ها';
      setError(errorMsg);
      
      // نمایش پیام خطا به کاربر
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('network-error', { detail: errorMsg });
        window.dispatchEvent(event);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const resetEventsPage = useCallback(() => {
    setEvents([]);
    setPage(1);
    setTotalPages(1);
    setIsCached(false);
    setActiveFilter(0);
    setActiveFilterTag(null);
  }, []);

  const value: EventsPageContextType = {
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
    resetEventsPage,
    isCached,
  };

  return <EventsPageContext.Provider value={value}>{children}</EventsPageContext.Provider>;
};

export const useEventsPageContext = () => {
  const context = useContext(EventsPageContext);
  if (context === undefined) {
    throw new Error('useEventsPageContext must be used within an EventsPageProvider');
  }
  return context;
};

