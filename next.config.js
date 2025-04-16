/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['assets.coingecko.com', 'static.alchemyapi.io', 'i.imgur.com'],
  },
  experimental: {
    clientTraceMetadata: true,
  },
  // 跳过类型检查以加速构建
  typescript: {
    ignoreBuildErrors: true,
  },
  // 忽略ESLint错误以防止构建失败
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withSentryConfig(nextConfig, {
  // Sentry配置
  silent: true, // 忽略Sentry警告
});
