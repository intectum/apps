/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: [ 'apps-core', 'apps-web' ]
};

export default nextConfig;
