/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    reactStrictMode: true,
    SERVER_DOMAIN: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
  },
};

export default nextConfig;
