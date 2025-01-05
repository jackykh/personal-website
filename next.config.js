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
        destination: "https://resume-page-dhd.pages.dev",
      },
      {
        source: "/sitemap.xml",
        destination: "https://api.jackycheung.dev/api/sitemap/index.xml",
      }
    ];
  },
  async headers() {
    const headers = [];
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      });
    }
    return headers;
  },
};

module.exports = nextConfig;
