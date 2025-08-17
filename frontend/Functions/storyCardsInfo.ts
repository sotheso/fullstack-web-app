import { useState, useEffect } from 'react';
import { eventsAPI } from '../services/api';

// Story card data interface
export interface StoryCardData {
  id: string;
  eventName: string;
  profileImage: string; // دایره سفید پروفایل
  posterImage: string; // پوستر ایونت
}

// Hook to get story cards information from API
export const useStoryCardsInfo = () => {
  const [stories, setStories] = useState<StoryCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        console.log('Fetching stories from API...');
        const response = await eventsAPI.getAllEvents();
        console.log('Stories API response:', response.data);
        
        // Convert API data to StoryCardData format
        const storyData: StoryCardData[] = response.data.map((event: any, index: number) => ({
          id: `story-${event.id || index + 1}`,
          eventName: event.eventName || 'ایونت',
          profileImage: `/profile${(index % 9) + 1}.png`, // Use modulo to cycle through profile images
          posterImage: event.image || `/poster${(index % 9) + 1}.png`
        }));
        
        setStories(storyData);
        setError(null);
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError('خطا در بارگذاری استوری‌ها');
        // Fallback to sample data if API fails
        const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
        setStories([
          {
            id: 'story-1',
            eventName: 'ایونت بساط',
            profileImage: `${BASE_PATH}/profile1.png`,
            posterImage: `${BASE_PATH}/poster1.png`
          },
          {
            id: 'story-2',
            eventName: 'کنسرت موسیقی',
            profileImage: `${BASE_PATH}/profile2.png`,
            posterImage: `${BASE_PATH}/poster2.png`
          },
          {
            id: 'story-3',
            eventName: 'کارگاه آموزشی',
            profileImage: `${BASE_PATH}/profile3.png`,
            posterImage: `${BASE_PATH}/poster3.png`
          },
          {
            id: 'story-4',
            eventName: 'نمایشگاه هنر',
            profileImage: `${BASE_PATH}/profile4.png`,
            posterImage: `${BASE_PATH}/poster4.png`
          },
          {
            id: 'story-5',
            eventName: 'مسابقه ورزشی',
            profileImage: `${BASE_PATH}/profile5.png`,
            posterImage: `${BASE_PATH}/poster5.png`
          },
          {
            id: 'story-6',
            eventName: 'جشنواره غذا',
            profileImage: `${BASE_PATH}/profile6.png`,
            posterImage: `${BASE_PATH}/poster6.png`
          },
          {
            id: 'story-7',
            eventName: 'سخنرانی علمی',
            profileImage: `${BASE_PATH}/profile7.png`,
            posterImage: `${BASE_PATH}/poster7.png`
          },
          {
            id: 'story-8',
            eventName: 'نمایش تئاتر',
            profileImage: `${BASE_PATH}/profile8.png`,
            posterImage: `${BASE_PATH}/poster8.png`
          },
          {
            id: 'story-9',
            eventName: 'بازارچه محلی',
            profileImage: `${BASE_PATH}/profile9.png`,
            posterImage: `${BASE_PATH}/poster9.png`
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return {
    stories,
    loading,
    error
  };
};

// Legacy function for backward compatibility
export const getStoryCardsInfo = (): StoryCardData[] => {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return [
    {
      id: 'story-1',
      eventName: 'ایونت بساط',
      profileImage: `${BASE_PATH}/profile1.png`,
      posterImage: `${BASE_PATH}/poster1.png`
    },
    {
      id: 'story-2',
      eventName: 'کنسرت موسیقی',
      profileImage: `${BASE_PATH}/profile2.png`,
      posterImage: `${BASE_PATH}/poster2.png`
    },
    {
      id: 'story-3',
      eventName: 'کارگاه آموزشی',
      profileImage: `${BASE_PATH}/profile3.png`,
      posterImage: `${BASE_PATH}/poster3.png`
    },
    {
      id: 'story-4',
      eventName: 'نمایشگاه هنر',
      profileImage: `${BASE_PATH}/profile4.png`,
      posterImage: `${BASE_PATH}/poster4.png`
    },
    {
      id: 'story-5',
      eventName: 'مسابقه ورزشی',
      profileImage: `${BASE_PATH}/profile5.png`,
      posterImage: `${BASE_PATH}/poster5.png`
    },
    {
      id: 'story-6',
      eventName: 'جشنواره غذا',
      profileImage: `${BASE_PATH}/profile6.png`,
      posterImage: `${BASE_PATH}/poster6.png`
    },
    {
      id: 'story-7',
      eventName: 'سخنرانی علمی',
      profileImage: `${BASE_PATH}/profile7.png`,
      posterImage: `${BASE_PATH}/poster7.png`
    },
    {
      id: 'story-8',
      eventName: 'نمایش تئاتر',
      profileImage: `${BASE_PATH}/profile8.png`,
      posterImage: `${BASE_PATH}/poster8.png`
    },
    {
      id: 'story-9',
      eventName: 'بازارچه محلی',
      profileImage: `${BASE_PATH}/profile9.png`,
      posterImage: `${BASE_PATH}/poster9.png`
    }
  ];
};

// Function to get single story card by ID
export const getStoryCardById = (id: string): StoryCardData | undefined => {
  const stories = getStoryCardsInfo();
  return stories.find(story => story.id === id);
};

// Function to get stories by event name
export const getStoriesByEventName = (eventName: string): StoryCardData[] => {
  const stories = getStoryCardsInfo();
  return stories.filter(story => story.eventName.includes(eventName));
};
