import { useState, useEffect } from 'react';
import { eventsAPI } from '../services/api';

// Event card data interface
export interface EventCardData {
  id: string;
  image: string;
  eventName: string;
  description: string;
  date: string;
  tags: string[];
  filterTag: string;
  detailsLink: string;
}

// Hook to get event card information from API
export const useEventCardInfo = () => {
  const [events, setEvents] = useState<EventCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        console.log('Fetching events from API...');
        const response = await eventsAPI.getAllEvents();
        console.log('Events API response:', response.data);
        
        // Convert API data to EventCardData format
        const eventData: EventCardData[] = response.data.map((event: any) => ({
          id: String(event.id),
          image: event.image || '/banner.png',
          eventName: event.eventName,
          description: event.description,
          date: event.date,
          tags: Array.isArray(event.tags) ? event.tags : [],
          filterTag: event.filterTag || 'بازارچه',
          detailsLink: event.detailsLink || '/details'
        }));
        
        setEvents(eventData);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('خطا در بارگذاری ایونت‌ها');
        // Fallback to sample data if API fails
        const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
        setEvents([
          {
            id: 'event-1',
            image: `${BASE_PATH}/banner.png`,
            eventName: 'ایونت بساط',
            description: 'وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه!',
            date: 'پنجشنبه، ۲۴ فروردین',
            tags: ['بازارچه'],
            filterTag: 'بازارچه',
            detailsLink: `${BASE_PATH}/details`
          },
          {
            id: 'event-2',
            image: `${BASE_PATH}/banner.png`,
            eventName: 'کنسرت موسیقی',
            description: 'شب موسیقی و هنر با بهترین نوازندگان شهر',
            date: 'شنبه، ۲۶ فروردین',
            tags: ['موزیک', 'هنر'],
            filterTag: 'موزیک',
            detailsLink: `${BASE_PATH}/details`
          },
          {
            id: 'event-3',
            image: `${BASE_PATH}/banner.png`,
            eventName: 'کارگاه آموزشی',
            description: 'آموزش مهارت‌های جدید در حوزه تکنولوژی',
            date: 'یکشنبه، ۲۷ فروردین',
            tags: ['دانش', 'تکنولوژی'],
            filterTag: 'دانش',
            detailsLink: `${BASE_PATH}/details`
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Function to get single event card by ID
  const getEventCardById = (id: string): EventCardData | undefined => {
    return events.find(event => event.id === id);
  };

  // Function to get events by filter tag
  const getEventsByFilter = (filterTag: string): EventCardData[] => {
    return events.filter(event => event.filterTag === filterTag);
  };

  return {
    events,
    loading,
    error,
    getEventCardById,
    getEventsByFilter
  };
};

// Legacy functions for backward compatibility
export const getEventCardInfo = (): EventCardData[] => {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return [
    {
      id: 'event-1',
      image: `${BASE_PATH}/banner.png`,
      eventName: 'ایونت بساط',
      description: 'وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه!',
      date: 'پنجشنبه، ۲۴ فروردین',
      tags: ['بازارچه'],
      filterTag: 'بازارچه',
      detailsLink: `${BASE_PATH}/details`
    },
    {
      id: 'event-2',
      image: `${BASE_PATH}/banner.png`,
      eventName: 'کنسرت موسیقی',
      description: 'شب موسیقی و هنر با بهترین نوازندگان شهر',
      date: 'شنبه، ۲۶ فروردین',
      tags: ['موزیک', 'هنر'],
      filterTag: 'موزیک',
      detailsLink: `${BASE_PATH}/details`
    },
    {
      id: 'event-3',
      image: `${BASE_PATH}/banner.png`,
      eventName: 'کارگاه آموزشی',
      description: 'آموزش مهارت‌های جدید در حوزه تکنولوژی',
      date: 'یکشنبه، ۲۷ فروردین',
      tags: ['دانش', 'تکنولوژی'],
      filterTag: 'دانش',
      detailsLink: `${BASE_PATH}/details`
    }
  ];
};

export const getEventCardById = (id: string): EventCardData | undefined => {
  const events = getEventCardInfo();
  return events.find(event => event.id === id);
};

export const getEventsByFilter = (filterTag: string): EventCardData[] => {
  const events = getEventCardInfo();
  return events.filter(event => event.filterTag === filterTag);
};
