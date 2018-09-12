module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
      },
      '/.netlify/functions': {
        target: 'http://localhost:9000',
        pathRewrite: {
          '^/\\.netlify/functions': '',
        },
      },
    },
  },
};
