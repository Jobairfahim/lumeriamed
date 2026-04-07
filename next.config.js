/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'medical-placement.s3.eu-west-2.amazonaws.com',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
};

module.exports = nextConfig;
