const util = require("../../../utils/util.js");
const api = require("../../../config/api.js");
const submitOrder = require("../../../services/submitOrder.js");
const ImgPath = require("../../../config/picPath");
Page({
  data: {
    channelId: "8",
    isOuterOrder: "0",
    serviceHouseName: "",
    serviceTime: "",
    serviceType: "",
    serviceSpace: "",
    region: ["上海市", "上海市", "黄浦区"],
    addressTxt: "",
    contactName: "",
    contactMobile: "",
    serviceHouseDeliveryStandards: "",
    submiting: false,
    image_url: ImgPath + "1724405397656d.png",
    showStandardList: false,
    standardList: ["毛坯", "精装修"]
  },
  onLoad(options) {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
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
    if (!this.data.serviceType) {
      wx.showToast({
        title: "请填写服务类型",
        icon: "none",
        duration: 1000
      });
      return;
    }
    if (!this.data.serviceHouseDeliveryStandards) {
      wx.showToast({
        title: "请填写交付标准",
        icon: "none",
        duration: 1000
      });
      return;
    }
    if (!this.data.serviceTime) {
      wx.showToast({
        title: "请选择服务时间",
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
  inputVlaue(ev) {
    const key = ev.currentTarget.dataset.d;
    const data = this.data;
    data[key] = ev.detail.value;
    this.setData(data);
  },
  setItemValue(args) {
    const data = this.data;
    data[args.detail.key] = args.detail.val;
    this.setData(data);
  },
  selectStandard(ev) {
    const d = ev.currentTarget.dataset.d;
    this.setData({
      showStandardList: false,
      serviceHouseDeliveryStandards: d
    });
  },
  troggleList() {
    this.setData({
      showStandardList: !this.data.showStandardList
    });
  }
});
