import React from 'react';
import Footer from './Footer';

const FooterDemo: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* محتوای نمونه */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'white',
        fontSize: '2rem',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div>
          <h1>🎉 کامپوننت فوتر آماده است!</h1>
          <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
            این یک نمونه از کامپوننت فوتر زیبا و حرفه‌ای است
          </p>
          <p style={{ fontSize: '1rem', marginTop: '1rem', opacity: 0.8 }}>
            اسکرول کنید تا فوتر را در پایین ببینید
          </p>
        </div>
      </div>
      
      {/* فوتر */}
      <Footer />
    </div>
  );
};

export default FooterDemo;
