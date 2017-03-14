var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var containerPath = path.resolve('./');
var compileConfig = require('../app/compile.config.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSASS = new ExtractTextPlugin('[name].css');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var getEntry = require('./getEntry');
var alias = require('../app/alias.js');
var compile = require('./compile');

//  对complie配置文件进行处理
compileConfig = compile(compileConfig);

//  配置入口文件
var entrys = getEntry('./app/src/*.js');

entrys['vendor'] = [
  'babel-polyfill',
  'vue',
  'vuex',
  'vue-router',
  'vue-resource'
];

//  添加插件
var plugins = [];

//  切割css文件
plugins.push(extractSASS);

//  提取公共文件
plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: 'vendor.js?[hash:8]'
}));
plugins.push(new webpack.HotModuleReplacementPlugin());

plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  }
}));

//  处理html
var pages = getEntry('./app/src/*.pug');
for (var chunkname in pages) {
  var conf = {
    filename: chunkname + '.html',
    template: pages[chunkname],
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    chunks: ['vendor', chunkname],
    hash: true,
    complieConfig: compileConfig
  }
  plugins.push(new HtmlWebpackPlugin(conf));
}


//  配置webpack
var config = {
  entry: entrys,
  output: {
    path: path.resolve(containerPath, './dist'),
    filename: '[name].js'
  },
  devtool: false,
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    }, {
      test: /\.html$/,
      use: ['raw-loader'],
      exclude: /(node_modules)/
    }, {
      test: /\.js$/,
      use: ['babel-loader', 'eslint-loader'],
      exclude: /(node_modules|plugins)/
    }, {
      test: /\.scss$/,
      use: extractSASS.extract({
        use: ['css-loader', 'sass-loader']
      }),
      exclude: /(node_modules|plugins)/
    }, {
      test: /\.css$/,
      use: extractSASS.extract({
        use: ['css-loader']
      }),
    }, {
      test: /.pug$/,
      use: ['pug-loader'],
      exclude: /(node_modules|plugins)/
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: ['file-loader']
    }, {
      test: /\.(png|jpg|gif)$/,
      use: 'url-loader?limit=8192&name=images/[name].[ext]',
      exclude: /(node_modules)/
    }]
  },
  plugins: plugins,
  resolve: {
    alias: alias,
    extensions: ['.js', '.css', '.scss', '.pug', '.png', '.jpg']
  },
  externals: {}
};
module.exports = config;
