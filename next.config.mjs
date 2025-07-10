/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  // Disable development overlay in production
  experimental: {
    optimizePackageImports: ['@/assets'],
  },
};

export default nextConfig;
