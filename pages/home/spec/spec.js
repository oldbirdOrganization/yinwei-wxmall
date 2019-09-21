//获取应用实例
const app = getApp();
Page({
  data: {
    imgUrl:
      "http://120.55.161.193:10060/uploadImages/20190921/10061126d4213.jpg"
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title || "明星产品"
    });
  },
  goPage() {
    wx.navigateTo({
      url: "/pages/home/bespokeReform/bespokeReform"
    });
  }
});
