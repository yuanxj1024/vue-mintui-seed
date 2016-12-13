/**
 * 验证逻辑
 */

// import AppStore from 'appStore';

// window.AppStore = AppStore;
/**
 * 密码相关模块
 */
const Password = {
  /**
   * 校验是否设置了交易密码
   */
  verifyTradePassword: () => {
    return new Promise((resolve, reject) => {
      const hasPwd = +window.AppStore.state.user.userStatus.hasHyTradePwd || 0;
      if (hasPwd) {
        resolve();
      } else {
        window.AppRouter.replace({
          name: 'password',
        });
        reject();
      }
    });
  },
};

module.exports = {
  verifyTradePassword: Password.verifyTradePassword,
};
