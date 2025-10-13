import React from 'react';
import Footer from '../components/Footer';

const BlogsPage: React.FC = () => {
  return (
    <div className="blog-container">
      {/* Header */}
      <div className="blog-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 12 13" fill="none">
          <path d="M3.5 3.33333C3.5 3.05719 3.72386 2.83333 4 2.83333H8.66667C8.94281 2.83333 9.16667 3.05719 9.16667 3.33333C9.16667 3.60947 8.94281 3.83333 8.66667 3.83333H4C3.72386 3.83333 3.5 3.60947 3.5 3.33333Z" fill="#F26430"/>
          <path d="M4 4.83333C3.72386 4.83333 3.5 5.05719 3.5 5.33333C3.5 5.60947 3.72386 5.83333 4 5.83333H7.33333C7.60948 5.83333 7.83333 5.60947 7.83333 5.33333C7.83333 5.05719 7.60948 4.83333 7.33333 4.83333H4Z" fill="#F26430"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M3.66667 0.166664C1.91777 0.166664 0.5 1.58443 0.5 3.33333V10C0.5 11.3807 1.61929 12.5 3 12.5H10.3333C10.9777 12.5 11.5 11.9777 11.5 11.3333V1.33333C11.5 0.688999 10.9777 0.166664 10.3333 0.166664H3.66667ZM10.5 7.5V1.33333C10.5 1.24128 10.4254 1.16666 10.3333 1.16666H3.66667C2.47005 1.16666 1.5 2.13671 1.5 3.33333V7.99981C1.91783 7.68597 2.4372 7.5 3 7.5H10.5ZM10.5 8.5H3C2.17157 8.5 1.5 9.17157 1.5 10C1.5 10.8284 2.17157 11.5 3 11.5H10.3333C10.4254 11.5 10.5 11.4254 10.5 11.3333V8.5Z" fill="#F26430"/>
        </svg>
        <h1 className="blog-title">ایونت چیه؟ و چجور برگزار میشه؟</h1>
      </div>
      
      {/* Divider */}
      <div className="divider" />

      {/* First Image */}
      <div className="image-placeholder">
        <img src="/banner.png" alt="blog image" className="blog-image" />
      </div>

      {/* Text Section */}
      <div className="text-section">
        <div className="intro-label">مقدمه</div>
        <p className="blog-text">
          وقتی شب و بساط و واقور با منقل ترکیب بشن، به شب فراموش شدنی‌! 
          وقتی شب و بساط و واقور با منقل ترکیب وقتی شب و بساط و واقور با منقل 
          ترکیب بشن، به شب فراموش شدنی‌! وقتی شب و بساط و واقور با منقل 
          ترکیب وقتی شب و بساط و واقور با منقل ترکیب بشن، به شب فراموش 
          شدنی‌! وقتی شب و بساط و واقور با منقل ترکیب وقتی شب و بساط و واقور 
          با منقل ترکیب وقتی شب و بساط و واقور با منقل ترکیب بشن، به شب 
          فراموش شدنی‌! وقتی شب و بساط و واقور با منقل ترکیب وقتی شب و 
          بساط و واقور با منقل ترکیب بشن، به شب فراموش شدنی‌! وقتی شب و 
          بساط و واقور با منقل ترکیب
        </p>
      </div>

      {/* Second Image */}
      <div className="image-placeholder">
        <img src="/banner.png" alt="blog image" className="blog-image" />
      </div>

      {/* More Text Section */}
      <div className="text-section">
        <div className="intro-label">مقدمه</div>
        <p className="blog-text">
          وقتی شب و بساط و واقور با منقل ترکیب بشن، به شب فراموش شدنی‌! 
          وقتی شب و بساط و واقور با منقل ترکیب وقتی شب و بساط و واقور با منقل 
          ترکیب بشن، به شب فراموش شدنی‌! وقتی شب و بساط و واقور با منقل 
          ترکیب وقتی شب و بساط و واقور با منقل ترکیب بشن، به شب فراموش 
          شدنی‌! وقتی شب و بساط و واقور با منقل ترکیب وقتی شب و بساط و واقور 
          با منقل ترکیب
        </p>
      </div>

      <div style={{ height: 60 }} />
      <Footer />

      <style jsx>{`
        .blog-container {
          min-height: 100vh;
          padding: 20px;
          background: #FFFFFF;
          direction: rtl;
          max-width: 900px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .blog-container {
            padding: 40px 60px;
          }
        }

        /* Header */
        .blog-header {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin: 24px 0 16px 0;
        }

        .blog-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .blog-header svg {
          width: 22px;
          height: 24px;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .blog-header {
            margin: 32px 0 24px 0;
            gap: 16px;
          }

          .blog-title {
            font-size: 24px;
          }
          
          .blog-header svg {
            width: 28px;
            height: 31px;
          }
        }

        /* Divider */
        .divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(to left, 
            rgba(230, 126, 80, 0) 0%, 
            rgba(230, 126, 80, 0.3) 50%, 
            rgba(230, 126, 80, 0) 100%
          );
          margin: 16px 0 32px 0;
        }

        @media (min-width: 768px) {
          .divider {
            margin: 24px 0 48px 0;
          }
        }

        /* Image Placeholder */
        .image-placeholder {
          width: 100%;
          height: 240px;
          background: linear-gradient(135deg, #E67E50 0%, #D8664A 100%);
          border-radius: 20px;
          margin: 24px 0;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(230, 126, 80, 0.2);
        }

        @media (min-width: 768px) {
          .image-placeholder {
            height: 400px;
            border-radius: 24px;
            margin: 40px 0;
          }
        }

        .blog-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.4;
        }

        /* Text Section */
        .text-section {
          margin: 16px 0;
        }

        @media (min-width: 768px) {
          .text-section {
            margin: 24px 0;
          }
        }

        .intro-label {
          font-size: 18px;
          font-weight: 700;
          color: #E67E50;
          text-align: right;
          margin: 0 0 12px 0;
        }

        @media (min-width: 768px) {
          .intro-label {
            font-size: 20px;
            margin: 0 0 16px 0;
          }
        }

        .blog-text {
          font-size: 16px;
          font-weight: 400;
          color: #444;
          line-height: 2;
          text-align: justify;
          margin: 0;
          padding: 0 8px;
        }

        @media (min-width: 768px) {
          .blog-text {
            font-size: 18px;
            line-height: 2.2;
            padding: 0 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogsPage;
