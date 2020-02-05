const { join } = require('path');
const { dev } = require('webpack-nano/argv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackPluginServe } = require('webpack-plugin-serve');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: require('./babel.config')
  },
  {
    test: /\.css$/,
    loader: 'file-loader'
  }
];

const mode = dev ? 'development' : 'production';
const watch = dev;

const entry = ['./src/index.jsx'];
if (dev) entry.push('webpack-plugin-serve/client');

const output = {
  path: join(process.cwd(), 'dist'),
  filename: '[name].[chunkhash].js',
  chunkFilename: '[name].[chunkhash].lazy.js'
};
if (dev) {
  output.filename = '[name].js';
  output.chunkFilename = '[name].lazy.js';
}

const plugins = [
  new HtmlWebpackPlugin({ template: 'src/index.html' }),
  new CleanWebpackPlugin({
    // doesn't play nice with webpack-plugin-serve
    cleanStaleWebpackAssets: false
  })
];
if (dev) {
  plugins.push(
    new WebpackPluginServe({
      host: 'localhost',
      port: 4200,
      static: output.path,
      progress: false,
      historyFallback: true
    })
  );
}

const extensions = ['.js', '.jsx'];

const stats = {
  // copied from `'minimal'`
  all: false,
  modules: true,
  maxModules: 0,
  errors: true,
  warnings: true,
  // our additional options
  builtAt: true
};

const devtool = dev ? 'cheap-module-eval-source-map' : 'source-map';

module.exports = {
  mode,
  watch,
  entry,
  output,
  module: { rules },
  plugins,
  resolve: {
    extensions
  },
  stats,
  devtool
};
