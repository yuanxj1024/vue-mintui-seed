/**
 * 用户信息
 */
import {
  USERNAME,
  USERTOKEN,
  FUNDACCOUNT,
  SET_USER_INFO,
  CLEAR_USRE_INFO,
  SET_TEL_PHONE,
  SET_TRADE_TOKEN,
} from 'mutationType';
import cookie from 'cookie';
import {
  USER_TOKEN,
  FUND_ACCOUNT,
  TEL_PHONE,
  USER_INFO,
} from 'appCookie';

const state = {
  name: '',
  telphone: undefined,
  userToken: undefined,
  tradeToken: undefined,
  fundAccount: 0,
  userStatus: {},
};

const mutations = {
  [USERNAME]: (s, name) => {
    s.name = name;
  },
  [USERTOKEN]: (s, token) => {
    s.userToken = token;
    cookie.set(USER_TOKEN, token);
  },
  [FUNDACCOUNT]: (s, fundAccount) => {
    s.fundAccount = fundAccount;
    cookie.set(FUND_ACCOUNT, fundAccount);
  },
  [SET_USER_INFO]: (s, userInfo) => {
    s.userStatus = Object.assign(s.userStatus, userInfo);
    cookie.set(USER_INFO, userInfo);
  },
  [SET_TEL_PHONE]: (s, telphone) => {
    s.telphone = telphone;
    cookie.set(TEL_PHONE, telphone);
  },
  [SET_TRADE_TOKEN]: (s, tradeToken) => {
    s.tradeToken = tradeToken;
  },
  [CLEAR_USRE_INFO]: (s) => {
    s.userToken = undefined;
    s.fundAccount = 0;
    s.telphone = undefined;
    s.tradeToken = undefined;
    s.userStatus = {};
  },
};

module.exports = {
  state,
  mutations,
};
