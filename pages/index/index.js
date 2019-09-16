const util = require("../../utils/util.js");
const api = require("../../config/api.js");
const ImgPath = "../../static/images/index/";
const login = require("../../services/login");
const app = getApp();

//获取应用实例
Page({
  data: {
    newGoods: [],
    hotGoods: [],
    topics: [],
    caseList: [],
    banner: [],
    channel: [
      {
        url: "/pages/home/reportFix/reportFix",
        icon_url: ImgPath + "channel1.png",
        name: "维修",
        login: true
      },
      {
        url: "/pages/home/bespokeReform/bespokeReform",
        icon_url: ImgPath + "channel2.png",
        name: "改造",
        login: false
      },
      {
        url: "/pages/home/bespokeDesgin/bespokeDesgin?type=3",
        icon_url: ImgPath + "channel3.png",
        name: "设计"
      },
      {
        url: "/pages/home/bespokeCustom/bespokeCustom?type=4",
        icon_url: ImgPath + "channel4.png",
        name: "定制化加配"
      },
      {
        url: "/pages/home/bespokeDesgin/bespokeDesgin?type=5",
        icon_url: ImgPath + "channel5.png",
        name: "装修"
      },
      {
        url: "/pages/home/bespokeAir/bespokeAir",
        icon_url: ImgPath + "channel6.png",
        name: "空调维保"
      },
      {
        url: "/pages/home/bespokeFurniture/bespokeFurniture",
        icon_url: ImgPath + "channel7.png",
        name: "家具保养"
      },
      {
        url: "/pages/home/bespokeInspect/bespokeInspect",
        icon_url: ImgPath + "channel8.png",
        name: "专业验房"
      }
    ]
  },
  onShareAppMessage: function() {
    return {
      title: "NideShop",
      desc: "一步E家",
      path: "/pages/index/index"
    };
  },
  onPullDownRefresh() {
    this.getIndexData();
  },
  onLoad() {
    this.getIndexData();
  },
  getIndexData() {
    // banner
    util.request(api.IndexUrlBanner).then(res => {
      if (res.errno === 0) {
        const banner = res.data.banner;
        this.setData({ banner });
      }
    });
    util.request(api.TopicCase).then(res => {
      if (res.errno === 0) {
        const topics = res.data.topicList.filter((val, i) => {
          return i < 2;
        });
        this.setData({ topics, caseList: res.data.topicList });
      }
    });
  },
  showMore() {
    const list = this.data.topics;
    if (list.length > 2) {
      this.setData({
        topics: this.data.caseList.filter((val, i) => {
          return i < 2;
        })
      });
    } else {
      this.setData({
        topics: this.data.caseList
      });
    }
  },
  goPage(ev) {
    const toUrl = ev.currentTarget.dataset.url;
    if (!toUrl) return;
    if (toUrl.indexOf("bespoke") !== -1) {
      login().then(() => {
        wx.navigateTo({
          url: toUrl
        });
      });
    } else {
      wx.navigateTo({
        url: toUrl
      });
    }
  },
  goPageCase(ev) {
    const index = ev.currentTarget.dataset.d;
    wx.setStorage({
      key: "case",
      data: this.data.caseList[index]
    });
    wx.navigateTo({
      url: "/pages/home/case/case"
    });
  },
  onGotUserInfo(ev) {
    app.globalData.userInfo = ev.detail.userInfo;
    this.goPage(ev);
  }
});
