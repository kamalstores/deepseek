/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    position: 'bottom-right',
  },
  // Disable development overlay in production
  experimental: {
    optimizePackageImports: ['@/assets'],
  },
};

export default nextConfig;
