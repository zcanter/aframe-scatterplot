const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './build'),
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'a-scatterplot.js',
  },
};