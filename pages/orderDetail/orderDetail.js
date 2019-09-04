var util = require("../../utils/util.js");
var api = require("../../config/api.js");
var login = require("../../services/login.js");
var app = getApp();

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
    orderNo: "",
    info: {}
  },
  onLoad: function(options) {
    this.setData({
      orderNo: options.orderNo
    });
    this.getInfo(options.orderNo);
  },
  getInfo(orderNo) {
    util.request(api.OrderDetail, { orderNo }, "GET").then(res => {
      if (res.errno === 0) {
        let info = res.data.order;
        info.orderTypeTxt = OrderTypeMap[info.orderType];
        info.orderTime = util.formatTime(new Date(info.createTime));
        info.requireList = info.serviceRequired
          ? info.serviceRequired.split(",")
          : [];
        this.setData({ info });
      }
    });
  },
  //联系电话
  makeCall() {
    wx.makePhoneCall({
      phoneNumber: this.phoneNumber
    });
  },
  //支付
  pay() {
    login.login().then(() => {
      util
        .request(api.PayPrepayId, { orderNo: this.data.orderNo })
        .then(res => {
          const { nonceStr, paySign, signType, timeStamp } = res.data;
          const pa = res.data.package;
          if (res.errno == 0) {
            wx.requestPayment({
              timeStamp,
              nonceStr,
              package: pa,
              signType,
              paySign,
              success(res) {
                wx.showToast({
                  title: "订单支付成功",
                  icon: "success",
                  duration: 1000
                });
                wx.navigateTo({
                  url: "/pages/order/order"
                });
              },
              fail(res) {
                wx.showToast({
                  title: "订单支付失败",
                  icon: "none",
                  duration: 1000
                });
              }
            });
          } else {
            wx.showToast({
              title: "订单支付失败",
              icon: "none",
              duration: 1000
            });
          }
        });
    });
  }
});
