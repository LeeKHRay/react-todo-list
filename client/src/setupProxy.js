const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    app.use(["/api/users", "/api/tasks"], createProxyMiddleware({ // forward the requests to http://localhost:3001
        target: 'http://localhost:3001',
        changeOrigin: true,
    }));
};