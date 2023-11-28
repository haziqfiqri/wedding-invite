/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path",
        destination: "https://script.google.com/",
      },
    ];
  },
  env: {
    GOOGLE_APPSCRIPT: process.env.GOOGLE_APPSCRIPT,
  },
};

module.exports = nextConfig;
