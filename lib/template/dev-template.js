module.exports = (a, b, c, d) => {
  const dot = '.';
  const equal = '';
  const plus = '';
  const parant = '';
  const custom = '.';
  const custom3 = '';
  const templateString = `\\${dot}`;
  const templateString2 =  `=\\${equal}`;
  const templateString3 =  `+\\${plus}`;
  const templateString4 =  `(\\${parant}`;
  const templateString6 = `\\${custom}\\`;
  const templateString8 = `\\${custom3}`;

  return (
  `require('babel-polyfill');

  // Webpack config for development
  const path = require('path');
  const webpack = require('webpack');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  
  const assetsPath = path.resolve(__dirname, '../${c}');
  const host = (process.env.HOST || 'localhost');
  const port = (+process.env.PORT + 1) || 3001;
  // https://github.com/halt-hammerzeit/webpack-isomorphic-tools
  const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
  const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

  module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
      'main': [
        'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
        './${b}',
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
        { test: /${templateString}js$/, exclude: /node_modules/, loader: 'babel'},
        { test: /${templateString}json$/, loader: 'json-loader' },
        { test: /${templateString}less$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap' },
        { test: /${templateString}scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' },
        { test: /${templateString}woff${templateString4}?v${templateString2}d${templateString3}.${templateString8}d+${templateString6}d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
        { test: /${templateString}woff2${templateString4}?v${templateString2}d${templateString3}.${templateString8}d+${templateString6}d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
        { test: /${templateString}ttf${templateString4}?v${templateString2}d${templateString3}.${templateString8}d+${templateString6}d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
        { test: /${templateString}eot${templateString4}?v${templateString2}d${templateString3}.${templateString8}d+${templateString6}d+)?$/, loader: 'file' },
        { test: /${templateString}svg${templateString4}?v${templateString2}d${templateString3}.${templateString8}d+${templateString6}d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
        { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
      ]
    },
    progress: true,
    resolve: {
      modulesDirectories: [
        '${d}',
        'node_modules'
      ],
      extensions: ['', '.json', '.js']
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
  };`
  );
};
