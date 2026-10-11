/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/auth", destination: "/", permanent: false }];
  },
};

export default nextConfig;
