/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "bhdstar.vn",
      "www.tiendauroi.com",
      "res.cloudinary.com",
      "upload.wikimedia.org",
    ], // Thêm hostname của trang web vào đây
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  pageExtensions: ["ts", "tsx"],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
