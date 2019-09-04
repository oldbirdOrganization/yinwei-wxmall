const util = require("../../../utils/util.js");
const api = require("../../../config/api.js");
const submitOrder = require("../../../services/submitOrder.js");
const ImgPath = require("../../../config/picPath");
Page({
  data: {
    channelId: "2",
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
  setItemValue(args) {
    const data = this.data;
    data[args.detail.key] = args.detail.val;
    this.setData(data);
  }
});
