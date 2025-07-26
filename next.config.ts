import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.greendna.in',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.jiomart.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ichef.bbci.co.uk",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nutritionsource.hsph.harvard.edu",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.health.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "homesteadersofamerica.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
