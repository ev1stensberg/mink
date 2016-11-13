require('babel-polyfill');

  // Webpack config for development
  const path = require('path');
  const webpack = require('webpack');
  const assetsPath = path.resolve(__dirname, '../');
  const host = (process.env.HOST || 'localhost');
  const port = (+process.env.PORT + 1) || 3001;
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  // https://github.com/halt-hammerzeit/webpack-isomorphic-tools
  const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
  const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

  module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
      'main': [
        'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
        './',
      ],
    },
    output: {
      path: assetsPath,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: '/',
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.less$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap' },
        { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' },
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
        { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
      ]
    },
    progress: true,
    resolve: {
      modulesDirectories: [
        '',
        'node_modules'
      ],
      extensions: ['', '.json', '.js', '.jsx']
    },
    plugins: [
      // hot reload
      new webpack.HotModuleReplacementPlugin(),
      new webpack.IgnorePlugin(/webpack-stats.json$/),
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
      }),
      new HtmlWebpackPlugin({
        title: 'My App',
        template: './webpack/index.html'
      }),
      webpackIsomorphicToolsPlugin.development()
    ]
  };