var util = require("../../../utils/util.js");
var api = require("../../../config/api.js");

var app = getApp();
Page({
  data: {
    array: ["产品相关", "服务态度", "优惠活动", "其他"],
    index: 0,
    content: "",
    contentLength: 0,
    mobile: ""
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    });
  },
  mobileInput: function(e) {
    let that = this;
    this.setData({
      mobile: e.detail.value
    });
  },
  contentInput: function(e) {
    let that = this;
    this.setData({
      contentLength: e.detail.cursor,
      content: e.detail.value
    });
  },
  cleanMobile: function() {
    let that = this;
  },
  sbmitFeedback: function(e) {
    let that = this;

    if (that.data.content == "") {
      util.showErrorToast("请输入反馈内容");
      return false;
    }

    if (that.data.mobile == "") {
      util.showErrorToast("请输入手机号码");
      return false;
    }
    wx.showLoading({
      title: "提交中...",
      mask: true,
      success: function() {}
    });
    const params = {
      mobile: that.data.mobile,
      index: that.data.index,
      content: that.data.content
    };
    util
      .request(api.FeedbackAdd, params, "POST", "application/json")
      .then(function(res) {
        if (res.errno === 0) {
          wx.hideLoading();

          wx.showToast({
            title: res.data,
            icon: "success",
            duration: 2000,
            complete: function() {
              that.setData({
                index: 0,
                content: "",
                contentLength: 0,
                mobile: ""
              });
            }
          });
        } else {
          util.showErrorToast(res.data);
        }
      });
  },
  onLoad: function(options) {},
  onReady: function() {},
  onShow: function() {},
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
});
