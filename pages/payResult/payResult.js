var util = require("../../utils/util.js");
var api = require("../../config/api.js");
const pay = require("../../services/pay.js");

var app = getApp();
Page({
  data: {
    status: false,
    orderId: 0
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.orderId || 24,
      status: options.status
    });
    this.updateSuccess();
  },

  updateSuccess: function() {
    let that = this;
    util
      .request(api.OrderQuery, { orderId: this.data.orderId })
      .then(function(res) {});
  },

  payOrder() {
    pay
      .payOrder(parseInt(this.data.orderId))
      .then(res => {
        this.setData({
          status: true
        });
      })
      .catch(res => {
        util.showErrorToast("支付失败");
      });
  }
});
