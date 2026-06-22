/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['logo.clearbit.com', 'finnhub.io'],
    unoptimized: true
  },
  env: {
    FINNHUB_API_KEY: process.env.FINNHUB_API_KEY,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  }
}

module.exports = nextConfig
