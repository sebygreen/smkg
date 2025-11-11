/** @type {import("next").NextConfig} */
const nextConfig = {
    turbopack: {
        rules: {
            "*.glsl": {
                loaders: ["raw-loader"],
                as: "*.js",
            },
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.smkg.me",
                pathname: "/api/files/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "8090",
                pathname: "/api/files/**",
            },
        ],
    },
};

export default nextConfig;
