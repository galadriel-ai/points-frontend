/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 'standalone' | 'export
  images: { unoptimized: true }, // Image Optimization using the default loader is not compatible with `{ output: 'export' }`.
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

export default nextConfig;
