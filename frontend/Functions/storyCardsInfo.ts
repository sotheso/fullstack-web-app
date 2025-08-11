// Story card data interface
export interface StoryCardData {
  id: string;
  eventName: string;
  profileImage: string; // دایره سفید پروفایل
  posterImage: string; // پوستر ایونت
}

// Function to get story cards information
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
