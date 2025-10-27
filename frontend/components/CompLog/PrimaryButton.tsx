import React from 'react';

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export function PrimaryButton({ isLoading, children, className, disabled, ...rest }: PrimaryButtonProps) {
  return (
    <button
      className={`signin-button${className ? ` ${className}` : ''}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {children}
    </button>
  );
}


