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
    activeIndex: 0,
    requirePool: [
      { txt: "涂料色差、流坠、破损", active: false },
      { txt: "不平整", active: false },
      { txt: "开裂", active: false },
      { txt: "空鼓", active: false }
    ],
    showModal: false
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
      if (this.channelId === "1") {
        this.toUrl = "/pages/home/reportFix/reportFix?id=" + id;
      }
      this.setData({
        showModal: true
      });
    });
  },
  tapRequire(ev) {
    const index = ev.currentTarget.dataset.index;
    const requirePool = this.data.requirePool;
    requirePool[index].active = !requirePool[index].active;
    this.setData({
      requirePool
    });
  },
  closeModal() {
    this.setData({ showModal: false });
  },
  selectRequire() {
    const requires = [];
    this.data.requirePool.some(val => {
      val.active && requires.push(val.txt);
    });
    this.closeModal();
    const serviceRequired = requires.join(",");
    wx.navigateTo({
      url: this.toUrl + "&require=" + serviceRequired
    });
  }
});
