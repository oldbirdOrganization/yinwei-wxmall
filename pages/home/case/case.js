//获取应用实例
const app = getApp();
Page({
  data: {
    info: {}
  },
  onLoad: function(options) {
    const that = this;
    wx.getStorage({
      key: "case",
      success(res) {
        that.setData({
          info: res.data
        });
      }
    });
  }
});
