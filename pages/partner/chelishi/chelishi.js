const ImgPath = require("../../../config/picPath");
const submitOrder = require("../../../services/submitOrder.js");
const util = require("../../../utils/util.js");
const api = require("../../../config/api.js");
const pay = require("../../../services/pay.js");
//获取应用实例
const app = getApp();
const OrderTypeMap = {
  1: "下单成功（待指派）",
  2: "待确认",
  3: "已确认",
  4: "完成服务",
  5: "作废",
  6: "待评价"
};
Page({
  data: {
    menu: [
      { name: "玄关" },
      { name: "客厅" },
      { name: "玄关" },
      { name: "客厅" }
    ],
    topList: [
      { name: "沪牌代拍", id: "1" },
      { name: "玻璃膜", id: "2" },
      { name: "隐形车衣", id: "3" },
      { name: "艾利丹尼森改色", id: "4" }
    ],
    list: [],
    list1: [
      { name: "无赔付", price: 12000, active: true },
      { name: "6次不中赔付1000元", price: 15000, active: false }
    ],
    list2: [
      { name: "威固玻璃膜：整车V70+40顶级套餐", price: 8800, active: true },
      { name: "威固V70前档膜", price: 3680, active: false },
      {
        name: "龙膜玻璃膜：整车AVS70+15、35顶级套餐",
        price: 6800,
        active: false
      },
      { name: "龙膜AVS70前档膜", price: 2800, active: false },
      { name: "龙膜AVS80整车高级套餐", price: 4800, active: false },
      { name: "龙膜AVS80前档膜", price: 1680, active: false }
    ],
    list3: [
      { name: "龙膜G2系列 整车", price: 20800, delePrice: 25800, active: true },
      {
        name: "龙膜G1系列 整车",
        price: 13800,
        delePrice: 16800,
        active: false
      },
      {
        name: "BOP MIT系列 整车",
        price: 15800,
        delePrice: 29800,
        active: false
      },
      {
        name: "BOP TOP系列 整车",
        price: 11000,
        delePrice: 15800,
        active: false
      },
      {
        name: "艾力隐形车衣 整车",
        price: 11800,
        delePrice: 15800,
        active: false
      }
    ],
    list4: [
      { name: "金属哑面系列", price: "6800起", active: true },
      { name: "金属拉丝系列", price: "7800起" },
      { name: "电光及亮面系列", price: "5800起" }
    ],
    imgPath: ImgPath + "17213074311d3b.png",
    activeIndex: 0,
    contactName: "",
    contactMobile: "",
    outerMerchantName: "车丽饰",
    isOuterOrder: "1",
    outerServiceCombo: "无赔付",
    orderPrice: 12000,
    submiting: false,
    showModal: true
  },
  onPullDownRefresh() {},
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
    submitOrder(this.data, true, this.openModal);
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
  },
  openModal(id) {
    util.request(api.OrderDetail, { orderNo: id }, "GET").then(res => {
      if (res.errno === 0) {
        let info = res.data.order;
        info.orderTypeTxt = OrderTypeMap[info.orderType];
        info.orderTime = util.formatTime(new Date(info.createTime));
        info.requireList = info.serviceRequired
          ? info.serviceRequired.split(",")
          : [];
        this.setData({ info, showModal: true });
      }
    });
  },
  closeModal() {
    this.setData({
      showModal: false
    });
  },
  //支付
  pay() {
    if (this.data.info.orderPrice === "0" || !this.data.info.orderPrice) return;
    pay(this.data.orderNo)
      .then(res => {
        wx.showToast({
          title: "订单支付成功",
          icon: "success",
          duration: 1000
        });
        wx.navigateTo({
          url: "/pages/order/order"
        });
      })
      .catch(() => {
        wx.showToast({
          title: "订单支付失败",
          icon: "none",
          duration: 1000
        });
      });
  }
});
