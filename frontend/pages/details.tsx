import React from 'react';
import DetailsImage from '../components/CompViewDetails/DetailsImage';
import BazaarcheButton from '../components/CompViewAsli/CompDetails/ButtonCard/BazaarcheButton';
import CapsuleButtonGroup from '../components/CompViewDetails/CapsuleButtonGroup';
import EventInfo from '../Functions/useEventInfo';

const DetailsPage: React.FC = () => {
  return (
    <div>
      <div className="details-container">
        <div style={{ height: 16 }} />
        <div style={{ height: 20 }} />
        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          {/* Banner box */}
          <DetailsImage images={["image1.jpg", "image2.jpg"]} />
          {/* Info section */}
          <EventInfo
            name="ایونت بساط"
            description="وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه! پس سیخ یادتون نره!وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه! پس سیخ یادتون نره!وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه! پس سیخ یادتون نره!وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه! پس سیخ یادتون نره!"
            tags={["بازارچه", "بازارچه", "بازارچه", "بازارچه", "بازارچه"]}
            address="خیابان ایرانشهر، تقاطع بهشتی، کوچه علیمرادی، پلاک ۱۲، کافه عمارت دل"
            time="۲۵ فروردین الی ۳ اسفند - از ساعت ۲۲ تا ۴ صبح"
            programs={[
              { capsule: "۲۵ فروردین", description: "سواروسکی، لوئی ویتون، دولچه گابانا" },
              { capsule: "۲۶ فروردین", description: "سواروسکی، لوئی ویتون، دولچه گابانا" },
              { capsule: "۲۷ فروردین", description: "سواروسکی، لوئی ویتون، دولچه گابانا" }
            ]}
            brands={["سواروسکی", "لویی ویتون", "دولچه گابانا"]}
          />
        </div>

      <div style={{ height: 12}} />
      <div style={{ height: 100 }} />

      </div>
      {/* Fixed Action Buttons at Bottom */}
      <div
        className="glassy-action-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          padding: '16px 0',
          zIndex: 1000,
        }}
      >
        <div className="glassy-action-bar-inner">
          <CapsuleButtonGroup />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage; 