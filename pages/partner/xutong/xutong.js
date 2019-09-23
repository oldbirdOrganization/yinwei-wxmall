const ImgPath = require("../../../config/picPath");
const submitOrder = require("../../../services/submitOrder.js");
//获取应用实例
const app = getApp();
Page({
  data: {
    topList: [{ name: "UI设计", id: "1" }, { name: "广告宣传片", id: "2" }],
    list: [],
    list1: [
      { name: "LOGO设计", price: 500, unit: "个", active: true },
      {
        name: "企业形象宣传VIS视觉导视系统应用",
        price: 8000,
        unit: "套",
        active: false
      },
      {
        name: "包装盒/包装袋/包装瓶/手提袋设计",
        price: 500,
        unit: "个",
        active: false
      },
      {
        name: "名片设计/工牌设计/会员卡",
        price: 200,
        unit: "个",
        active: false
      }
    ],
    list2: [
      { name: "LOGO设计", price: 150, unit: "P", active: true },
      {
        name: "单页/三折页/海报/朋友圈海报设计",
        price: 300,
        unit: "P",
        active: false
      },
      {
        name: "易拉宝/X展架/广告牌/背景板设计",
        price: 400,
        unit: "个",
        active: false
      },
      { name: "文化墙/品牌墙设计", price: 200, unit: "米", active: false },
      { name: "PPT美化", price: 20, unit: "P", active: false }
    ],
    activeIndex: 0,
    imgPath: ImgPath + "172155686f50b0.png",
    outerMerchantName: "栩桐",
    isOuterOrder: "1",
    outerServiceCombo: "LOGO设计",
    orderPrice: 500,
    submiting: false
  },
  onLoad: function(options) {
    this.setData({
      list: this.data.list1
    });
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
    this.setData({
      submiting: true
    });
    submitOrder(this.data, false).then(() => {
      this.setData({
        submiting: false
      });
    });
  },
  changeType: function(ev) {
    const i = ev.currentTarget.dataset.index;
    const list = this.data["list" + (i + 1)];
    this.setData({
      activeIndex: i,
      list,
      outerServiceCombo: list[0].name,
      orderPrice: list[0].price
    });
  },
  select(ev) {
    const index = ev.currentTarget.dataset.index;
    let list = this.data.list;
    list.some((val, i) => {
      val.active = i === index;
    });
    this.setData({
      list,
      outerServiceCombo: list[index].name,
      orderPrice: list[index].price
    });
  },
  setItemValue(args) {
    const data = this.data;
    data[args.detail.key] = args.detail.val;
    this.setData(data);
  }
});
