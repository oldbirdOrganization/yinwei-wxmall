const util = require("../../../utils/util.js");
const api = require("../../../config/api.js");
const submitOrder = require("../../../services/submitOrder.js");
const ImgPath = require("../../../config/picPath");
const LocalPath = "../../static/images/index/";
Page({
  data: {
    channelId: "4",
    serviceHouseName: "",
    serviceType: "",
    serviceSpace: "",
    isOuterOrder: "0",
    region: ["上海市", "上海市", "黄浦区"],
    ideaList: [
      { name: "方案1", src: LocalPath + "plan1.png" },
      { name: "方案2", src: LocalPath + "plan2.png" },
      { name: "方案3", src: LocalPath + "plan3.png" },
      { name: "方案4", src: LocalPath + "plan4.png" }
    ],
    addressTxt: "",
    contactName: "",
    contactMobile: "",
    submiting: false,
    image_url: ImgPath + "171750296d0fca.png"
  },
  onLoad(options) {
    this.getCategory();
  },
  submitOrder() {
    if (this.data.submiting) {
      return;
    }
    if (!this.data.serviceHouseName) {
      wx.showToast({
        title: "请填写小区名称",
        icon: "none",
        duration: 1000
      });
      return;
    }
    if (!this.data.addressTxt) {
      wx.showToast({
        title: "请填写详细地址",
        icon: "none",
        duration: 1000
      });
      return;
    }
    if (!this.data.serviceSpace) {
      wx.showToast({
        title: "请选择服务空间",
        icon: "none",
        duration: 1000
      });
      return;
    }
    if (!this.data.serviceIdea) {
      wx.showToast({
        title: "请选择方案",
        icon: "none",
        duration: 1000
      });
      return;
    }
    if (!this.data.contactName) {
      wx.showToast({
        title: "请填写联系人",
        icon: "none",
        duration: 1000
      });
      return;
    }
    if (!this.data.contactMobile) {
      wx.showToast({
        title: "请填写联系电话",
        icon: "none",
        duration: 1000
      });
      return;
    }
    this.setData({
      submiting: true
    });
    submitOrder(this.data).then(() => {
      this.setData({
        submiting: false
      });
    });
  },
  getCategory() {
    let categoryList = wx.getStorageSync("categoryList");
    if (categoryList && categoryList.length) return;

    util.request(api.CategoryList, {}, "GET").then(res => {
      if (res.errno === 0) {
        wx.setStorage({
          key: "categoryList",
          data: res.data.categoryList
        });
      }
    });
  },
  setItemValue(args) {
    const data = this.data;
    data[args.detail.key] = args.detail.val;
    this.setData(data);
  }
});
