const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

module.exports = {
  entry: './src/index.js',
  output: {
    path: PATHS.dist,
    filename: './assets/js/[name].js',
  },
  devtool: 'source-map',
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    open: true,
    host: 'localhost',
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(ttf|eot|otf|woff2?)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/fonts/[name][ext]' },
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp|ico)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/images/[name][ext]' },
      },
      {
        test: /\.(mp4)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/videos/[name][ext]' },
      },
      {
        test: /\.(mp3)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/media/[name][ext]' },
      },
      {
        test: /\.(docx?|xlsx?|pptx?|pdf)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/docs/[name][ext]' },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(
      {
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      },
    )],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/assets/images`, to: `${PATHS.dist}/assets/images` },
      ],
    }),
  ],
};
