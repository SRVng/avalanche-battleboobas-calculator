/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost","avalanche-battleboobas-calculator-srvng.vercel.app"]
  },
  experimental: {
    urlImports: ["http://localhost:3000","https://avalanche-battleboobas-calculator-srvng.vercel.app"]
  }
  
}

module.exports = nextConfig
