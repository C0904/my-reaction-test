/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_DOMAIN: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
  },
};

export default nextConfig;
