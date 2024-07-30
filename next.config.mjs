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
                hostname: "pocketbase.smkg.me",
                pathname: "/api/files/**",
            },
        ],
    },
};

export default nextConfig;
