import Vue from 'vue';
import Alert from 'vux-components/alert';

const tpl = '<alert :show.sync="show" title="融资金额" button-text="我知道了"> ' +
  '<p class="capital-tip" >每日按照融资金额的日利息率计提融资利息，并于月底一次性扣除</p>' +
  '</alert>';

module.exports = Vue.extend({
  components: {
    alert: Alert,
  },
  template: tpl,
  props: ['show'],
});
