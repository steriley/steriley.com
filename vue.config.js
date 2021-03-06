module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
      },
      '/.netlify/': {
        target: 'http://localhost:9000',
        pathRewrite: { '^/.netlify/functions': '' },
      },
    },

    overlay: {
      warnings: false,
      errors: false,
    },
  },
};
