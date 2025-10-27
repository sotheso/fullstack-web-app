import React from 'react';

type InputPillProps = React.InputHTMLAttributes<HTMLInputElement> & {
  dot?: boolean;
};

export function InputPill({ dot = true, className, ...rest }: InputPillProps) {
  return (
    <div className="signin-input-wrap">
      {dot && <span className="signin-input-dot" />}
      <input className="signin-input" {...rest} />
    </div>
  );
}


