const submitOrder = require("../../../services/submitOrder.js");
const api = require("../../../config/api.js");
const util = require("../../../utils/util.js");
//获取应用实例
const app = getApp();
Page({
  data: {
    channelId: "1",
    requires: [],
    requirePool: [
      { txt: "涂料色差、流坠、破损", active: true },
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
    region: ["上海市", "上海市", "黄浦区"],
    address: "",
    addressTxt: "",
    problemDescription: "",
    serviceTime: "",
    serviceRequired: "",
    imgVoList: [],
    goodsId: ""
  },
  onPullDownRefresh() {},
  onLoad: function(options) {
    const { id, require } = options;
    const requireList = require.split(",");
    requireList.some(val => {
      this.data.requirePool.some(slip => {
        if (val === slip.txt) slip.active = true;
      });
    });
    if (requireList.length && requireList[0].length){
      this.data.requires = requireList;
    }
    this.setData({
      goodsId: id,
      requirePool: this.data.requirePool,
      requires: this.data.requires
    });
  },
  onShow() {
    if(wx.getStorageSync('selectAddress')){
      this.setData({ address: wx.getStorageSync('selectAddress') })
      wx.removeStorageSync('selectAddress')
    }
  },
  submitOrder() {
    if (!this.data.contactName) {
      wx.showToast({
        title: "请填写联系人",
        icon: "none",
        duration: 1000
      });
      return;
    }
    if (!this.data.address) {
      wx.showToast({
        title: "请选择服务地址",
        icon: "none",
        duration: 1000
      });
      return;
    }
    if (!this.data.requires.length) {
      wx.showToast({
        title: "请选择需求",
        icon: "none",
        duration: 1000
      });
      return;
    }
    this.setData({
      serviceRequired: this.data.requires.join(",")
    });
    submitOrder(this.data);
  },
  setItemValue(args) {
    const data = this.data;
    data[args.detail.key] = args.detail.val;
    this.setData(data);
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
              const data = JSON.parse(resp.data);
              imgVoList.push({ url: data.data });
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
    let imgVoList = this.data.imgVoList;
    imgs.splice(index, 1);
    imgVoList.splice(index, 1);
    imgLen--;
    if (imgLen <= 1) {
      imgs.splice(1, 0, { src: "" });
    } else if (imgLen <= 3) {
      imgs.splice(4, 0, { src: "" });
    } else {
      imgs[imgLen].isCamera = true;
    }
    this.setData({ imgs, imgLen, imgVoList });
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
  },
  goPage: function (ev) {
    const toUrl = ev.currentTarget.dataset.url;
    if (!toUrl) return;
    wx.navigateTo({
      url: toUrl
    });
  },
  getAddress() {
    let that = this;
    util.request(api.AddressList, {}, "GET").then(function (res) {
      console.log(res)
      if (res.errno === 0 && res.data.length) {
        var addressList = res.data
        for (var i = 0; i < addressList.length; i++){
          if (addressList[i].isDefault){
            that.setData({ address: addressList[i].address})
            break
          }
        }
      }
    });
  }
});
