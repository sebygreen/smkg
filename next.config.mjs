/** @type {import("next").NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.glsl$/,
            type: "asset/source",
        });
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "office.smkg.me",
                pathname: "/api/files/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "8090",
                pathname: "/api/files/**",
            }
        ],
    },
};

export default nextConfig;
