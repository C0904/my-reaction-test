import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="18" stroke="#3B82F6" strokeWidth="4" />
      <path
        d="M20 10V20L28 28"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;
