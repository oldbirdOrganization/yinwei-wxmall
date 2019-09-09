const util = require("../../utils/util.js");
const api = require("../../config/api.js");
const login = require("../../services/login.js");
const app = getApp();
Page({
  data: {
    type: 1,
    typeList: [
      { icon: "../../static/images/order-sent.png", remain: 0, name: "待指派" },
      { icon: "../../static/images/order-sure.png", remain: 0, name: "待确认" },
      {
        icon: "../../static/images/order-unpay.png",
        remain: 0,
        name: "待付款"
      },
      { icon: "../../static/images/order-done.png", remain: 0, name: "已完成" }
    ],
    list: [],
    designateList: [],
    confirmList: [],
    paymentList: [],
    finishList: []
  },
  onLoad(options) {
    this.setData({
      type: +options.type
    });
    this.getDesignate();
    this.getConfirm();
    this.getPayment();
  },
  cancelOrder(ev) {
    const index = +ev.currentTarget.dataset.d;
    const id = this.data.list[index].id;
    util.request(api.OrderCancel, { id }).then(res => {
      if (res.errno == 0) {
        wx.showToast({
          title: "取消订单成功",
          icon: "success",
          duration: 1000
        });
      } else {
        wx.showToast({
          title: "取消订单失败",
          icon: "none",
          duration: 1000
        });
      }
    });
  },
  changeType(ev) {
    const type = +ev.currentTarget.dataset.d;
    if (type === 1) {
      if (this.data.designateList.length) {
        this.setData({
          list: this.data.designateList
        });
      } else {
        this.getDesignate();
      }
      this.setData({ type });
      return;
    }
    if (type === 2) {
      if (this.data.confirmList.length) {
        this.setData({
          list: this.data.confirmList
        });
      } else {
        this.getConfirm();
      }
      this.setData({ type });
      return;
    }
    if (type === 3) {
      if (this.data.paymentList.length) {
        this.setData({
          list: this.data.paymentList
        });
      } else {
        this.getPayment();
      }
      this.setData({ type });
      return;
    }
    if (type === 4) {
      if (this.data.finishList.length) {
        this.setData({
          list: this.data.finishList
        });
      } else {
        this.getFinish();
      }
      this.setData({ type });
      return;
    }
  },
  // 获取待指派列表
  getDesignate() {
    util.request(api.DesignateOrder, {}, "GET").then(res => {
      if (res.errno === 0) {
        const list = res.data;
        list.some(val => {
          val.requireList = val.serviceRequired
            ? val.serviceRequired.split(",")
            : [];
        });
        this.data.typeList[0].remain = list.length;
        this.setData({
          designateList: list,
          list,
          typeList: this.data.typeList
        });
      }
    });
  },
  // 获取待确认列表
  getConfirm() {
    util.request(api.ConfirmOrder, {}, "GET").then(res => {
      if (res.errno === 0) {
        const list = res.data;
        list.some(val => {
          val.requireList = val.serviceRequired
            ? val.serviceRequired.split(",")
            : [];
        });
        this.data.typeList[1].remain = list.length;
        this.setData({ confirmList: list, list, typeList: this.data.typeList });
      }
    });
  },
  // 获取待付款列表
  getPayment() {
    util.request(api.PaymentOrder, {}, "GET").then(res => {
      if (res.errno === 0) {
        const list = res.data;
        list.some(val => {
          val.requireList = val.serviceRequired
            ? val.serviceRequired.split(",")
            : [];
        });
        this.data.typeList[2].remain = list.length;
        this.setData({ paymentList: list, list, typeList: this.data.typeList });
      }
    });
  },
  // 获取完成列表
  getFinish() {
    util.request(api.FinishOrder, {}, "GET").then(res => {
      if (res.errno === 0) {
        const list = res.data;
        list.some(val => {
          val.requireList = val.serviceRequired
            ? val.serviceRequired.split(",")
            : [];
        });
        this.setData({ finishList: list, list });
      }
    });
  },
  goPay(ev) {
    app.globalData.userInfo = ev.detail.userInfo;
    const url = ev.currentTarget.dataset.url;
    login().then(res => {
      wx.navigateTo({
        url
      });
    });
  },
  goPage(ev) {
    const url = ev.currentTarget.dataset.url;
    wx.navigateTo({
      url
    });
  }
});
