const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
      },
    },
  },

  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    ],
  },
};
