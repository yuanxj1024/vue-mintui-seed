export default function (wx, ops) {
  // {
  //   title: '', // 分享标题
  //   desc: '', // 分享描述
  //   link: '', // 分享链接
  //   imgUrl: '', // 分享图标
  //   success: function () {
  //     // 用户确认分享后执行的回调函数
  //   },
  //   cancel: function () {
  //     // 用户取消分享后执行的回调函数
  //   }
  // }
  // 分享到朋友圈
  wx.onMenuShareTimeline(ops);
  // 分享给朋友
  wx.onMenuShareAppMessage(ops);
  // 分享到QQ
  wx.onMenuShareQQ(ops);
  // 分享到腾讯微博
  wx.onMenuShareWeibo(ops);
  // 分享到QQ空间
  wx.onMenuShareQZone(ops);
}
