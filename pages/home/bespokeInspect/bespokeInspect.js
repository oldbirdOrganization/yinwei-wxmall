const util = require("../../../utils/util.js");
const api = require("../../../config/api.js");
const submitOrder = require("../../../services/submitOrder.js");
const ImgPath = require("../../../config/picPath");
Page({
  data: {
    channelId: "8",
    serviceHouseName: "",
    serviceTime: "",
    serviceType: "",
    serviceSpace: "",
    region: ["北京市", "北京市", "东城区"],
    addressTxt: "",
    contactName: "",
    contactMobile: "",
    serviceHouseDeliveryStandards: "",
    submiting: false,
    image_url: ImgPath + "1724405397656d.png"
  },
  onLoad(options) {
    this.getCategory();
  },
  submitOrder,
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
  }
});
