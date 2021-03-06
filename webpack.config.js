'use strict';

const webpack = require('webpack');

module.exports = {
  entry: './app/origin.jsx',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    // preLoaders: [
    //     { test: /\.json$/, loader: 'json'},
    // ],
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'airbnb']
        }
      }
    ]
  },
};
