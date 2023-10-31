/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // for next export static site
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
