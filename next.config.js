/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // for next export static site
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true
    //   styledComponents: boolean | {
    //     // Enabled by default in development, disabled in production to reduce file size,
    //     // setting this will override the default for all environments.
    //     displayName?: boolean,
    //     // Enabled by default.
    //     ssr?: boolean,
    //     // Enabled by default.
    //     fileName?: boolean,
    //     // Empty by default.
    //     topLevelImportPaths?: string[],
    //     // Defaults to ["index"].
    //     meaninglessFileNames?: string[],
    //     // Enabled by default.
    //     cssProp?: boolean,
    //     // Empty by default.
    //     namespace?: string,
    //     // Not supported yet.
    //     minify?: boolean,
    //     // Not supported yet.
    //     transpileTemplateLiterals?: boolean,
    //     // Not supported yet.
    //     pure?: boolean,
    //   },
    // },
  },
  transpilePackages: ['lucide-react'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc'
      }
    ]
  }
}
module.exports = nextConfig
