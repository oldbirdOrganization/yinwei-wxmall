const submitOrder = require("../../../services/submitOrder.js");
const ImgPath = require("../../../config/picPath");
//获取应用实例
const app = getApp();
Page({
  data: {
    channelId: "3",
    serviceType: "",
    serviceAcreage: "",
    region: ["北京市", "北京市", "东城区"],
    addressTxt: "",
    contactName: "",
    contactMobile: "",
    submiting: false,
    image_url: ""
  },
  onLoad(options) {
    this.setData({
      channelId: options.type,
      image_url:
        options.type === "3"
          ? ImgPath + "17182740360c49.png"
          : ImgPath + "1718033445b323.png"
    });
  },
  submitOrder,
  setItemValue(args) {
    const data = this.data;
    data[args.detail.key] = args.detail.val;
    this.setData(data);
  }
});
