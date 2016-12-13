/**
 * 插件别名配置
 */
var path = require('path');
var containerPath = path.resolve('./');

//	别名
var alias = {
  'vue': path.resolve(containerPath, './node_modules/vue/dist/vue.min.js'),
  'vue-router': path.resolve(containerPath, './node_modules/vue-router/dist/vue-router.min.js'),
  'vue-resource': path.resolve(containerPath, './node_modules/vue-resource/dist/vue-resource.min.js'),
  vuex: path.resolve(containerPath, './node_modules/vuex/dist/vuex.min.js'),
  cryptojs: path.resolve(containerPath, './node_modules/crypto-js'),
  cookie: path.resolve(containerPath, './node_modules/js-cookie/src/js.cookie.js'),
  plugins: path.resolve(containerPath, './node_modules'),

  tools: path.resolve(containerPath, './app/src/base/tools.js'),
  crypto: path.resolve(containerPath, './app/src/base/crypto/index.js'),

  actions: path.resolve(containerPath, './app/src/store/actions'),
  getters: path.resolve(containerPath, './app/src/store/getters'),
  filter: path.resolve(containerPath, './app/src/filter'),
  modules: path.resolve(containerPath, './app/src/store/modules'),
  mutationType: path.resolve(containerPath, './app/src/store/mutation-type.js'),
  request: path.resolve(containerPath, './app/src/base/request/index.js'),
  appStore: path.resolve(containerPath, './app/src/store/store.js'),
  appCookie: path.resolve(containerPath, './app/src/service/cookie-name.js'),
  'wx-share': path.resolve(containerPath, './app/base/wx-share.js'),
  service: path.resolve(containerPath, './app/src/service'),
  API: path.resolve(containerPath, './app/src/API'),

  component: path.resolve(containerPath, './app/src/component'),
  // -- 通用部分组件
  common: path.resolve(containerPath, './app/src/component/_'),
};


module.exports = alias;
