const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './build'),
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'a-scatterplot.min.js',
  },
  module: {
      loaders: [
            { test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, loader: "file-loader" }
        ]
  },  
  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
