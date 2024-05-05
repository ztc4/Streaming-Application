/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode: true,
    webpack: (config, { dev, isServer }) => {
      // Your webpack configuration goes here
      return config;
    },

};

export default nextConfig;
