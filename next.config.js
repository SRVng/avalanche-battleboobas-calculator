/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "avalanche-battleboobas-calculator-srvng.vercel.app",
      "avalanche-battleboobas-calculator.vercel.app"
    ]
  },
  experimental: {
    urlImports: [
      "http://localhost:3000",
      "https://avalanche-battleboobas-calculator-srvng.vercel.app",
      "https://avalanche-battleboobas-calculator.vercel.app"
    ]
  }
  
}

module.exports = nextConfig
