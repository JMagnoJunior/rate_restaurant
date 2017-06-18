var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('bundle.min.css')

module.exports = [{
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/client.js",
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  module: {
    
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0','airbnb'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
   

    ]
  },
  output: {
    path: __dirname + "/dist/",
    publicPath: "/",
    filename: "client.min.js"
  },
  plugins: debug ? [
        new webpack.DefinePlugin({      
        'process.env.BACKEND_ENV': JSON.stringify('http://localhost:3000/')
    })

    ] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.BACKEND_ENV': JSON.stringify('http://localhost:3000/')  // It should be some production backend server
    })
  ]

}, 
]