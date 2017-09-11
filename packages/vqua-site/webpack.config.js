const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill','./build/index.js'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    fs: 'empty',
    path: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                require('babel-preset-env'), {
                'targets': {
                  'browsers': ['last 2 versions'],
                  // 'node': 'current',
                }
              }]
            ],
            plugins: [
              require('babel-plugin-transform-async-to-generator')
            ],
          }
        }
      }
    ]
  },
}
