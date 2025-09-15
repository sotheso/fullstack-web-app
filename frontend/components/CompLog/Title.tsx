import React from 'react';

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function Title({ children, className }: TitleProps) {
  return (
    <h1 className={`signin-title${className ? ` ${className}` : ''}`}>{children}</h1>
  );
}


