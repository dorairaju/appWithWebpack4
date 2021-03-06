const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  /*
    // single entry
    entry: './src/index.js',
  */
  entry: {
    'hello-world': './src/index.js',
    'newImage': './src/sampleImage.js'
  },
  output: {
    // filename: 'bundle.[contenthash].js',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: ''
  },
  mode: 'production', // development, production
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 7000,
      automaticNameDelimiter: '_'
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader', 'css-loader'
          MiniCssExtractPlugin.loader, 'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // 'style-loader', 'css-loader', 'sass-loader'
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/env' ],
            plugins: [ 'transform-class-properties' ]
          }
        }
      },
      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader'
        ]
      },
      {
        test: /\.(woff2|woff|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'styles.[contenthash].css'
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'build/**/*')
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // it's not required when we have only one html file
      chunks: ['hello-world', 'vendors~hello-world~newImage'],
      title: 'Hello world',
      template: 'src/index.hbs',
      description: 'Some description'
      // filename: 'subfolder/custom_filename.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'image.html',
      chunks: ['newImage', 'vendors~hello-world~newImage'],
      title: 'Sample image',
      template: 'src/index.hbs',
      description: 'Some description'
      // filename: 'subfolder/custom_filename.html',
    })
  ]
}