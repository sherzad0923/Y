/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.jsdelivr.net', 'i.ytimg.com'],
  },
};

module.exports = nextConfig;
