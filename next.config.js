const nextConfig = {
    output: "standalone",
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    eslint: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has ESLint errors.
        // !! WARN !!
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;