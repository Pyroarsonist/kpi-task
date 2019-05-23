const proxy = require('http-proxy-middleware');

function setupProxy(app) {
  app.use(
    proxy('/api/', {
      target: 'http://localhost:7373/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }),
  );
}

module.exports = setupProxy;
