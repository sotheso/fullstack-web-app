// Story card data interface
export interface StoryCardData {
  id: string;
  eventName: string;
  profileImage: string; // دایره سفید پروفایل
  posterImage: string; // پوستر ایونت
}

// Function to get story cards information
export const getStoryCardsInfo = (): StoryCardData[] => {
  return [
    {
      id: 'story-1',
      eventName: 'ایونت بساط',
      profileImage: '/profile1.png',
      posterImage: '/poster1.png'
    },
    {
      id: 'story-2',
      eventName: 'کنسرت موسیقی',
      profileImage: '/profile2.png',
      posterImage: '/poster2.png'
    },
    {
      id: 'story-3',
      eventName: 'کارگاه آموزشی',
      profileImage: '/profile3.png',
      posterImage: '/poster3.png'
    },
    {
      id: 'story-4',
      eventName: 'نمایشگاه هنر',
      profileImage: '/profile4.png',
      posterImage: '/poster4.png'
    },
    {
      id: 'story-5',
      eventName: 'مسابقه ورزشی',
      profileImage: '/profile5.png',
      posterImage: '/poster5.png'
    },
    {
      id: 'story-6',
      eventName: 'جشنواره غذا',
      profileImage: '/profile6.png',
      posterImage: '/poster6.png'
    },
    {
      id: 'story-7',
      eventName: 'سخنرانی علمی',
      profileImage: '/profile7.png',
      posterImage: '/poster7.png'
    },
    {
      id: 'story-8',
      eventName: 'نمایش تئاتر',
      profileImage: '/profile8.png',
      posterImage: '/poster8.png'
    },
    {
      id: 'story-9',
      eventName: 'بازارچه محلی',
      profileImage: '/profile9.png',
      posterImage: '/poster9.png'
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
