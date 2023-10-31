/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true
  },
  transpilePackages: ['lucide-react']
  // experimental: {
  //   serverActions: true
  // }
}
module.exports = nextConfig
