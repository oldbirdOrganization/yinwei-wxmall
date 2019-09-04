const util = require("../../../utils/util.js");
const api = require("../../../config/api.js");
const submitOrder = require("../../../services/submitOrder.js");
const ImgPath = require("../../../config/picPath");
Page({
  data: {
    channelId: "4",
    goodsId: "",
    serviceHouseName: "",
    serviceType: "",
    serviceSpace: "",
    orderPrice: "",
    region: ["北京市", "北京市", "东城区"],
    ideaList: [
      { name: "方案1", src: ImgPath + "plan1.png" },
      { name: "方案2", src: ImgPath + "plan2.png" },
      { name: "方案3", src: ImgPath + "plan3.png" },
      { name: "方案4", src: ImgPath + "plan4.png" }
    ],
    addressTxt: "",
    contactName: "",
    contactMobile: "",
    submiting: false,
    image_url: ImgPath + "171750296d0fca.png"
  },
  onLoad(options) {
    this.setData({
      goodsId: options.id,
      orderPrice: options.price
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
