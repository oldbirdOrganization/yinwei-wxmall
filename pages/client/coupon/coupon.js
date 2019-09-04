var util = require("../../../utils/util.js");
var api = require("../../../config/api.js");
var login = require("../../../services/login.js");
var app = getApp();

Page({
  data: {
    userInfo: {},
    list: []
  },
  onLoad: function() {
    this.getList();
  },
  getList() {
    util.request(api.CouponList).then(res => {
      if (res.errno === 0) {
        const list = res.data;
        this.setData({
          list
        });
      }
    });
  },
  goPage(ev) {
    const url = ev.currentTarget.dataset.url;
    wx.navigateTo({
      url
    });
  },
  onGotUserInfo(ev) {
    app.globalData.userInfo = ev.detail.userInfo;
    login.login().then(res => {
      wx.navigateTo({
        url: "/pages/client/myCoupon/myCoupon"
      });
    });
  }
});
