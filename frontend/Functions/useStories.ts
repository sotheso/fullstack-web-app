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
          { id: '1', eventName: 'ایونت بساط', profileImage: `${BASE_PATH}/homeScreen.png`, posterImage: `${BASE_PATH}/banner.png` },
          { id: '2', eventName: 'کنسرت موسیقی', profileImage: `${BASE_PATH}/icon-192-dark.svg`, posterImage: `${BASE_PATH}/banner.png` },
          { id: '3', eventName: 'کارگاه آموزشی', profileImage: `${BASE_PATH}/icon-192-dark.svg`, posterImage: `${BASE_PATH}/banner.png` },
          { id: '4', eventName: 'نمایشگاه هنر', profileImage: `${BASE_PATH}/icon-192-dark.svg`, posterImage: `${BASE_PATH}/banner.png` },
          { id: '5', eventName: 'مسابقه ورزشی', profileImage: `${BASE_PATH}/icon-192-dark.svg`, posterImage: `${BASE_PATH}/banner.png` },
          { id: '6', eventName: 'جشنواره غذا', profileImage: `${BASE_PATH}/icon-192-dark.svg`, posterImage: `${BASE_PATH}/banner.png` },
          { id: '7', eventName: 'سخنرانی علمی', profileImage: `${BASE_PATH}/icon-192-dark.svg`, posterImage: `${BASE_PATH}/banner.png` },
          { id: '8', eventName: 'نمایش تئاتر', profileImage: `${BASE_PATH}/icon-192-dark.svg`, posterImage: `${BASE_PATH}/banner.png` },
          { id: '9', eventName: 'بازارچه محلی', profileImage: `${BASE_PATH}/icon-192-dark.svg=`, posterImage: `${BASE_PATH}/banner.png` },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return { stories, loading, error };
};


