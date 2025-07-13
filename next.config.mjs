/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  env: {
    SECURE_WORD_SECRET: 'demo-secure-word-secret-2024',
    JWT_SECRET: 'demo-jwt-secret-key-for-testing'
  }
}
export default nextConfig;
