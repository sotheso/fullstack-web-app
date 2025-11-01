import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { EventData } from '../services/api';

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

  // Load registered events from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('registeredEvents');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setRegisteredEvents(parsed);
        } catch (error) {
          console.error('Error parsing registered events:', error);
        }
      }
    }
  }, []);

  // Save to localStorage whenever registeredEvents changes
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));
    }
  }, [registeredEvents, isClient]);

  const registerForEvent = useCallback((event: EventData) => {
    setRegisteredEvents(prev => {
      // Check if already registered
      const isAlreadyRegistered = prev.some(e => String(e.id) === String(event.id));
      if (isAlreadyRegistered) {
        return prev;
      }
      // Add the event to the list
      return [...prev, event];
    });
  }, []);

  const unregisterFromEvent = useCallback((eventId: string | number) => {
    setRegisteredEvents(prev => prev.filter(e => String(e.id) !== String(eventId)));
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

