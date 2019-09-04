const util = require("../../../utils/util.js");
const api = require("../../../config/api.js");
//获取应用实例
const app = getApp();
Page({
  data: {
    addressList: []
  },
  onLoad: function(options) {
    this.getList();
  },
  getList() {
    let that = this;
    util.request(api.AddressList, {}, "GET").then(function(res) {
      if (res.errno === 0) {
        that.setData({
          addressList: res.data
        });
      }
    });
  },
  update(ev) {
    const id = ev.currentTarget.dataset.addressId;
    wx.navigateTo({
      url: "/pages/client/addAdress/addAdress?id=" + id
    });
  },
  add() {
    wx.navigateTo({
      url: "/pages/client/addAdress/addAdress"
    });
  }
});
