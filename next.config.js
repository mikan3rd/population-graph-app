/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withLinaria = require("next-linaria");

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withLinaria(nextConfig);
