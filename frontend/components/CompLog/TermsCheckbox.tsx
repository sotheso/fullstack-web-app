import React from 'react';

type TermsCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  children?: React.ReactNode;
};

export function TermsCheckbox({ checked, onChange, className, children }: TermsCheckboxProps) {
  return (
    <label className={`signin-terms${className ? ` ${className}` : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{children}</span>
    </label>
  );
}


