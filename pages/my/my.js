var util = require("../../utils/util.js");
var api = require("../../config/api.js");
var login = require("../../services/login.js");
Page({
  data: {
    userInfo: {
      avatarUrl: "",
      nickName: ""
    },
    level: ""
  },
  onLoad: function(options) {},
  onShow() {
    this.getUserInfo();
  },
  getUserInfo() {
    const userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      this.setData({
        userInfo
      });
      this.getLevel();
    } else {
      login().then(res => {
        this.setData({
          userInfo: res
        });
      });
    }
  },
  getLevel() {
    util.request(api.UserLevel).then(res => {
      if (res.errno === 0) {
        this.setData({
          level: res.data
        });
      }
    });
  },
  exitLogin() {
    wx.showModal({
      title: "",
      confirmColor: "#b4282d",
      content: "退出登录？",
      success: res => {
        if (res.confirm) {
          wx.removeStorageSync("token");
          wx.removeStorageSync("userInfo");
          wx.removeStorageSync("userId");
          this.data = {
            userInfo: {
              avatarUrl: "",
              nickName: ""
            },
            level: ""
          };
          this.setData(this.data);
          wx.switchTab({
            url: "/pages/index/index"
          });
        }
      }
    });
  },
  goPage: function(ev) {
    const toUrl = ev.currentTarget.dataset.url;
    if (!toUrl) return;
    wx.navigateTo({
      url: toUrl
    });
  }
});
