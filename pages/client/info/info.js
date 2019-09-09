const ImgPath = "../../../static/images/index/";
//获取应用实例
const app = getApp();
Page({
  data: {
    list: [{ name: "换灯泡", price: "8", unit: "只" }],
    activeIndex: 0
  },
  onLoad: function(options) {},
  goPage: function(ev) {
    const toUrl = ev.currentTarget.dataset.url;
    if (!toUrl) return;
    wx.navigateTo({
      url: toUrl
    });
  }
});
