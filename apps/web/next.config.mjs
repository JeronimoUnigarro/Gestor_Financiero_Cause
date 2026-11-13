/** @type {import('next').NextConfig} */
const apiOrigin = process.env.API_ORIGIN?.replace(/\/$/, '');
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.1.5'],
  async rewrites() {
    return apiOrigin ? [{ source: '/api/:path*', destination: `${apiOrigin}/api/:path*` }] : [];
  },
};
export default nextConfig;
