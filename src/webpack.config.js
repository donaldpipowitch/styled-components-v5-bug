const { join } = require('path');
const { dev } = require('webpack-nano/argv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackPluginServe } = require('webpack-plugin-serve');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const rules = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: require('./babel.config')
  },
  {
    test: /\.css$/,
    loader: 'file-loader'
  },
  {
    test: /\.(png|jpg|gif|svg|ico)$/,
    loader: 'url-loader?limit=1000&name=[name]-[hash].[ext]'
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader'
  },
  {
    test: /\.(woff|woff2)$/,
    loader: 'url-loader?prefix=font/&limit=5000'
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
  }
];

const mode = dev ? 'development' : 'production';
const watch = dev;

const entry = ['./src/index.tsx'];
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
      historyFallback: true,
      middleware: (app, builtins) =>
        app.use(async (ctx, next) => {
          // these file are processed by the file loader and hashed (even for development)
          // serve them with active caching to avoid flashing content
          // (e.g. fonts would be requested multiple times withing development,
          // because we use hot reloading)
          const exts = [
            '.png',
            '.jpg',
            '.gif',
            '.svg',
            '.ico',
            '.css',
            '.eot',
            '.woff',
            '.woff2',
            '.ttf'
          ];
          const [url] = ctx.url.split('?');
          if (exts.some((ext) => url.endsWith(ext))) {
            ctx.set('Cache-Control', 'public, max-age=31536000');
          }
          await next();
        })
    })
  );
}

const extensions = ['.ts', '.tsx', '.js'];

const resolveLoader = {
  alias: {
    // see https://www.npmjs.com/package/copy-loader
    'copy-loader': 'file-loader?name=[path][name].[ext]&context=./src'
  }
};

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
  resolveLoader,
  devtool
};
