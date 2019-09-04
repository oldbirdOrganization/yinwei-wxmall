const submitOrder = require("../../../services/submitOrder.js");
const api = require("../../../config/api.js");
//获取应用实例
const app = getApp();
Page({
  data: {
    requires: [],
    requirePool: [
      { txt: "涂料色差、流坠、破损", active: false },
      { txt: "不平整", active: false },
      { txt: "开裂", active: false },
      { txt: "空鼓", active: false }
    ],
    imgs: [
      { src: "" },
      { src: "" },
      {
        name: "",
        src: "",
        isCamera: true
      },
      { src: "" },
      { src: "" }
    ],
    imgLen: 0,
    showModal: false,
    contactName: "",
    address: "",
    problemDescription: "",
    serviceTime: "",
    serviceRequired: "",
    imgVoList: []
  },
  onPullDownRefresh() {},
  onLoad: function(options) {
    this.data.goodsId = options.id;
  },
  submitOrder,
  setItemValue(args) {
    const data = this.data;
    data[args.detail.key] = args.detail.val;
    this.setData(data);
  },
  inputAddress(ev) {
    this.setData({
      address: ev.detail.value
    });
  },
  inputDescription(ev) {
    this.setData({
      problemDescription: ev.detail.value
    });
  },
  bindTimeChange(ev) {
    this.setData({
      serviceTime: ev.detail.value
    });
  },
  selectCamera() {
    let that = this;
    wx.chooseImage({
      count: 5,
      success(res) {
        let imgVoList = that.data.imgVoList;
        let imgs = that.data.imgs;
        let imgLen = that.data.imgLen;
        res.tempFilePaths.some(val => {
          wx.uploadFile({
            url: api.Upload,
            filePath: val,
            name: "file",
            success(resp) {
              imgVoList.push({ url: resp.data });
              imgs[imgLen].src = val;
              imgs[imgLen].isCamera = false;
              imgLen++;
              if (imgLen > 2) {
                imgs[imgLen]
                  ? (imgs[imgLen].isCamera = true)
                  : (imgs[imgLen] = { isCamera: true });
              } else {
                imgs[2].isCamera = true;
              }
              that.setData({ imgs, imgLen, imgVoList });
            }
          });
        });
      },
      fail() {
        wx.showToast({
          title: "上传图片失败",
          icon: "none",
          duration: 2000
        });
      }
    });
  },
  removeCamera(ev) {
    const index = ev.currentTarget.dataset.index;
    let imgs = this.data.imgs;
    let imgLen = this.data.imgLen;
    imgs.splice(index, 1);
    imgLen--;
    if (imgLen <= 1) {
      imgs.splice(1, 0, { src: "" });
    } else if (imgLen <= 3) {
      imgs.splice(4, 0, { src: "" });
    } else {
      imgs[imgLen].isCamera = true;
    }
    this.setData({ imgs, imgLen });
  },
  showModal() {
    const { requires, requirePool } = this.data;
    requirePool.some(val => {
      val.active = requires.indexOf(val.txt) !== -1;
    });
    this.setData({ showModal: true, requirePool });
  },
  closeModal() {
    this.setData({ showModal: false });
  },
  cancelRequire(ev) {
    const index = ev.currentTarget.dataset.index;
    const requires = this.data.requires;
    requires.splice(index, 1);
    this.setData({ requires });
  },
  tapRequire(ev) {
    const index = ev.currentTarget.dataset.index;
    const requirePool = this.data.requirePool;
    requirePool[index].active = !requirePool[index].active;
    this.setData({
      requirePool
    });
  },
  selectRequire() {
    const requires = [];
    this.data.requirePool.some(val => {
      val.active && requires.push(val.txt);
    });
    this.closeModal();
    const serviceRequired = requires.join(",");
    this.setData({ requires, serviceRequired });
  }
});
