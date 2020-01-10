const path = require('path');

module.exports = {
  entry: './bundle.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js',
  },
  target: 'node',
};
