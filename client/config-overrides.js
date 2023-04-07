const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "stream": require.resolve("stream-browserify"),
        "use-sync-external-store/shim": require.resolve("use-sync-external-store/shim"),
    })
    config.resolve.fallback = fallback;
    config.ignoreWarnings = [/Failed to parse source map/];
    return config;
}