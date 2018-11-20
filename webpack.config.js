const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** ********** CONFIGS ********** **/

const imgLoaderSizeLimit = 1024 * 10; // 10kb

/** ********** MAIN ********** **/

module.exports = (env, argv) => ({
  mode: env.prod ? 'production' : 'development',

  entry: {
    index: './src/index.tsx',
  },

  output: {
    path: path.resolve(__dirname, 'dist/static'),

    publicPath: env.prod ? '/static/' : '/',
    filename: env.prod ? '[name].[contenthash].js' : '[name].js',
    chunkFilename: env.prod ? '[name].[contenthash].js' : '[name].js',
  },

  module: {
    rules: [
      // TypeScript
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      // SVG
      {
        test: /\.(svg)$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            limit: imgLoaderSizeLimit,
            noquotes: true,  // Remove quotes around the encoded URL
          },
        },
        exclude: /node_modules/,
      },

      // Image compression
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'image-webpack-loader',
        },
        enforce: 'pre',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index_prod.html',
      chunks: ['index', 'vendors', 'runtime~index'],
      favicon: path.resolve(__dirname, 'src/img/favicon.ico'),
      template: path.resolve(__dirname, 'src/html/index_prod.html'),
    }),
  ],

  optimization: {

  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },

  devtool: env.prod ? null : 'cheap-module-eval-source-map',

  devServer: {
    contentBase: path.resolve(__dirname, 'src/html/index_dev.html'),
    compress: true,
    port: 8080,
    overlay: {
      errors: true,
      warnings: true,
    },
    staticOptions: {
      extensions: ['html'],
    },
    hot: true,
  },
});
