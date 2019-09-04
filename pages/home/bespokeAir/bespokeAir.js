const submitOrder = require("../../../services/submitOrder.js");
const ImgPath = require("../../../config/picPath");
Page({
  data: {
    channelId: "6",
    serviceHouseName: "",
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
    showIdeaList: false,
    submiting: false,
    image_url: ImgPath + "171719783bea52.png"
  },
  onLoad(options) {},
  submitOrder,
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
