import React from 'react';

type ErrorNoticeProps = {
  children?: React.ReactNode;
  className?: string;
};

export function ErrorNotice({ children, className }: ErrorNoticeProps) {
  return (
    <div className={`signin-error${className ? ` ${className}` : ''}`}>{children}</div>
  );
}


