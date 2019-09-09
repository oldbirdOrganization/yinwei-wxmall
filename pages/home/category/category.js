const util = require("../../../utils/util.js");
const api = require("../../../config/api.js");
const ImgPath = "../../../static/images/index/";
const login = require("../../../services/login.js");
//获取应用实例
const app = getApp();
Page({
  data: {
    banner: [],
    menu: [],
    list: [],
    activeIndex: 0
  },
  onPullDownRefresh() {},
  onLoad: function(options) {
    this.channelId = options.type;
    this.getList();
    this.getBanner();
  },
  chooseType: function(ev) {
    const index = ev.currentTarget.dataset.index;
    this.setData({
      activeIndex: index
    });
    const id = this.data.menu[index].id;
    this.getDetail(id);
  },
  // 获取banner
  getBanner() {
    util.request(api.IndexUrlBanner).then(res => {
      if (res.errno === 0) {
        const banner = res.data.banner;
        this.setData({ banner });
      }
    });
  },
  // 获取栏目
  getList() {
    util.request(api.CategoryList, {}, "GET").then(res => {
      if (res.errno === 0) {
        this.setData({
          menu: res.data.categoryList
        });
        this.getDetail(res.data.categoryList[0].id);
      }
    });
  },
  // 获取栏目下的子项
  getDetail(id) {
    util
      .request(api.CategoryDetail + "?categoryId=" + id, {}, "GET")
      .then(res => {
        this.setData({
          list: res.data
        });
      });
  },
  goDetailPage(ev) {
    login().then(() => {
      const { id, price } = ev.currentTarget.dataset;
      const toUrl =
        this.channelId === "1"
          ? "/pages/home/reportFix/reportFix?id=" + id + "&price=" + price
          : "/pages/home/bespokeCustom/bespokeCustom?id=" +
            id +
            "&price=" +
            price;
      wx.navigateTo({
        url: toUrl
      });
    });
  }
});
