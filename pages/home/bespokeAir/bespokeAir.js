const submitOrder = require("../../../services/submitOrder.js");
const ImgPath = require("../../../config/picPath");
const util = require("../../../utils/util.js");
const api = require("../../../config/api.js");
Page({
  data: {
    channelId: "6",
    serviceHouseName: "",
    serviceTime: "",
    serviceType: "",
    region: ["上海市", "上海市", "黄浦区"],
    ideaList: ["清洗", "维修", "保养"],
    serviceIdea: "",
    addressTxt: "",
    contactName: "",
    contactMobile: "",
    serviceAirConditionerModel: "",
    serviceAirConditionerType: "类型一",
    problemDescription: "",
    isOuterOrder: "0",
    showIdeaList: false,
    submiting: false,
    image_url: ImgPath + "171719783bea52.png",
    brandList: [],
    showBrandList: false,
    typeList: ["类型一", "类型二", "类型三"],
    showTypeList: false
  },
  onLoad(options) {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    this.getBrands();
  },
  submitOrder() {
    if (this.data.submiting) {
      return;
    }
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
  troggleIdeaList() {
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
  },
  troggleList() {
    this.setData({
      showBrandList: !this.data.showBrandList
    });
  },
  troggleTypeList() {
    this.setData({
      showTypeList: !this.data.showTypeList
    });
  },
  selectTypes(ev) {
    const d = ev.currentTarget.dataset.d;
    this.setData({
      showTypeList: false,
      serviceAirConditionerType: d
    });
  },
  selectBrand(ev) {
    const d = ev.currentTarget.dataset.d;
    this.setData({
      showBrandList: false,
      serviceAirConditionerModel: d
    });
  },
  getBrands() {
    util.request(api.BrandList, { isOuterBrand: 2 }).then(res => {
      if (res.errno === 0) {
        const brandList = res.data.data.map(val => {
          return val.name;
        });
        this.setData({
          brandList,
          serviceAirConditionerModel: brandList[0]
        });
      }
    });
  }
});
