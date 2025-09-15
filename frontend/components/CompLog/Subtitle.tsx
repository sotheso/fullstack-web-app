import React from 'react';

type SubtitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function Subtitle({ children, className }: SubtitleProps) {
  return (
    <p className={`signin-subtitle${className ? ` ${className}` : ''}`}>{children}</p>
  );
}


