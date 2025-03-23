/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'netlify.app',
      'plus.unsplash.com'
    ],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  output: 'standalone',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.URL || 'http://localhost:3000',
    NEXT_PUBLIC_NETLIFY_CONTEXT: process.env.CONTEXT || 'development',
  },
}

module.exports = nextConfig 