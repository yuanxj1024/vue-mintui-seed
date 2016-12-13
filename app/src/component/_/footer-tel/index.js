/**
 * 底部联系电话
 */
import Vue from 'vue';
import tabbar from 'vux-components/tabbar';

const Component = Vue.extend({
  components: {
    tabbar,
  },
  template: require('./index.html'),
  methods: {
    callPhone() {
      // bridge.telPhone('4001786006');
    },
  },
});

module.exports = Component;
