import IScroll from 'plugins/iscroll/build/iscroll-probe.js';
import Vue from 'vue';


import {
  Pulldown,
  Pullup,
  //  addClass,
  //  removeClass,
  containClass,
} from './pull.js';

const pullThreshold = 5;
const pulldownDefaultConfig = () => ({
  content: 'Pull Down To Refresh',
  height: 60,
  autoRefresh: false,
  upContent: 'Pull Down To Refresh',
  downContent: 'Release To Refresh',
  loadingContent: 'Loading...',
  clsPrefix: 'vue-iscroll-pulldown-',
});

const pullupDefaultConfig = () => ({
  content: 'Pull Up To Refresh',
  pullUpHeight: 60,
  height: 40,
  autoRefresh: false,
  upContent: 'Release To Refresh',
  downContent: 'Pull Up To Refresh',
  loadingContent: 'Loading...',
  clsPrefix: 'vue-iscroll-pullup-',
});

module.exports = Vue.extend({
  template: require('./index.html'),
  name: 'vue-iscroller',
  props: {
    bottomHeight: {
      type: String,
      default: '0',
    },
    usePulldown: {
      type: Boolean,
      default: false,
    },
    usePullup: {
      type: Boolean,
      default: false,
    },
    pulldownConfig: {
      type: Object,
      default: () => {},
    },
    pullupConfig: {
      type: Object,
      default: () => {},
    },
  },
  compiled() {
    this.uuid = Math.random().toString(36).substring(3, 10);
  },
  ready() {
    this.$el.setAttribute('id', `scroller-${this.uuid}`);
    let content = null;
    const slotChildren = this.$el.querySelector('.scroller').childNodes;
    for (let i = 0; i < slotChildren.length; i += 1) {
      if (slotChildren[i].nodeType === 1) {
        content = slotChildren[i];
        break;
      }
    }
    if (!content) {
      throw new Error('no content is found');
    }

    this._scroller = new IScroll(`#scroller-${this.uuid}`, {
      probeType: 2,
      bounceTime: 250,
      bounceEasing: 'quadratic',
      mouseWheel: false,
      scrollbars: true,
      fadeScrollbars: true,
      interactiveScrollbars: false,
      preventDefault: false,
      click: true,
    });
    if (this.usePulldown) {
      //  if use slot=pulldown
      const config = Object.assign(pulldownDefaultConfig(), this.pulldownConfig);
      config.container = this.$el.querySelector('.scroller');

      if (!config.container) {
        throw new Error('pulldown has no container');
      }
      //  构建pulldown的HTML
      const pulldown = this.pulldown = new Pulldown(config);
      pulldown.on('loading', () => {
        this.$dispatch('pulldown:loading', this.uuid);
      });
      // const pulldownOffset = pulldown.element.offsetHeight;
      this.pulldownOffset = pulldown.element.offsetHeight;
    }

    if (this.usePullup) {
      const config = Object.assign(pullupDefaultConfig(), this.pullupConfig);
      config.container = this.$el.querySelector('.scroller');

      if (!config.container) {
        throw new Error('pullup has no container');
      }
      // 构建pullup的HTML
      const pullup = this.pullup = new Pullup(config);
      pullup.on('loading', () => {
        this.$dispatch('pullup:loading', this.uuid);
      });
      pullup.on('complete', () => {
        this.$dispatch('pullup:complete', this.uuid);
      });
      // const pullupOffset = pullup.element.offsetHeight;
      console.log('pullup', pullup);
      this.pullupOffset = pullup.element.offsetHeight;
    }

    let startPos = null;
    this._scroller.on('scrollStart', function dd1() {
      startPos = this.y;
    });

    const that = this; // 保存this

    that._scroller.on('scroll', function sb() {
      if (that.usePulldown || that.usePullup) {
        this.hasVerticalScroll = true;
        startPos = -1000;
      } else if (startPos === -1000 && ((!that.usePullup && (this.y < 0)) || ((!that.usePulldown) && (this.y > 0)))) {
        this.hasVerticalScroll = false;
        startPos = 0;
        this.scrollBy(0, -this.y, 0); // Adjust scrolling position to undo this 'invalid' movement
      }

      if (that.usePulldown) {
        if (this.y > that.pulldownOffset + pullThreshold && !containClass(that.pulldown.element, 'vue-iscroll-pulldown-down')) {
          that.pulldown.release();
          // console.log('call release')
          this.scrollBy(0, -that.pulldownOffset, 0); //  Adjust scrolling position to match the change in pullDownEl's margin-top
        } else if (this.y < 0 && containClass(that.pulldown.element, 'vue-iscroll-pulldown-down')) { //  User changes his mind...
          that.pulldown.pull();
          this.scrollBy(0, that.pulldownOffset, 0); //  Adjust scrolling position to match the change in pullDownEl's margin-top
        }
      }
      if (that.usePullup) {
        if (this.y < ((this.maxScrollY - that.pullupOffset) + pullThreshold) && !containClass(that.pullup.element, 'vue-iscroll-pullup-up')) {
          that.pullup.release();
        } else if (this.y > ((this.maxScrollY - that.pullupOffset) + pullThreshold) && containClass(that.pullup.element, 'vue-iscroll-pullup-up')) {
          that.pullup.push();
        }
      }
    });

    that._scroller.on('scrollEnd', function sa() {
      if (that.pulldown && containClass(that.pulldown.element, 'vue-iscroll-pulldown-down')) {
        // console.log('scroll end')
        that.pulldown.loading();
      }

      if (that.pullup && containClass(that.pullup.element, 'vue-iscroll-pullup-up')) {
        // console.log('scroll end');
        // console.log(this)
        // this.scrollBy(0,-pullupOffset, 0);
        that.pullup.loading();
      }

      if (startPos === -1000) {
        //  If scrollStartPos=-1000: Recalculate the true value of 'hasVerticalScroll' as it may have been
        //  altered in 'scroll' to enable pull-to-refresh/load when the content fits the screen...
        this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
      }
    });
  },
  methods: {
    reset(timeout = 0) {
      // console.log('reset');
      // console.log(this._scroller);
      if (this._scroller) {
        setTimeout(() => {
          // console.log('refresh')
          this._scroller.refresh();
        }, timeout);
      }
    },
    complete() {
      this.pullup = null;
      delete this.pullup;
      this.usePullup = false;
    },
  },
  events: {
    'scroll-reset': function a() {
      // console.log('reset event')
      this.reset();
    },
    // 下拉刷新，重置iscroll
    'pulldown:reset': function b(uuid) {
      if (uuid === this.uuid) {
        this.pulldown.reset(() => {
          this.reset(1000);
        });
      }
    },
    // 上拉加载，重置iscroll
    'pullup:reset': function c(uuid) {
      if (uuid === this.uuid) {
        this.pullup.reset(() => {
          // repaint,timeout需要设置长一点
          this.reset(1000);
        });
      }
    },
    // 上拉加载，数据加载完毕
    'pullup:done': function d() {
      this.pullup.complete(() => {
        this.reset(1000);
      });
      this.complete();
    },
  },
  beforeDestroy() {
    this._scroller.destroy();
  },
});
