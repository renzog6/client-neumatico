/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',

  i18n: {
    locales: ['es-AR', 'en-US'],
    defaultLocale: 'es-AR',
  },

  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://192.168.88.91:8091/api' // development api
        : 'http://192.168.88.80:8091/api', // production api
  },
  httpAgentOptions: {
    keepAlive: false,
  },
}

module.exports = nextConfig
