import Vue from 'vue';

require('./style.scss');

module.exports = Vue.extend({
  template: require('./index.html'),
  mounted() {
    console.log('home view ready');
  },
});
