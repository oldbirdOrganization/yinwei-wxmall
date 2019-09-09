const submitOrder = require("../../../services/submitOrder.js");
const ImgPath = require("../../../config/picPath");
Page({
  data: {
    channelId: "6",
    serviceHouseName: "",
    serviceTime: "",
    serviceType: "",
    region: ["北京市", "北京市", "东城区"],
    ideaList: ["清洗", "维修", "保养"],
    serviceIdea: "",
    addressTxt: "",
    contactName: "",
    contactMobile: "",
    serviceAirConditionerModel: "",
    serviceAirConditionerType: "",
    problemDescription: "",
    isOuterOrder: "0",
    showIdeaList: false,
    submiting: false,
    image_url: ImgPath + "171719783bea52.png"
  },
  onLoad(options) {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    this.setData({
      serviceTime: `${h}:${m}`
    });
  },
  submitOrder() {
    if (!this.data.serviceIdea) {
      wx.showToast({
        title: "请选择服务",
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
    if (!this.data.serviceAirConditionerModel) {
      wx.showToast({
        title: "请选择品牌型号",
        icon: "none",
        duration: 1000
      });
      return;
    }
    if (!this.data.serviceAirConditionerType) {
      wx.showToast({
        title: "请选择类型",
        icon: "none",
        duration: 1000
      });
      return;
    }
    if (!this.data.problemDescription) {
      wx.showToast({
        title: "请填写情况说明",
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
    if (!this.data.problemDescription) {
      wx.showToast({
        title: "请填写情况说明",
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
    submitOrder(this.data);
  },
  troggleList() {
    this.setData({
      showIdeaList: !this.data.showIdeaList
    });
  },
  selectIdea(ev) {
    const d = ev.currentTarget.dataset.d;
    this.setData({
      showIdeaList: false,
      serviceIdea: d
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
