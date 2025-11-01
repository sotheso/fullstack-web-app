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
        console.log('Fetching banner from API...');
        const res = await bannersAPI.getAllBanners();
        console.log('Banner API response:', res.data);
        const list: BannerData[] = res.data || [];
        setBanner(list[0] || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching banner:', err);
        setError('خطا در بارگذاری بنر');
        // Fallback banner data
        setBanner({
          id: 1,
          image: '/banner.png',
          date: 'پنجشنبه، ۲۴ فروردین',
          tags: ['دانش', 'موزیک'],
          eventName: 'ایونت بساط',
          eventDescription: 'ایونت بساط جایی است که شور و هیجان، خلاقیت و ارتباطات در کنار هم جمع می‌شوند.',
          detailsLink: '/details'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
  }, []);

  return { banner, loading, error };
};


