/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
<<<<<<< HEAD
    remotePatterns: [
      {
        protocol: "https", // Protokol URL
        hostname: "images.hukumonline.com", // Hostname domain
        port: "", // Jika ada port tertentu, tambahkan di sini, jika tidak kosongkan.
        pathname: "/**", // Path wildcard untuk mengizinkan semua gambar dari domain ini
      },
      {
        protocol: "https", // Protokol URL
        hostname: "img.daisyui.com", // Hostname domain
        port: "", // Jika ada port tertentu, tambahkan di sini, jika tidak kosongkan.
        pathname: "/**", // Path wildcard untuk mengizinkan semua gambar dari domain ini
      },
      {
        protocol: "https", // Protokol URL
        hostname: "images.unsplash.com", // Hostname domain
        port: "", // Jika ada port tertentu, tambahkan di sini, jika tidak kosongkan.
        pathname: "/**", // Path wildcard untuk mengizinkan semua gambar dari domain ini
      },
      {
        protocol: "https", // Protokol URL
        hostname: "images.pexels.com", // Hostname domain
        port: "", // Jika ada port tertentu, tambahkan di sini, jika tidak kosongkan.
        pathname: "/**", // Path wildcard untuk mengizinkan semua gambar dari domain ini
      },
    ],
=======
    domains: ["images.pexels.com"],
>>>>>>> aba38d5461d60849bd483577006cdbc30a1d0810
  },
};

export default nextConfig;
