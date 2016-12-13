import Vue from 'vue';
import {
  mapGetters,
} from 'vuex';

module.exports = Vue.extend({
  template: require('./index.html'),
  computed: mapGetters({
    userToken: 'userToken',
  }),
  created() {
    console.log('about created');
  },
  mounted() {
    this.$toast('1111');
    console.log('about', this.userToken);
    this.$nextTick(() => {
      console.log(22);
    });
  },
});
