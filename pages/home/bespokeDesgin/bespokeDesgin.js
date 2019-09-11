const submitOrder = require("../../../services/submitOrder.js");
const ImgPath = require("../../../config/picPath");
//获取应用实例
const app = getApp();
Page({
  data: {
    channelId: "3",
    isOuterOrder: "0",
    serviceType: "",
    serviceAcreage: "",
    region: ["上海市", "上海市", "黄浦区"],
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
    if (!this.data.serviceAcreage) {
      wx.showToast({
        title: "请填写房屋面积",
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
  setItemValue(args) {
    const data = this.data;
    data[args.detail.key] = args.detail.val;
    this.setData(data);
  }
});
