const util = require("../../../utils/util.js");
const api = require("../../../config/api.js");
const submitOrder = require("../../../services/submitOrder.js");
const ImgPath = require("../../../config/picPath");
Page({
  data: {
    channelId: "2",
    isOuterOrder: "0",
    goodsId: "",
    serviceType: "",
    serviceSpace: "",
    serviceAcreage: "",
    region: ["北京市", "北京市", "东城区"],
    addressTxt: "",
    contactName: "",
    contactMobile: "",
    submiting: false,
    image_url: ImgPath + "1719058244d4d4.png"
  },
  onLoad(options) {
    this.setData({
      goodsId: options.id || ""
    });
    this.getCategory();
  },
  submitOrder() {
    if (this.data.submiting) {
      return;
    }
    if (!this.data.serviceType) {
      wx.showToast({
        title: "请选择房屋类型",
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
    if (!this.data.serviceAcreage) {
      wx.showToast({
        title: "请填写服务面积",
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
    if (!this.data.addressTxt) {
      wx.showToast({
        title: "请填写地址",
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
