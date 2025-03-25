/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: "https://memorial-production.up.railway.app",
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
