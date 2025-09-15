import React from 'react';

type LogoProps = {
  src?: string;
  alt?: string;
  className?: string;
};

export function Logo({ src = '/logoo.png', alt = 'Davvvat logo', className }: LogoProps) {
  return (
    <div className={`signin-logo${className ? ` ${className}` : ''}`}>
      <img src={src} alt={alt} className="signin-logo-img" />
    </div>
  );
}


