/**
 * 实盘账户接口
 * http://wiki.niuguwang.com:8090/pages/viewpage.action?pageId=2687565
 */
const request = require('request');

const KhHost = 'https://trade.huanyingzq.com/nztradeproxy';
// 股票搜索
const SwwwHost = 'https://swww.niuguwang.com';
const ShqHost = 'https://shq.niuguwang.com';
const HqHost = 'https://hq.niuguwang.com';

module.exports = {
  /**
   * 首页，获取当前币种下相关信息
   */
  currencyInfo(ops) {
    return request.post(`${KhHost}/client/homepage.ashx`, ops, {});
  },
  /**
   * 当前持仓数据
   */
  position(ops) {
    return request.post(`${KhHost}/client/queryposdetail.ashx`, ops, {});
  },
  // 历史持仓列表
  historyPositionList(ops) {
    return request.post(`${KhHost}/order/queryhistradetrans.ashx`, ops, {});
  },
  // 历史持仓明细
  historyPosition(ops) {
    return request.post(`${KhHost}/order/queryhistradetransdetail.ashx`, ops, {});
  },
  // 撤销委托单
  revertOrder(ops) {
    return request.post(`${KhHost}/order/signviewfailorder.ashx`, ops, {});
  },
  // 删除失败订单
  deleteOrder(ops) {
    return request.post(`${KhHost}/order/signviewfailorder.ashx`, ops, {});
  },
  /**
   * 股票搜索
   * http://wiki.niuguwang.com:8090/pages/viewpage.action?pageId=2688074
   */
  searchStocks(ops) {
    return request.simpleGet(`${SwwwHost}/stock/searchstock.ashx`, ops, {});
  },
  /**
   * 获取自选股票
   * http://wiki.niuguwang.com:8090/pages/viewpage.action?pageId=2689770
   */
  getUserStocks(ops) {
    return request.simpleGet(`${ShqHost}/aquote/userdata/getuserstocks.ashx`, ops, {});
  },
  /**
   * 获取浏览历史股票列表
   * 可以根据多个股票内码获取股票信息
   * http://wiki.niuguwang.com:8090/pages/viewpage.action?pageId=2689776
   */
  getHistoryStocks(ops) {
    return request.simpleGet(`${HqHost}/aquote/quotedata/getcodesdata.ashx`, ops, {});
  },
  // 选中买入股票
  selectBuyStock(ops) {
    return request.post(`${KhHost}/order/buypage.ashx`, ops, {});
  },
  // 选中卖出股票
  selectSellStock(ops) {
    return request.post(`${KhHost}/order/sellpage.ashx`, ops, {});
  },
  /*
   ** 股票买入下单
   */
  orderStock(ops) {
    return request.post(`${KhHost}/order/order.ashx`, ops, {});
  },
  // 查询交易记录
  queryTradeRecord(ops) {
    return request.post(`${KhHost}/order/querytraderecord.ashx`, ops, {});
  },
  // 获取交易明细
  getTradeDetail(ops) {
    return request.post(`${KhHost}/order/queryexecdetail.ashx`, ops, {});
  },
  // 登出
  logout() {
    return request.post(`${KhHost}/newapp/logout.ashx`, {}, {});
  },
  // 交易密码登录
  loginTradePassword(ops) {
    return request.post(`${KhHost}/newapp/login.ashx`, ops, {});
  },
  // 检查密码
  checkPassword(ops) {
    return request.post(`${KhHost}/newapp/login.ashx`, ops, {});
  },
  // 修改密码
  resetPassword(ops) {
    return request.post(`${KhHost}/newapp/modifytradepwd.ashx`, ops, {});
  },
  /*
   * 校验身份证号
   */
  checkIdentity(ops) {
    return request.post(`${KhHost}/newapp/checkrealid.ashx`, ops, {});
  },
  /*
   ** 请求发送重置密码验证码
   */
  resetPasswordSMSCode() {
    return request.post(`${KhHost}/newapp/resetpwdcheckcode.ashx`, {}, {});
  },
  /*
  * 找回密码
  */
  resetTradePassword(ops) {
    return request.post(`${KhHost}/newapp/resetpwd.ashx`, ops, {});
  },
};
