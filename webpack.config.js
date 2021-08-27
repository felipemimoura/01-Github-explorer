const path = require('path')
const HtmlWebpackplugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDevelopment ? 'production': 'development',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  
  devtool: isDevelopment ? 'inline-source-map' : 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    static:{
      directory : path.join(__dirname, 'public'),
    },
    hot: true
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin({
      overlay: false
    }),
    new HtmlWebpackplugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ].filter(Boolean),
  
  module: {
    rules: [
     {
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: [
            isDevelopment && require.resolve('react-refresh/babel')
          ].filter(Boolean)
        }
      }
    },
    
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },
  ]
  }

}