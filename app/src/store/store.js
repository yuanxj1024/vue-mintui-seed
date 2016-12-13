/**
 * 数据存储
 */
import Vuex from 'vuex';
import Vue from 'vue';


import user from 'modules/user.js';
// import kaihu from 'modules/kaihu.js';
// import account from 'modules/account.js';
import * as actions from './actions';
import * as getters from './getters';


Vue.use(Vuex);

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    // kaihu,
    // account,
  },
});
module.exports = store;
