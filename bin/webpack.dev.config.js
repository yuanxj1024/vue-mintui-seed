var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var containerPath = path.resolve('./');
var compileConfig = require('../app/compile.config.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSASS = new ExtractTextPlugin('[name].css');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var getEntry = require('./getEntry');
var rmdir = require('./rmdir');
var alias = require('./alias');
var compile = require('./compile');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

//  对complie配置文件进行处理
compileConfig = compile(compileConfig);

//  配置入口文件

var entrys = getEntry('./app/src/*.js');

//  添加插件
var plugins = [];

//  切割css文件
plugins.push(extractSASS);

//  提取公共文件
plugins.push(new webpack.optimize.CommonsChunkPlugin('common', 'common.js'));
plugins.push(new webpack.HotModuleReplacementPlugin());
plugins.push(new OpenBrowserPlugin({
  url: 'http://localhost:8010'
}));
// plugins.push(new webpack.optimize.UglifyJsPlugin({
//   compress: {
//     warnings: false
//   }
// }));

// plugins.push(new webpack.DllReferencePlugin({
//   context: __dirname,
//   manifest: require('../manifest.json')
// }));


//  处理html
var pages = getEntry('./app/src/*.jade');
for (var chunkname in pages) {
  var conf = {
    filename: chunkname + '.html',
    template: pages[chunkname],
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    chunks: ['common', chunkname],
    hash: true,
    complieConfig: compileConfig
  }
  plugins.push(new HtmlWebpackPlugin(conf));
}



//  配置webpack
var config = {
  entry: entrys,
  output: {
    path: path.resolve(containerPath, './app/www/'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.html$/,
      loader: 'raw',
      exclude: /(node_modules)/
    }, {
      test: /\.js$/,
      loaders: ['babel-loader', 'eslint-loader'],
      exclude: /(node_modules|plugins)/
    }, {
      test: /\.scss$/,
      loader: extractSASS.extract(['css', 'sass']),
      exclude: /(node_modules|plugins)/
    }, {
      test: /\.css$/,
      loader: extractSASS.extract(['css']),
    }, {
      test: /.jade$/,
      loader: 'jade-loader',
      exclude: /(node_modules|plugins)/
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file'
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=8192&name=images/[name].[ext]',
      exclude: /(node_modules)/
    }]
  },
  plugins: plugins,
  resolve: {
    alias: alias,
    extensions: ['', '.js', '.css', '.scss', '.jade', '.png', '.jpg']
  },
  externals: {}
};
module.exports = config;
