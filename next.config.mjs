/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }, { protocol: "https", hostname: "gateway.irys.xyz" }, { protocol: "https", hostname: "blessed-images.s3.eu-central-1.amazonaws.com" }]
  }
};

export default nextConfig;
