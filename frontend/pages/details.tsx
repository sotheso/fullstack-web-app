import React from 'react';
import DetailsImage from '../components/CompViewDetails/DetailsImage';
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
          
          {/* Title and Description Section */}
          <div style={{
            width: 288,
            height: 126,
            flexShrink: 0,
            borderRadius: 16,
            border: '1px solid #EDEDED',
            background: '#FCFCFC',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            alignItems: 'flex-end'
          }}>
            {/* Title */}
            <div style={{
              display: 'flex',
              width: 62,
              height: 15,
              flexDirection: 'column',
              justifyContent: 'center',
              flexShrink: 0,
              color: '#F26430',
              textAlign: 'right',
              fontFamily: 'Ravi',
              fontSize: 12,
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal'
            }}>
              ایونت بساط
            </div>
            
            {/* Description */}
            <div style={{
              color: '#000',
              textAlign: 'right',
              fontFamily: 'Ravi',
              fontSize: 10,
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              flex: 1,
              width: '100%'
            }}>
              وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه! پس سیخ یادتون نره!وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه! پس سیخ یادتون نره!وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه! پس سیخ یادتون نره!وقتی شب و بساط و وافور با منقل ترکیب بشن، اون شب یه شب فراموش شدنیه! پس سیخ یادتون نره!
            </div>
          </div>

          {/* Info section */}
          <EventInfo
            name=""
            description=""
            tags={[]}
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
    </div>
  );
};

export default DetailsPage; 