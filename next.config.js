/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["default", "zh-Hans", "zh-Hant"],
    defaultLocale: "default",
    localeDetection: true,
  }
}

module.exports = nextConfig
