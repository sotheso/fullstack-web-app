import Link from 'next/link';
import Image from 'next/image';
import { useBrandCard } from '../../Functions/useBrandCard';

const scrollContainer: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  overflowX: 'auto',
  padding: '12px 8px',
  margin: '12px 0',
};

const logoItem: React.CSSProperties = {
  width: 90,
  height: 90,
  minWidth: 90,
  borderRadius: '50%',
  border: '1px solid #E5E7EB',
  background: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  cursor: 'pointer',
};

const arrowButton: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: '50%',
  background: '#F3F4F6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#F26430',
  cursor: 'pointer',
  userSelect: 'none',
};

const BottomImage: React.FC = () => {
  const { brands, loading, error } = useBrandCard();

  const scrollByAmount = (dir: 'left' | 'right') => {
    const el = document.querySelector('.brand-logo-scroll') as HTMLElement | null;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <div style={arrowButton} onClick={() => scrollByAmount('left')} aria-label="prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711L10.4142 12L15.7071 17.2929C16.0976 17.6834 16.0976 18.3166 15.7071 18.7071C15.3166 19.0976 14.6834 19.0976 14.2929 18.7071L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L14.2929 5.29289C14.6834 4.90237 15.3166 4.90237 15.7071 5.29289Z" fill="#F26430"/>
        </svg>
      </div>
      <div className="brand-logo-scroll" style={scrollContainer}>
        {loading && <div style={{ color: '#666' }}>در حال بارگذاری...</div>}
        {error && <div style={{ color: '#f44336' }}>{error}</div>}
        {!loading && !error && brands.map((brand) => {
          const src = (process.env.NEXT_PUBLIC_BASE_PATH || '') + '/mamaz2.png';
          return (
            <Link key={brand.id} href={`/brandpage?id=${encodeURIComponent(String(brand.id))}`} style={{ textDecoration: 'none' }}>
              <div style={logoItem} className="brand-logo-item">
                <Image src={src} alt={brand.brandName || 'brand'} width={72} height={72} style={{ objectFit: 'contain', filter: 'grayscale(100%)' }} />
              </div>
            </Link>
          );
        })}
      </div>
      <div style={arrowButton} onClick={() => scrollByAmount('right')} aria-label="next">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ transform: 'rotate(180deg)' }}>
          <path fillRule="evenodd" clipRule="evenodd" d="M15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711L10.4142 12L15.7071 17.2929C16.0976 17.6834 16.0976 18.3166 15.7071 18.7071C15.3166 19.0976 14.6834 19.0976 14.2929 18.7071L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L14.2929 5.29289C14.6834 4.90237 15.3166 4.90237 15.7071 5.29289Z" fill="#F26430"/>
        </svg>
      </div>

      <style jsx>{`
        .brand-logo-scroll { scrollbar-width: none; }
        .brand-logo-scroll::-webkit-scrollbar { display: none; }
        @media (max-width: 640px) {
          .brand-logo-scroll { gap: 16px; padding: 10px 4px; }
          .brand-logo-item { width: 72px !important; height: 72px !important; min-width: 72px !important; }
        }
      `}</style>
    </div>
  );
};

export default BottomImage; 