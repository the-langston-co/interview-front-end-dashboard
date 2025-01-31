import { NextConfig } from 'next';

const config: NextConfig = {
  experimental: {
    // edg
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        search: ''
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        search: ''
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        search: ''
      }
    ]
  }
};

export default config;;