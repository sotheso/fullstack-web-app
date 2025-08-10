// Event card data interface
export interface EventCardData {
  id: string;
  image: string;
  eventName: string;
  description: string;
  date: string;
  tags: string[];
  filterTag: string;
  detailsLink: string;
}

// Function to get event card information
export const getEventCardInfo = (): EventCardData[] => {
  return [
    {
      id: 'event-1',
      image: '/banner.png',
      eventName: 'ایونت بساط',
      description: 'وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه!',
      date: 'پنجشنبه، ۲۴ فروردین',
      tags: ['بازارچه'],
      filterTag: 'بازارچه',
      detailsLink: '/details'
    },
    {
      id: 'event-2',
      image: '/banner.png',
      eventName: 'کنسرت موسیقی',
      description: 'شب موسیقی و هنر با بهترین نوازندگان شهر',
      date: 'شنبه، ۲۶ فروردین',
      tags: ['موزیک', 'هنر'],
      filterTag: 'موزیک',
      detailsLink: '/details'
    },
    {
      id: 'event-3',
      image: '//banner.png',
      eventName: 'کارگاه آموزشی',
      description: 'آموزش مهارت‌های جدید در حوزه تکنولوژی',
      date: 'یکشنبه، ۲۷ فروردین',
      tags: ['دانش', 'تکنولوژی'],
      filterTag: 'دانش',
      detailsLink: '/details'
    }
  ];
};

// Function to get single event card by ID
export const getEventCardById = (id: string): EventCardData | undefined => {
  const events = getEventCardInfo();
  return events.find(event => event.id === id);
};

// Function to get events by filter tag
export const getEventsByFilter = (filterTag: string): EventCardData[] => {
  const events = getEventCardInfo();
  return events.filter(event => event.filterTag === filterTag);
};
