/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['@chakra-ui/react'],
    },
    // ignore 'server' directory
    webpack: (config) => {
        if (process.env.NEXT_OUTPUT_MODE !== "export" || !config.module) {
            return config;
        }
        config.module.rules?.push({
            test: /server/,
            loader: "ignore-loader",
        });
        return config;
    },
};

export default nextConfig;
