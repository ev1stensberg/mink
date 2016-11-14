module.exports = function(a, b, c, d) {
  const dot = '.';
  const equal = '';
  const plus = '';
  const parant = '';
  const forward = '/';
  const custom = '.';
  const custom2 = '';
  const custom3 = '';
  const templateString = `\\${dot}`;
  const templateString2 =  `=\\${equal}`;
  const templateString3 =  `+\\${plus}`;
  const templateString4 =  `(\\${parant}`;
  const templateString5 =  `\\${forward}`;
  const templateString6 = `\\${custom}\\`;
  const templateString7 = `\\${custom2}`;
  const templateString8 = `\\${custom3}`;
  /* eslint-disable */
  return (
  `require('babel-polyfill');

  // Webpack config for creating the production bundle.
  const path = require('path');
  const webpack = require('webpack');
  const CleanPlugin = require('clean-webpack-plugin');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  const strip = require('strip-loader');
  const fs = require('fs');
  const projectRootPath = path.resolve(__dirname, '../');
  const assetsPath = path.resolve(projectRootPath, './${c}');

  // https://github.com/halt-hammerzeit/webpack-isomorphic-tools
  const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
  const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

  const babelrc = fs.readFileSync('.babelrc');
  let babelrcObject = {};

  try {
    babelrcObject = JSON.parse(babelrc);
  } catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
  }


  const babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

  // merge global and dev-only plugins
  let combinedPlugins = babelrcObject.plugins || [];
  combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

  const babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
  delete babelLoaderQuery.env;

  // Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
  // the babel plugin react-transform-hmr manually here.

  // make sure react-transform is enabled
  babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
  let reactTransform = null;
  for (let i = 0; i < babelLoaderQuery.plugins.length; ++i) {
    let plugin = babelLoaderQuery.plugins[i];
    if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
      reactTransform = plugin;
    }
  }

  if (!reactTransform) {
    reactTransform = ['react-transform', {transforms: []}];
    babelLoaderQuery.plugins.push(reactTransform);
  }

  if (!reactTransform[1] || !reactTransform[1].transforms) {
    reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []});
  }

  // make sure react-transform-hmr is enabled
  reactTransform[1].transforms.push({
    transform: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module'],
  });

  module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
      'main': [
        './${b}',
      ],
    },
    output: {
      path: assetsPath,
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: '/${c}/',
    },
    module: {
      loaders: [
        { test: /${templateString}js$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelLoaderQuery)]},
        { test: /${templateString}json$/, loader: 'json-loader' },
        { test: /${templateString}less$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
        { test: /${templateString}scss$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
        { test: /${templateString}woff${templateString4}?v${templateString2}d${templateString3}.${templateString8}d+${templateString6}d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
        { test: /${templateString}woff2${templateString4}?v${templateString2}d${templateString3}.${templateString8}d+${templateString6}d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
        { test: /${templateString}ttf${templateString4}?v${templateString2}d${templateString3}.${templateString8}d+${templateString6}d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
        { test: /${templateString}eot${templateString4}?v${templateString2}d${templateString3}.${templateString8}d+${templateString6}d+)?$/, loader: "file" },
        { test: /${templateString}svg${templateString4}?v${templateString2}d${templateString3}.${templateString8}d+${templateString6}d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
        { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
      ]
    },
    progress: true,
    resolve: {
      modulesDirectories: [
        '${d}',
        'node_modules'
      ],
      extensions: ['', '.json', '.js', '.jsx']
    },
    plugins: [
      new CleanPlugin([assetsPath], { root: projectRootPath }),

      // css files from the extract-text-plugin loader
      new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        },

        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false
      }),

      // ignore dev config
      new webpack.IgnorePlugin(/${templateString}${templateString7}/dev/, /${templateString5}config$/),

      // optimizations
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),

      webpackIsomorphicToolsPlugin
    ]
  };`
  );
};
