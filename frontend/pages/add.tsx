import React from 'react';

const AddPage: React.FC = () => {
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
          صفحه اضافه کردن رویداد
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#666',
          margin: '0 0 30px 0',
          lineHeight: '1.6',
          fontFamily: 'Vazir, Tahoma, Arial, sans-serif'
        }}>
          این صفحه در حال ساخت است و به زودی قابلیت اضافه کردن رویدادهای جدید را خواهید داشت.
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
            🚧 در حال ساخت
          </h3>
          <p style={{
            margin: '0',
            fontSize: '0.9rem',
            opacity: '0.9',
            fontFamily: 'Vazir, Tahoma, Arial, sans-serif'
          }}>
            این قابلیت به زودی اضافه خواهد شد.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
