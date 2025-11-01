import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { EventData, authAPI, eventsAPI } from '../services/api';

interface RegisteredEventsContextType {
  registeredEvents: EventData[];
  registerForEvent: (event: EventData) => void;
  unregisterFromEvent: (eventId: string | number) => void;
  isRegistered: (eventId: string | number) => boolean;
}

const RegisteredEventsContext = createContext<RegisteredEventsContextType | undefined>(undefined);

interface RegisteredEventsProviderProps {
  children: ReactNode;
}

export const RegisteredEventsProvider: React.FC<RegisteredEventsProviderProps> = ({ children }) => {
  const [registeredEvents, setRegisteredEvents] = useState<EventData[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load registered events from server and localStorage on mount
  useEffect(() => {
    setIsClient(true);
    
    const loadRegisteredEvents = async () => {
      if (typeof window === 'undefined') return;

      try {
        // Get user data from localStorage
        const userStr = localStorage.getItem('user');
        if (!userStr) {
          // No user logged in, load from localStorage only
          const stored = localStorage.getItem('registeredEvents');
          if (stored) {
            const parsed = JSON.parse(stored);
            setRegisteredEvents(parsed);
          }
          return;
        }

        const user = JSON.parse(userStr);
        const userId = user.id;

        if (!userId) {
          // No userId, fallback to localStorage
          const stored = localStorage.getItem('registeredEvents');
          if (stored) {
            const parsed = JSON.parse(stored);
            setRegisteredEvents(parsed);
          }
          return;
        }

        // Fetch registered event IDs from server
        const response = await authAPI.getRegisteredEvents(userId);
        const eventIds = response.data.registeredEvents || [];

        if (eventIds.length === 0) {
          // No events registered on server, check localStorage
          const stored = localStorage.getItem('registeredEvents');
          if (stored) {
            const parsed = JSON.parse(stored);
            setRegisteredEvents(parsed);
            
            // Sync localStorage events to server
            if (parsed.length > 0) {
              for (const event of parsed) {
                try {
                  await authAPI.registerEvent(userId, event.id);
                } catch (err) {
                  console.error('Error syncing event to server:', err);
                }
              }
            }
          }
          return;
        }

        // Fetch full event data for each registered event ID
        const eventsData = await Promise.all(
          eventIds.map(async (eventId: number) => {
            try {
              const eventResponse = await eventsAPI.getEventById(eventId);
              return eventResponse.data;
            } catch (error) {
              console.error(`Error fetching event ${eventId}:`, error);
              return null;
            }
          })
        );

        // Filter out failed fetches and set registered events
        const validEvents = eventsData.filter((event): event is EventData => event !== null);
        setRegisteredEvents(validEvents);
        
        // Update localStorage as well
        localStorage.setItem('registeredEvents', JSON.stringify(validEvents));
      } catch (error) {
        console.error('Error loading registered events from server:', error);
        
        // Fallback to localStorage if server fails
        const stored = localStorage.getItem('registeredEvents');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setRegisteredEvents(parsed);
          } catch (parseError) {
            console.error('Error parsing localStorage events:', parseError);
          }
        }
      }
    };

    loadRegisteredEvents();
  }, []);

  // Save to localStorage whenever registeredEvents changes
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));
    }
  }, [registeredEvents, isClient]);

  const registerForEvent = useCallback(async (event: EventData) => {
    // Update local state immediately for better UX
    setRegisteredEvents(prev => {
      // Check if already registered
      const isAlreadyRegistered = prev.some(e => String(e.id) === String(event.id));
      if (isAlreadyRegistered) {
        return prev;
      }
      // Add the event to the list
      return [...prev, event];
    });

    // Sync to server in background
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.id && event.id) {
          await authAPI.registerEvent(user.id, event.id);
          console.log('Event registered on server:', event.id);
        }
      }
    } catch (error) {
      console.error('Error registering event on server:', error);
      // Event is still registered locally, so no need to rollback
    }
  }, []);

  const unregisterFromEvent = useCallback(async (eventId: string | number) => {
    // Update local state immediately for better UX
    setRegisteredEvents(prev => prev.filter(e => String(e.id) !== String(eventId)));

    // Sync to server in background
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.id) {
          await authAPI.unregisterEvent(user.id, eventId);
          console.log('Event unregistered on server:', eventId);
        }
      }
    } catch (error) {
      console.error('Error unregistering event on server:', error);
      // Event is still unregistered locally, so no need to rollback
    }
  }, []);

  const isRegistered = useCallback((eventId: string | number): boolean => {
    return registeredEvents.some(e => String(e.id) === String(eventId));
  }, [registeredEvents]);

  const value: RegisteredEventsContextType = {
    registeredEvents,
    registerForEvent,
    unregisterFromEvent,
    isRegistered,
  };

  return <RegisteredEventsContext.Provider value={value}>{children}</RegisteredEventsContext.Provider>;
};

export const useRegisteredEvents = () => {
  const context = useContext(RegisteredEventsContext);
  if (context === undefined) {
    throw new Error('useRegisteredEvents must be used within a RegisteredEventsProvider');
  }
  return context;
};

