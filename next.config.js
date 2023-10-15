/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true
  }
  // experimental: {
  //   serverActions: true
  // }
}
module.exports = nextConfig
