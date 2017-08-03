const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './build/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    fs: 'empty',
    path: 'empty'
  },
  plugins: []
}
