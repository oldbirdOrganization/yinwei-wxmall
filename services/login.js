const util = require("../utils/util");
const api = require("../config/api");
//登录态检测
function login() {
  return new Promise(function(resolve, reject) {
    // if (wx.getStorageSync("token")) {
    //   wx.checkSession({
    //     success() {
    //       resolve(wx.getStorageSync("userInfo"));
    //     },
    //     fail() {
    //       login_wx(resolve);
    //     }
    //   });
    // } else {
    login_wx(resolve);
    // }
  });
}
function login_wx(resolve) {
  wx.login({
    success(val) {
      if (val.code) {
        wx.getUserInfo({
          success(userInfo) {
            util
              .request(
                api.AuthLoginByWeixin,
                {
                  code: val.code,
                  userInfo
                },
                "POST",
                "application/json"
              )
              .then(res => {
                if (res.errno === 0) {
                  //存储用户信息
                  console.log(res);
                  wx.setStorageSync("userInfo", res.data.userInfo);
                  wx.setStorageSync("token", res.data.token);
                  wx.setStorageSync("userId", res.data.userId);
                  wx.setStorageSync("openId", res.data.openId);
                  resolve(res.data.userInfo);
                } else {
                  wx.showModal({
                    title: "提示",
                    content: res.errmsg,
                    showCancel: false
                  });
                }
              })
              .catch(() => {});
          }
        });
      }
    }
  });
}

module.exports = login;
