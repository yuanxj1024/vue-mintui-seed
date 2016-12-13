/**
 * 用户信息Actions2
 */
import {
  // USERNAME,
  USERTOKEN,
  // FUNDACCOUNT,
  // SET_USER_INFO,
  // SET_TEL_PHONE,
  // CLEAR_USRE_INFO,
} from 'mutationType';


// const setName = ({
//   dispatch,
// }, name) => {
//   dispatch(USERNAME, name);
// };
// // 设置基金账户
// const setFundAccount = ({
//   dispatch,
// }, fundAccount) => {
//   dispatch(FUNDACCOUNT, fundAccount);
// };

const setUserToken = ({
  commit,
}, userToken) => {
  commit(USERTOKEN, userToken);
};
// // 更新用户登录后信息
// const setUserInfo = ({
//   dispatch,
// }, userInfo) => {
//   dispatch(SET_USER_INFO, userInfo);
// };
// // 设置用户手机号
// const setUserTelphone = ({
//   dispatch,
// }, telphone) => {
//   dispatch(SET_TEL_PHONE, telphone);
// };
// /*
//  ** 清除用户信息
//  */
// const clearUserInfo = ({
//   dispatch,
// }) => {
//   dispatch(CLEAR_USRE_INFO);
// };

module.exports = {
  // setFundAccount,
  // setName,
  setUserToken,
  // setUserInfo,
  // clearUserInfo,
  // setUserTelphone,
};
