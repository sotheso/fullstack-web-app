import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { eventsAPI, EventData } from '../services/api';

interface CachedEvent {
  [eventId: string]: EventData;
}

interface EventDetailsContextType {
  getEventData: (eventId: string) => EventData | null;
  fetchEventData: (eventId: string) => Promise<EventData | null>;
  loading: boolean;
  error: string | null;
  clearCache: () => void;
}

const EventDetailsContext = createContext<EventDetailsContextType | undefined>(undefined);

interface EventDetailsProviderProps {
  children: ReactNode;
}

export const EventDetailsProvider: React.FC<EventDetailsProviderProps> = ({ children }) => {
  const [cachedEvents, setCachedEvents] = useState<CachedEvent>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getEventData = useCallback((eventId: string): EventData | null => {
    return cachedEvents[eventId] || null;
  }, [cachedEvents]);

  const fetchEventData = useCallback(async (eventId: string): Promise<EventData | null> => {
    // اگر قبلاً cache شده، برگردان
    if (cachedEvents[eventId]) {
      return cachedEvents[eventId];
    }

    try {
      setLoading(true);
      setError(null);
      const response = await eventsAPI.getEventById(eventId);
      const eventData = response.data;
      
      // ذخیره در cache
      setCachedEvents(prev => ({
        ...prev,
        [eventId]: eventData
      }));
      
      return eventData;
    } catch (err) {
      console.error('Error fetching event data:', err);
      setError('خطا در دریافت اطلاعات ایونت');
      return null;
    } finally {
      setLoading(false);
    }
  }, [cachedEvents]);

  const clearCache = useCallback(() => {
    setCachedEvents({});
  }, []);

  const value: EventDetailsContextType = {
    getEventData,
    fetchEventData,
    loading,
    error,
    clearCache,
  };

  return <EventDetailsContext.Provider value={value}>{children}</EventDetailsContext.Provider>;
};

export const useEventDetailsContext = () => {
  const context = useContext(EventDetailsContext);
  if (context === undefined) {
    throw new Error('useEventDetailsContext must be used within an EventDetailsProvider');
  }
  return context;
};

