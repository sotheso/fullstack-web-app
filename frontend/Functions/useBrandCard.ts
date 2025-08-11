import { useState, useEffect } from 'react';
import { brandsAPI } from '../services/api';

// Interface for brand data
export interface BrandCardProps {
  id: number;
  description: string;
  brandName: string;
  brandField: string;
  avatarSrc: string;
}

// Hook to get brand data from database
export const useBrandCard = () => {
  const [brands, setBrands] = useState<BrandCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const response = await brandsAPI.getAllBrands();
        setBrands(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching brands:', err);
        setError('خطا در بارگذاری برندها');
        // Fallback to sample data if API fails
        setBrands([
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
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return {
    brands,
    loading,
    error
  };
};
