/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  env: {
    REACT_APP: process.env.REACT_APP,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  },
};

module.exports = nextConfig;
