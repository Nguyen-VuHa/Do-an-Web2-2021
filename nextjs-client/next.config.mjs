/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.tiendauroi.com"], // Thêm hostname của trang web vào đây
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
