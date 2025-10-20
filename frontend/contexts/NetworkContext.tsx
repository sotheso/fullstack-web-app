import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NetworkContextType {
  isOnline: boolean;
  showOfflineBanner: boolean;
  showErrorMessage: (message: string) => void;
  errorMessage: string | null;
  clearErrorMessage: () => void;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

interface NetworkProviderProps {
  children: ReactNode;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [showOfflineBanner, setShowOfflineBanner] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // تنظیم وضعیت اولیه
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineBanner(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineBanner(true);
    };

    // گوش دادن به تغییرات وضعیت اتصال
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const showErrorMessage = (message: string) => {
    setErrorMessage(message);
    // بعد از 5 ثانیه پیام را پاک کن
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  const value: NetworkContextType = {
    isOnline,
    showOfflineBanner,
    showErrorMessage,
    errorMessage,
    clearErrorMessage,
  };

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};

