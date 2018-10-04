const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const brotliCompress = require('iltorb').compress;

/* config-overrides.js */
module.exports = function override(config, env) {
    config = rewireReactHotLoader(config, env);
    if (env === "production") {
        config.plugins.push(new UglifyJSPlugin({
            sourceMap: true,
            exclude: [/\.min\.js$/gi]
        }));

        config.plugins.push(new CompressionPlugin({
            asset: "[path].br",
            test: /\.js$|\.css$|\.html$/,
            algorithm(input, compressionOptions, callback) {
                return brotliCompress(input, compressionOptions, callback);
            }
        }));
    }

    if (env === "production") {
        //JS Overrides
        config.output.filename = 'static/js/[name].js';
        config.output.chunkFilename = 'static/js/[name].chunk.js';

        //CSS Overrides
        config.plugins[4].filename = 'static/css/[name].css';

        //Media and Assets Overrides
        config.module.rules[1].oneOf[0].options.name = 'static/media/[name].[ext]';
        config.module.rules[1].oneOf[3].options.name = 'static/media/[name].[ext]';
     }
    return config;
};
