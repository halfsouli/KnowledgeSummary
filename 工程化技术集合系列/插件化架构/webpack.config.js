const path = require('path');

module.exports = {
    entry: './packages/pluginManager/lib/pluginManager.ts',
    output: {
        filename: 'eft-security-library.umd.js',
        path: path.resolve(__dirname, 'dist'),
        library: "EftSecurityLibrary",
        libraryTarget: "umd",
        libraryExport: "default",
        umdNamedDefine: true
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            '@eft-security-library': path.resolve('packages/'), 
        }
    },
};