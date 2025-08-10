// Interface for brand data
export interface BrandCardProps {
  id: number;
  description: string;
  brandName: string;
  brandField: string;
  avatarSrc: string;
}

// Hook to get brand data
export const useBrandCard = () => {
  // Sample brand data - you can pass this as props or fetch from API
  const brands: BrandCardProps[] = [
    {
      id: 1,
      description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز.",
      brandName: "اسم برند",
      brandField: "حوزه فعالیت برند",
      avatarSrc: "/iconProfile.svg"
    },
    {
      id: 2,
      description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
      brandName: "اسم برند",
      brandField: "حوزه فعالیت برند",
      avatarSrc: "/iconProfile.svg"
    }
  ];

  return {
    brands
  };
};
