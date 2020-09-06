const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/myname',
        proxy({
            target: 'http://m.maoyan.com',
            changeOrigin: true,
            pathRewrite: {
                '/myname': ''
            }
        })
    );
    app.use(
        '/ajax',
        proxy({
            target: 'http://m2.maoyan.com',
            changeOrigin: true,
            pathRewrite: {
                '/myname': ''
            }
        })
    );
};