const app = getApp();
Page({
  data: {},
  onLoad: function(options) {},
  onShareAppMessage: function() {
    return {
      title: "NideShop",
      desc: "一步E家",
      path: "/pages/index/index"
    };
  },
  goPage(ev) {
    const url = ev.currentTarget.dataset.url;
    if (url.indexOf("index/index") === -1) {
      wx.navigateTo({
        url
      });
    } else {
      wx.switchTab({
        url
      });
    }
  }
});
