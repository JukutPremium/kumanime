/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Mengizinkan semua domain dengan HTTPS
      },
      {
        protocol: "http",
        hostname: "**", // Mengizinkan semua domain dengan HTTP
      },
    ],
    unoptimized: true, // Nonaktifkan optimisasi gambar
  },
  productionBrowserSourceMaps: false, // Matikan source maps di browser
};

export default nextConfig;
