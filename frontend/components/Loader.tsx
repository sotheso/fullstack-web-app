import React from 'react';
import styles from '../styles/loader.module.css';

// Orange gradient colors aligned with site primary
const Loader: React.FC = () => {
  return (
    <div className={styles.container} aria-label="loading" role="status">
      <svg className={styles.svg} viewBox="0 0 50 50">
        <defs>
          <linearGradient id="loaderGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF6A00" />
            <stop offset="100%" stopColor="#F26430" />
          </linearGradient>
        </defs>
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="url(#loaderGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="110"
          strokeDashoffset="80"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};

export default Loader;
