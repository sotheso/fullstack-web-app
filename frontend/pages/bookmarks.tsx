import React from 'react';

const BookmarksPage: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      direction: 'rtl'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#333',
          margin: '0 0 20px 0',
          fontFamily: 'Vazir, Tahoma, Arial, sans-serif'
        }}>
          رویدادهای نشان شده
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#666',
          margin: '0 0 30px 0',
          lineHeight: '1.6',
          fontFamily: 'Vazir, Tahoma, Arial, sans-serif'
        }}>
          رویدادهای مورد علاقه خود را در این صفحه مشاهده کنید و به راحتی به آن‌ها دسترسی داشته باشید.
        </p>

        <div style={{
          backgroundColor: '#f26430',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <h3 style={{
            margin: '0 0 10px 0',
            fontSize: '1.2rem',
            fontFamily: 'Vazir, Tahoma, Arial, sans-serif'
          }}>
            🔖 نشان شده‌ها
          </h3>
          <p style={{
            margin: '0',
            fontSize: '0.9rem',
            opacity: '0.9',
            fontFamily: 'Vazir, Tahoma, Arial, sans-serif'
          }}>
            هنوز هیچ رویدادی نشان نکرده‌اید.
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center'
        }}>
          <a
            href="/"
            style={{
              backgroundColor: '#f26430',
              color: 'white',
              textDecoration: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'background-color 0.3s ease',
              fontFamily: 'Vazir, Tahoma, Arial, sans-serif'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e05528'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f26430'}
          >
            مشاهده رویدادها
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookmarksPage;
