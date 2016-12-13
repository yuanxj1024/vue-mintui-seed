/**
 * 实盘账户入口页
 */
import 'babel-polyfill';
import {
  search,
} from 'tools';

require('../stylesheets/index.scss');
require('plugins/normalize-css/normalize.css');
require('crypto');
require('mint-ui/lib/style.css');

require.ensure(['vue', 'mint-ui', 'vue-router', 'vue-resource', 'appStore', 'cookie', 'appCookie', 'mutationType'], (require) => {
  const Vue = require('vue');
  const VueResource = require('vue-resource');
  const VueRouter = require('vue-router');
  const MintUI = require('mint-ui');
  // 加载状态
  const store = require('appStore');
  // const {
  //   SET_TRADE_TOKEN,
  // } = require('mutationType');

  // 加载路由配置
  const loadRouter = require('./router/market.js');

  Vue.use(VueRouter);
  Vue.use(VueResource);
  Vue.use(MintUI);


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

  // const router = new VueRouter({
  //   saveScrollPosition: true,
  // });
  /**
   * 把路由实例公布到window对象上
   */
  const router = loadRouter(VueRouter);
  // const router = new VueRouter({
  //   routes: [{
  //     path: '/home',
  //     component: require('component/home-view'),
  //   }, {
  //     path: '/about',
  //     component: require('component/about'),
  //   }, {
  //     path: '/bar',
  //     component: {
  //       template: '<div>12312312</div>',
  //     },
  //   }],
  // });
  window.AppRouter = router;
  window.AppStore = store;

  new Vue({
    router,
    store,
    components: {},
    data() {
      return {
        isReady: false,
        toastArg: {
          success: {
            show: false,
            text: '',
          },
          cancel: {
            show: false,
            text: '',
          },
          text: {
            show: false,
            text: '',
          },
          warn: {
            show: false,
            text: '',
          },
        },
        loadingArg: {
          show: false,
          text: '',
        },
        confirmArg: {
          type: 'text',
          confirmText: '确认',
          cancelText: '取消',
          show: false,
          title: '',
          text: '',
          onConfirm: () => {},
          onCancel: () => {},
        },
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.isReady = true;
        const debug = search('debug');
        MintUI.Toast('111');
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
    methods: {
      toast({
        text,
        type = 'text',
      }) {
        switch (type) {
          case 'success':
            this.toastArg.success.show = true;
            this.toastArg.success.text = text;
            break;
          default:
          case 'cancel':
            this.toastArg.cancel.show = true;
            this.toastArg.cancel.text = text;
            break;
          case 'text':
            this.toastArg.text.show = true;
            this.toastArg.text.text = text;
            break;
          case 'warn':
            this.toastArg.warn.show = true;
            this.toastArg.warn.text = text;
            break;
        }
      },
      showToast(text, type = 'text') {
        this.toast({
          text,
          type,
        });
      },
      loading({
        show = false,
        text = '加载中',
      }) {
        this.loadingArg.show = show;
        this.loadingArg.text = text;
      },
      showLoading(show, text) {
        this.loading({
          show,
          text,
        });
      },
      confirm({
        title,
        text,
        onConfirm,
        onCancel,
        type = 'text',
        confirmText = '确认',
        cancelText = '取消',
      }) {
        this.confirmArg.show = true;
        this.confirmArg.title = title;
        this.confirmArg.text = text;
        this.confirmArg.onConfirm = onConfirm;
        this.confirmArg.onCancel = onCancel;
        this.confirmArg.type = type;
        this.confirmArg.confrimText = confirmText;
        this.confirmArg.cancelText = cancelText;
      },
      toMarket(market, code, e) {
        // A股
        const AStock = '/market/stockA-detail.html';
        // H股
        const HStock = '/market/stockH-detail.html';
        // 美股
        const UStock = '/market/stockU-detail.html';
        // A指
        const AIndex = '/market/stockA-detail-zhi.html';
        // 港指
        const HIndex = '/market/stockH-detail-zhi.html';
        // 美指
        const UIndex = '/market/stockU-detail-zhi.html';
        let url = '';
        switch (market) {
          // 沪股
          case '1':
            url = `${AStock}?code=${code}`;
            break;
            // 沪指
          case '3':
            url = `${AIndex}?code=${code}`;
            break;
            // sh封闭式基金
          case '10':
            url = `${AStock}?code=${code}`;
            break;
            // 上海债券
          case '12':
            url = `${AStock}?code=${code}`;
            break;
            // 深股
          case '2':
            url = `${AStock}?code=${code}`;
            break;
            // 深指
          case '4':
            url = `${AIndex}?code=${code}`;
            break;
            // sz封闭式基金
          case '11':
            url = `${AStock}?code=${code}`;
            break;
            // 深圳债券
          case '13':
            url = `${AStock}?code=${code}`;
            break;
            //
          case '5':
            url = `${HStock}?code=${code}`;
            break;
          case '6':
            url = `${HIndex}?code=${code}`;
            break;
          case '17':
            url = `${HStock}?code=${code}`;
            break;
          case '18':
            url = `${HStock}?code=${code}`;
            break;
          case '21':
            url = `${HStock}?code=${code}`;
            break;
          case '7':
            url = `${UStock}?code=${code}`;
            break;
          case '8':
            url = `${UIndex}?code=${code}`;
            break;
          case '14':
            url = `${AStock}?code=${code}`;
            break;
          case '15':
            url = `${AIndex}?code=${code}`;
            break;
          case '16':
            url = `${AStock}?code=${code}`;
            break;
            // case '19':
            // case '20':
            //   market = '基金';
            //   break;
            // case '22':
            //   market = '债券逆回购';
            //   break;
            // case '100':
            //   market = '组合';
            //   break;
          default:
            url = '/market/stockA-market.html';
            break;
        }
        window.location.href = url;
        if (e) {
          e.preventDefault();
        }
      },
      loginTradePassword({
        successCb,
        errorCb,
        cancelCb,
      }) {
        this.tradePassword.password = '';
        this.tradePassword.show = true;
        this.tradePassword.successCb = successCb;
        this.tradePassword.errorCb = errorCb;
        this.tradePassword.onCancel = cancelCb;
      },
      showPasswordValidity() {
        this.tradePassword.show = false;
        this.passwordValidity.isShow = true;
      },
      selectPasswordValidty(index) {
        this.passwordValidity.selectedValidity = index;
        this.tradePassword.show = true;
        this.passwordValidity.isShow = false;
      },
      goBack() {
        window.history.go(-1);
      },
      toTop() {
        window.scrollTo(0, 0);
      },
    },
  }).$mount('#app');
});
