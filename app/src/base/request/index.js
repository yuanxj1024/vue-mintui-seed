/**
 * 封装请求
 */

import Vue from 'vue';
import _ from '_';
import crypto from 'crypto';
import AppStore from 'appStore';


let flowno = 1;
const tradeToken = '';

const getGMToken = () => {
  return new Promise((resolve) => {
    resolve({
      fundAccount: AppStore.state.user.fundAccount || '',
      hyToken: AppStore.state.user.userToken || '',
      flowno: flowno += 1,
      tradeToken: AppStore.state.user.tradeToken || tradeToken,
    });
  });
};

// x-www-form-urlencoded设置
Vue.http.options.emulateJSON = true;

const Request = {
  get(url, query, ops) {
    return new Promise((resolve, reject) => {
      let params = query;
      const setting = _.extend({}, ops);
      let result;
      getGMToken().then((data) => {
        params = _.extend({}, data);

        setting.params = {
          param: crypto.encode(JSON.stringify(params)),
        };

        Vue.http.get(url, setting).then((res) => {
          result = crypto.decode(res.data);
          if (typeof result === 'string') {
            try {
              result = JSON.parse(result);
            } catch (e) {
              reject(e);
            }
          }
          resolve(result);
        }, (err) => {
          reject(err);
        });
      });
    });
  },
  post(url, query, ops) {
    let params;
    const setting = _.extend({}, ops);
    let result;
    let body;
    return new Promise((resolve, reject) => {
      getGMToken().then((data) => {
        params = _.extend({}, query, data);

        setting.params = {};
        console.info('[request]:', url, params);
        body = {
          param: crypto.encode(JSON.stringify(params)),
        };

        Vue.http.post(url, body, setting).then((res) => {
          result = crypto.decode(res.data);
          if (typeof result === 'string') {
            try {
              result = JSON.parse(result);
            } catch (e) {
              console.log(e);
              reject();
            }
          }
          console.info('[response]:', url, result);
          resolve(result);
        }, (err) => {
          reject(err);
        });
      });
    });
  },
  simplePost(url, query, ops) {
    const setting = _.extend({}, ops);
    const postUrl = url;
    // let result;

    return new Promise((resolve, reject) => {
      Vue.http.post(postUrl, query, setting).then((res) => {
        // result = res;
        // if (typeof result === 'string') {
        //   result = JSON.parse(result);
        // }
        if (res.ok) {
          resolve(res.json());
        } else {
          reject(res);
        }
      }, (err) => {
        reject(err);
      });
    });
  },
  simpleGet(url, query) {
    const postUrl = url;
    // let result;
    return new Promise((resolve, reject) => {
      Vue.http.get(postUrl, {
        params: query,
      }).then((res) => {
        // result = res;
        // if (typeof result === 'string') {
        //   result = JSON.parse(result);
        // }
        if (res.ok) {
          resolve(res.json());
        } else {
          reject(res);
        }
      }, (err) => {
        reject(err);
      });
    });
  },
};

module.exports = Request;
