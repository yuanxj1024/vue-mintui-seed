/**
 * 实盘账户入口页
 */
import 'babel-polyfill';
import {
  search,
} from 'tools';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import {
  Toast,
} from 'mint-ui';


require('./scss/index.scss');

// 加载状态
const store = require('appStore');

// 加载路由配置
const loadRouter = require('./service/router-config.js');

Vue.use(VueRouter);
Vue.use(VueResource);


Vue.config.devtools = true;
// 配置xhr请求
Vue.http.options.xhr = {
  withCredentials: true,
};
Vue.http.options.emulateJSON = true;

// Vue.transition('fade', {
//   enterClass: 'fadeInLeft',
//   leaveClass: 'fadeOutRight',
// });

/**
 * 把路由实例公布到window对象上
 */
const router = loadRouter(VueRouter);
window.AppRouter = router;
window.AppStore = store;

const App = Vue.extend({
  el: '#app',
  router,
  store,
  components: {},
  data() {
    return {
      isReady: false,
    };
  },
  mounted() {
    console.log('app ready');
    this.$nextTick(() => {
      this.isReady = true;
      const debug = search('debug');
      Toast('111');
      const time = new Date().getTime();
      console.log(time);
      store.commit('USERTOKEN', time);
      if (debug) {
        // const token = search('usertoken');
        // const fundAccount = search('fundAccount');
        // store.dispatch('FUNDACCOUNT', fundAccount);
      }
    });
  },
});

new App();
