import { useEffect, useState } from 'react';
import { storiesAPI } from '../services/api';

export interface StoryRecord {
  id: number;
  eventName: string;
  profileImage?: string;
  posterImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StoryCardData {
  id: string;
  eventName: string;
  profileImage: string;
  posterImage: string;
}

export const useStories = () => {
  const [stories, setStories] = useState<StoryCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await storiesAPI.getAllStories();
        const data: StoryRecord[] = Array.isArray(response.data) ? response.data : [];
        const mapped: StoryCardData[] = data.map((s, index) => ({
          id: String(s.id ?? index + 1),
          eventName: s.eventName ?? 'ایونت',
          profileImage: s.profileImage ?? `/profile${(index % 9) + 1}.png`,
          posterImage: s.posterImage ?? `/poster${(index % 9) + 1}.png`,
        }));
        setStories(mapped);
        setError(null);
      } catch (e) {
        const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
        setError('خطا در بارگذاری استوری‌ها');
        setStories([
          { id: '1', eventName: 'ایونت بساط', profileImage: `${BASE_PATH}/profile1.png`, posterImage: `${BASE_PATH}/poster1.png` },
          { id: '2', eventName: 'کنسرت موسیقی', profileImage: `${BASE_PATH}/profile2.png`, posterImage: `${BASE_PATH}/poster2.png` },
          { id: '3', eventName: 'کارگاه آموزشی', profileImage: `${BASE_PATH}/profile3.png`, posterImage: `${BASE_PATH}/poster3.png` },
          { id: '4', eventName: 'نمایشگاه هنر', profileImage: `${BASE_PATH}/profile4.png`, posterImage: `${BASE_PATH}/poster4.png` },
          { id: '5', eventName: 'مسابقه ورزشی', profileImage: `${BASE_PATH}/profile5.png`, posterImage: `${BASE_PATH}/poster5.png` },
          { id: '6', eventName: 'جشنواره غذا', profileImage: `${BASE_PATH}/profile6.png`, posterImage: `${BASE_PATH}/poster6.png` },
          { id: '7', eventName: 'سخنرانی علمی', profileImage: `${BASE_PATH}/profile7.png`, posterImage: `${BASE_PATH}/poster7.png` },
          { id: '8', eventName: 'نمایش تئاتر', profileImage: `${BASE_PATH}/profile8.png`, posterImage: `${BASE_PATH}/poster8.png` },
          { id: '9', eventName: 'بازارچه محلی', profileImage: `${BASE_PATH}/profile9.png`, posterImage: `${BASE_PATH}/poster9.png` },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return { stories, loading, error };
};


