/**
 * user信息读取器
 */

const userName = ({
  user,
}) => {
  return `current:${user.name}`;
};
// 用户状态
const userStatus = ({
  user,
}) => {
  return user.userStatus;
};
// 获取UserToken
const userToken = ({
  user,
}) => {
  return user.userToken;
};
/*
 * 用户手机号
 */
const telphone = ({
  user,
}) => {
  return user.telphone;
};

module.exports = {
  userName,
  userStatus,
  userToken,
  telphone,
};
