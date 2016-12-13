/**
 * 处理所有的queryString参数
 */
import {
  search,
} from 'tools';

/**
 * 充值结果模块
 */
const PayResult = {
  /**
   * 处理入金结果
   */
  handlePayResult: () => {
    const factMoney = search('FactMoney') || '';
    let params;
    if (factMoney) {
      params = PayResult.handlePaySuccess();
    } else {
      params = PayResult.handlePayError();
    }
    if (params && Object.prototype.hasOwnProperty.call(params, 'page')) {
      window.AppRouter.go({
        name: params.page,
        params: {
          title: params.title,
          msg: params.msg,
        },
      });
    }
  },
  /**
   * 入金成功
   * ?MemberID=300407&TerminalID=19761&TransID=23805e2662c74c9f87642f9540aa18cb&
   * Result=1&ResultDesc=01&FactMoney=697&AdditionalInfo=2007808%7C1&
   * SuccTime=20161130180218&Md5Sign=de7f4cd99dc3a75cc9d45f58d4facefb&BankID=4020080
   */
  handlePaySuccess: () => {
    let factMoney = search('FactMoney') || '';
    const result = search('Result');
    let params = '';
    factMoney = parseFloat(factMoney / 100, 10);
    if (factMoney && result) {
      params = {
        page: 'charge-success',
        title: '入金成功',
        msg: `您入金的${factMoney.toFixed(2)}元已到账，可立即用于交易股票`,
      };
    }
    return params;
  },
  /**
   * 入金失败传递过来的参数
   * params={"page":"charge-error","title":"金额错误","msg":"入金金额超过范围"}
   */
  handlePayError: () => {
    let params = search('params');
    if (!params) {
      return null;
    }
    params = decodeURI(params);
    try {
      params = JSON.parse(params);
    } catch (e) {
      console.log(e);
    }
    return params;
  },
};

module.exports = {
  handlePayResult: PayResult.handlePayResult,
};
