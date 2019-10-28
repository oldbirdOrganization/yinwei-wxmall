var util = require("../../utils/util.js");
var api = require("../../config/api.js");
var user = require("../../services/user.js");
var app = getApp();

Page({
  data: {
    qList: [0, 0, 0, 0, 0],
    sList: [0, 0, 0, 0, 0],
    content: ""
  },
  onLoad: function(options) {
    this.orderNo = options.orderNo;
  },
  itemTap(ev) {
    const index = ev.currentTarget.dataset.i;
    const listKey = ev.currentTarget.dataset.list;
    const list = this.data[listKey];
    for (let i = 0; i < 5; i++) {
      list[i] = Number(i <= index);
    }
    this.setData(this.data);
  },
  postComment() {
    let qualityLevel = 0;
    let serviceLevel = 0;
    this.data.qList.some(val => {
      qualityLevel += val;
    });
    this.data.sList.some(val => {
      serviceLevel += val;
    });
    console.log(this.orderNo)
    util
      .request(api.CommentPost, {
        content: this.data.content,
        qualityEvaluateLevel: qualityLevel,
        serviceEvaluateLevel: serviceLevel,
        typeId: "1",
        valueId: this.orderNo,
        imagesList: []
      }, "POST", "application/json")
      .then(res => {
        console.log(res)
        if (res.errno == 0) {
          wx.navigateBack();
          wx.showToast({
            title: "评论成功",
            icon: "success",
            duration: 1000
          });
        } else {
          wx.showToast({
            title: "评论失败",
            icon: "none",
            duration: 1000
          });
        }
      });
  },
  inputContent(ev) {
    this.setData({
      content: ev.detail.value
    });
  }
});
