/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/blog/page",
        destination: "/blog/page/1",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/blog/page/1",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/resume",
        destination: "https://resume.jackycheung.dev",
      }
    ];
  },
};

module.exports = nextConfig;
