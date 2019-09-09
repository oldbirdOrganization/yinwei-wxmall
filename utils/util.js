var api = require("../config/api.js");

function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("-") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}

/**
 * 封封微信的的request
 */
function request(
  url,
  data = {},
  method = "POST",
  header = "application/x-www-form-urlencoded"
) {
  wx.showLoading({
    title: "加载中..."
  });
  const userId = wx.getStorageSync("userId") || "";
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        "Content-Type": header,
        LOGIN_USER_KEY: userId,
        "X-Yinweimall-Token": wx.getStorageSync("token"),
        "X-Nideshop-Token": wx.getStorageSync("token")
      },
      success: function(res) {
        wx.hideLoading();
        if (res.statusCode == 200) {
          if (res.data.errno == 401) {
            loginByWx();
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function(resolve, reject) {
    wx.checkSession({
      success: function() {
        resolve(true);
      },
      fail: function() {
        reject(false);
      }
    });
  });
}

//登录态检测
function checkLogin() {
  return new Promise(function(resolve, reject) {
    if (wx.getStorageSync("userInfo") && wx.getStorageSync("token")) {
      checkSession()
        .then(() => {
          //   resolve();
        })
        .catch(() => {
          loginByWx();
          //   reject();
        });
    } else {
      loginByWx();
      //   reject();
    }
  });
}
//微信登录
function loginByWx() {
  wx.login({
    success(val) {
      if (val.code) {
        wx.authorize({
          scope: "scope.userInfo",
          success() {
            wx.getUserInfo({
              success(userInfo) {
                request(
                  api.AuthLoginByWeixin,
                  {
                    code: val.code,
                    userInfo
                  },
                  "POST",
                  "application/json"
                ).then(res => {
                  if (res.errno === 0) {
                    wx.setStorageSync("userInfo", res.data.userInfo);
                    wx.setStorageSync("token", res.data.token);
                    wx.setStorageSync("userId", res.data.userId);
                  } else {
                    wx.showModal({
                      title: "提示",
                      content: res.errmsg,
                      showCancel: false
                    });
                  }
                });
              }
            });
          }
        });
      }
    }
  });
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: "/static/images/icon_error.png"
  });
}

function showSuccessToast(msg) {
  wx.showToast({
    title: msg
  });
}

module.exports = {
  formatTime,
  request,
  showErrorToast,
  showSuccessToast,
  checkSession,
  checkLogin
};
