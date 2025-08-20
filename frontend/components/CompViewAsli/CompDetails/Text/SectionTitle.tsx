import React, { useState, useEffect } from 'react';

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, ...props }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'right',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        color: 'black',
        fontSize: isMobile ? 22 : 24,
        fontFamily: 'Ravi',
        fontWeight: '700',
        wordWrap: 'break-word',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default SectionTitle; 