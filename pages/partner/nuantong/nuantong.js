const ImgPath = require("../../../config/picPath");
const util = require("../../../utils/util.js");
const api = require("../../../config/api.js");
const submitOrder = require("../../../services/submitOrder.js");
//获取应用实例
const app = getApp();
Page({
  data: {
    imgPath: ImgPath + "172140344b1815.png",
    brandType: 1,
    showPackage: false,
    outerServiceBrand: "",
    region: ["上海市", "上海市", "黄浦区"],
    addressTxt: "",
    outerServiceCombo: "套餐1",
    isOuterOrder: "1",
    orderPrice: "9500",
    brandList: [],
    showBrandList: false,
    package1: [
      {
        name: "套餐1",
        subs: ["大金壁挂机1.5P*2", "蓝飘尔净水（末端直饮机）*1"],
        src: "",
        desc: [
          "康达效应气流/无感送风",
          "省电运转/舒适一键实现",
          "解决家庭喝水基本需求",
          "可抛弃式纤维滤芯",
          "更换方便/性价比高"
        ],
        active: true
      },
      {
        name: "套餐2",
        subs: ["大金柜机3P*1", "挂壁机1.5P*1"],
        src: "",
        desc: [
          "环绕气流/冷暖均匀",
          "室内外温度显示自由切换",
          "室内机静音运转",
          "夜间睡眠舒适节能"
        ],
        active: false
      },
      {
        name: "套餐3",
        subs: ["大金客餐厅一拖一中央空调2P*1", "挂壁机1.5P*2"],
        src: "",
        desc: ["客餐厅分体式风管机", "与吊顶完美融合", "释放空间"],
        active: false
      },
      {
        name: "套餐4",
        subs: [
          "AO史密斯热水器（前置过滤器）*1",
          "家庭蓝飘尔净水（末端直饮机）*1",
          "JSQ26-CAX 13升"
        ],
        src: "",
        desc: [
          "智能宽频恒温室燃气快速热水器",
          "前置+末端组合",
          "家庭健康饮水必备产品"
        ],
        active: false
      },
      {
        name: "套餐5",
        subs: ["大金客餐厅一拖一中央空调3P*1", "丹弗斯客餐厅电采暖35m²*1"],
        src: "",
        desc: [
          "客餐厅分体式风管机与吊顶完美融合",
          "释放空间",
          "冬季电采暖来自脚下的关怀",
          "让您倍感舒适",
          "让您的家庭充满温暖"
        ],
        active: false
      }
    ],
    package2: [
      { name: "型号1", code: "COLOR", src: "", active: true },
      { name: "型号2", code: "1880T", src: "", active: false },
      { name: "型号3", code: "T800", src: "", active: false }
    ],
    submiting: false
  },
  onLoad(options) {
    this.getBrands();
  },
  submitOrder() {
    if (this.data.submiting) {
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
    submitOrder(this.data, false).then(() => {
      this.setData({
        submiting: false
      });
    });
  },
  getBrands() {
    util.request(api.BrandList, { isOuterBrand: 1 }).then(res => {
      if (res.errno === 0) {
        const brandList = res.data.data.map(val => {
          return val.name;
        });
        this.setData({
          brandList,
          outerServiceBrand: brandList[0]
        });
      }
    });
  },
  troggleList() {
    this.setData({
      showBrandList: !this.data.showBrandList
    });
  },
  trogglePackage() {
    this.setData({
      showPackage: !this.data.showPackage
    });
  },
  selectBrand(ev) {
    const d = ev.currentTarget.dataset.d;
    const i = ev.currentTarget.dataset.i;
    const outerServiceCombo = this.data["package" + (i + 1)].name;
    this.setData({
      showBrandList: false,
      outerServiceBrand: d,
      brandType: i + 1,
      outerServiceCombo
    });
  },
  tapPackage(ev) {
    const l = ev.currentTarget.dataset.l;
    const i = ev.currentTarget.dataset.i;
    const list = this.data[l];
    list.some((val, index) => {
      val.active = i === index;
    });
    this.data.outerServiceCombo = list[i].name;
    this.data.showPackage = false;
    this.setData(this.data);
  },
  setItemValue(args) {
    const data = this.data;
    data[args.detail.key] = args.detail.val;
    this.setData(data);
  }
});
