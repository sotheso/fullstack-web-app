import { useEffect, useState } from 'react';
import { bannersAPI } from '../services/api';

export interface BannerData {
  id: number;
  image: string;
  date: string;
  tags: string[];
  eventName: string;
  eventDescription: string;
  detailsLink: string;
}

export const useBanner = () => {
  const [banner, setBanner] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setLoading(true);
        const res = await bannersAPI.getAllBanners();
        const list: BannerData[] = res.data || [];
        setBanner(list[0] || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching banner:', err);
        setError('خطا در بارگذاری بنر');
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
  }, []);

  return { banner, loading, error };
};


