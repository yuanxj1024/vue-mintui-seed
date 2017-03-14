/**
 * 设置页面标题
 */

const titleConfig = {
  kaihu: {
    home: '港美股开户',
    login: '港美股账户登录',
    register: '港美股开户(1/4)',
  },
  account: {
    accountInfo: '账户详情',
    charge: '入金',
    'charge-us': '我存入了美元',
    'deposit-help-info': '入金帮助',
    'charge-success': '入金结果',
    'charge-error': '出错了',
    withdrawal: '提现',
    'bind-inside-bank': '添加境内银行卡',
    'bind-outside-bank': '添加境外银行卡',
    history: '历史记录',
    'bank-card': '提现银行卡',
    capital: '资金账户',
    'rate-desc': '费率说明',
  },
  market: {

  },
  setTitle({
    name,
    tag,
  }) {
    if (name) {
      const title = titleConfig[tag][name] || '';
      if (title) {
        // bridge.setTitle(title);
      } else {
        // bridge.setTitle('港美股H5');
      }
    }
  },
};


module.exports = titleConfig;
