const path = require('path')
const HtmlWebpackplugin = require('html-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDevelopment ? 'production': 'development',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  
  devtool: isDevelopment? 'source-map' : 'inline-source-map',
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
      directory : path.join(__dirname, 'public')
    },
    hot: true,
  },
  plugins: [
    new HtmlWebpackplugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],
  
  module: {
    rules: [
     {
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    },
    
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },
  ]
  }

}