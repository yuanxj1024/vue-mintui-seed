var config = require("./webpack.dev.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var port = 8010;

for (var item in config.entry) {
  config.entry[item].unshift("webpack-dev-server/client?http://localhost:" + port + "/", 'webpack/hot/dev-server');
}

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  hot: true,
  stats: {
    colors: true,
  },
  contentBase: 'app/'
});
server.listen(port);
