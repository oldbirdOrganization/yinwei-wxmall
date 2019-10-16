const ImgPath = "../../../static/images/index/";
var util = require("../../../utils/util.js");
var api = require("../../../config/api.js");
//获取应用实例
const app = getApp();
Page({
  data: {
    list: [{ name: "换灯泡", price: "8", unit: "只" }],
    activeIndex: 0
  },
  onLoad: function(options) {
    this.getInfo();
  },
  goPage: function(ev) {
    const toUrl = ev.currentTarget.dataset.url;
    if (!toUrl) return;
    wx.navigateTo({
      url: toUrl
    });
  },
  getInfo() {
    var openId = wx.getStorageSync('token')
    util.request(api.UserInfo+"?openId="+openId, {}, "GET").then(res => {
      console.log(res);
      if (res.errno === 0) {
        console.log(res);
      }
    });
  }
});
