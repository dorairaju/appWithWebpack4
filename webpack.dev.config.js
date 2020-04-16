const path = require('path');
const TerserPlugin = require('terser-webpack-plugin'); // alternate to uglifyjs
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: './src/index.js',
  entry: {
    'hello-world': './src/index.js',
    'newImage': './src/sampleImage.js'
  },
  output: {
    // filename: 'bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: ''
  },
  mode: 'development', // development, production
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    index: 'index.html',
    port: 9000
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
          'style-loader', 'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['transform-class-properties']
          }
        }
      },
      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader'
        ]
      }
    ]
  },
  plugins: [
    new TerserPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'build/**/*')
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['hello-world'],
      title: 'Hello world',
      template: 'src/index.hbs',
      description: 'Some description'
      // filename: 'subfolder/custom_filename.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'image.html',
      chunks: ['newImage'],
      title: 'Sample Image',
      template: 'src/index.hbs',
      description: 'Sample image'
      // filename: 'subfolder/custom_filename.html',
    })
  ]
}