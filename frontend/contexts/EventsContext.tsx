import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { eventsAPI } from '../services/api';

interface EventsContextType {
  events: any[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMoreServer: boolean;
  activeFilter: number;
  activeFilterTag: string | null;
  fetchPage: (p: number, tag: string | null, append?: boolean) => Promise<void>;
  setActiveFilter: (filter: number) => void;
  setActiveFilterTag: (tag: string | null) => void;
  resetEvents: () => void;
  isCached: boolean;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

interface EventsProviderProps {
  children: ReactNode;
}

// Helper component که به NetworkContext دسترسی دارد
const EventsProviderInner: React.FC<EventsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMoreServer, setHasMoreServer] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState(0);
  const [activeFilterTag, setActiveFilterTag] = useState<string | null>(null);
  const [isCached, setIsCached] = useState<boolean>(false);

  const pageSize = 6;

  const fetchPage = useCallback(async (p: number, tag: string | null, append: boolean = false) => {
    try {
      setLoading(true);
      const res = await eventsAPI.getEventsPaged({ 
        page: p, 
        limit: pageSize, 
        filterTag: tag || undefined 
      });
      
      if (res.data && Array.isArray(res.data.items)) {
        setEvents(prev => {
          if (append && p > 1) {
            return [...prev, ...res.data.items];
          }
          return res.data.items;
        });
        setHasMoreServer(p < (res.data.totalPages || 1));
      } else if (Array.isArray(res.data)) {
        setEvents(res.data);
        setHasMoreServer(false);
      }
      
      setPage(p);
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

  const resetEvents = useCallback(() => {
    setEvents([]);
    setPage(1);
    setIsCached(false);
    setActiveFilter(0);
    setActiveFilterTag(null);
  }, []);

  const value: EventsContextType = {
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
    resetEvents,
    isCached,
  };

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};

export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
  return <EventsProviderInner>{children}</EventsProviderInner>;
};

export const useEventsContext = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEventsContext must be used within an EventsProvider');
  }
  return context;
};

