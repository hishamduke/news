/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["i.giphy.com", "c.ndtvimg.com"],
  },
};

module.exports = nextConfig;
