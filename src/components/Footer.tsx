import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-8">
      <p className="text-sm text-gray-600">
        © 2024 반응속도테스트. All rights reserved.
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Licensed under the MIT License.
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Contact.{' '}
        <a href="mailto:cabinkid07@gmail.com" className="hover:underline">
          cabinkid07@gmail.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
