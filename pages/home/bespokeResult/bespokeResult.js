const util = require("../../../utils/util.js");
const api = require("../../../config/api.js");
//获取应用实例
const app = getApp();
Page({
  data: {
    newGoods: [],
    hotGoods: [],
    type: "success",
    tips: "感谢您的预约",
    subTips: "请保持手机畅通，我们将尽快安排，工作人员与您联系"
  },
  onPullDownRefresh() {},
  onLoad(options) {
    const flag = !!Number(options.flag);
    this.setData({
      type: flag ? "success" : "warn",
      tips: flag ? "感谢您的预约" : "预约失败",
      subTips: flag ? "请保持手机畅通，我们将尽快安排，工作人员与您联系" : ""
    });
  },
  checkOrder() {
    wx.navigateTo({
      url: "/pages/order/order"
    });
  }
});
