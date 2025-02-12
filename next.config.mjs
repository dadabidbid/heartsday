/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    basePath: "/heartsday", // Change this
    assetPrefix: "/heartsday",
    trailingSlash: true,
  };
  
  export default nextConfig;
  