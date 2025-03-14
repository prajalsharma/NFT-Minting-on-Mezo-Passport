/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@mezo-org', '@rainbow-me/rainbowkit', 'wagmi'],
    reactStrictMode: true,
    webpack: (config) => {
      // This is necessary to avoid issues with packages that use the 'window' object
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
      
      return config;
    },
  
  reactStrictMode: true,
  // Allow images from external sources
  images: {
    domains: ["via.placeholder.com", "ipfs.io"],
  },
  // Configure API proxy to backend
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
    ];
  },
};

export default nextConfig;
