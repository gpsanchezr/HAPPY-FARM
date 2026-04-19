const nextConfig = {};
>>>>>>> c52522c717933bb1ab82d9413fec7dc1719f5321

export default nextConfig;
=======
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

export default nextConfig;
=======
const nextConfig = {};
>>>>>>> c52522c717933bb1ab82d9413fec7dc1719f5321

export default nextConfig;
