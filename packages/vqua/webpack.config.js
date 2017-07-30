const path = require('path')

module.exports = {
  entry: './lib/__tests/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  }
}
