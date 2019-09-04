var util = require("../../../utils/util.js");
var api = require("../../../config/api.js");
var login = require("../../../services/login.js");
var app = getApp();

Page({
  data: {
    userInfo: {},
    activeIndex: 1,
    list: [],
    emptyTxt: "暂无已使用优惠券"
  },
  onLoad: function(options) {
    login.login();
    // this.getList("1");
  },
  changeType(ev) {
    const index = ev.currentTarget.dataset.index;
    this.setData({
      activeIndex: +index
    });
    this.getList(index);
  },
  getList(couponStatus) {
    util.request(api.MyCouponList, { couponStatus }).then(res => {
      if (res.errno === 0) {
        const list = res.data;
        this.setData({
          list
        });
      }
    });
  }
});
