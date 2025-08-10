// Banner data interface
export interface BannerData {
  id: string;
  image: string;
  date: string;
  tags: string[];
  eventName: string;
  eventDescription: string;
}

// Function to get banner information
export const getBannerInfo = (): BannerData => {
  return {
    id: 'banner-1',
    image: '/banner-image.jpg', // مسیر عکس بنر
    date: 'پنجشنبه، ۲۴ فروردین',
    tags: ['دانش', 'موزیک', 'بازارچه'],
    eventName: 'ایونت بساط',
    eventDescription: 'وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه! پس سیخ یادتون نره!وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه! پس سیخ یادتون نره!'
  };
};
