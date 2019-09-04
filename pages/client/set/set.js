const ImgPath = "../../../static/images/index/";
//获取应用实例
const app = getApp();
Page({
  data: {},
  onLoad: function(options) {
    // this.getIndexData();
  },
  goPage: function(ev) {
    const toUrl = ev.currentTarget.dataset.url;
    if (!toUrl) return;
    wx.navigateTo({
      url: toUrl
    });
  }
});
