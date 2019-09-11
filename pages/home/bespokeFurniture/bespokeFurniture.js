const util = require("../../../utils/util.js");
const api = require("../../../config/api.js");
const submitOrder = require("../../../services/submitOrder.js");
const ImgPath = require("../../../config/picPath");
Page({
  data: {
    channelId: "7",
    isOuterOrder: "0",
    serviceHouseName: "",
    serviceType: "",
    serviceTime: "",
    region: ["上海市", "上海市", "黄浦区"],
    addressTxt: "",
    contactName: "",
    contactMobile: "",
    serviceFurniture: "",
    problemDescription: "",
    imgs: [
      { src: "" },
      {
        name: "",
        src: "",
        isCamera: true
      },
      { src: "" }
    ],
    imgVoList: [],
    imgLen: 0,
    submiting: false,
    image_url: ImgPath + "1800283829266e.jpg"
  },
  onLoad(options) {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
  },
  submitOrder() {
    if (this.data.submiting) {
      return;
    }
    if (!this.data.serviceType) {
      wx.showToast({
        title: "请选择服务类型",
        icon: "none",
        duration: 1000
      });
      return;
    }
    if (!this.data.serviceTime) {
      wx.showToast({
        title: "请选择服务时间",
        icon: "none",
        duration: 1000
      });
      return;
    }
    if (!this.data.serviceFurniture) {
      wx.showToast({
        title: "请填写家具名称",
        icon: "none",
        duration: 1000
      });
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
    if (!this.data.addressTxt) {
      wx.showToast({
        title: "请填写地址",
        icon: "none",
        duration: 1000
      });
      return;
    }
    this.setData({
      submiting: true
    });
    submitOrder(this.data).then(() => {
      this.setData({
        submiting: false
      });
    });
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
  inputServiceFurniture(ev) {
    this.setData({
      serviceFurniture: ev.detail.value
    });
  },
  selectCamera() {
    let that = this;
    if (this.data.imgLen >= 6) return;
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
              if (imgLen > 1 && imgLen < 6) {
                imgs[imgLen]
                  ? (imgs[imgLen].isCamera = true)
                  : (imgs[imgLen] = { isCamera: true });
              } else {
                imgs[1].isCamera = true;
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
    if (imgLen < 1) {
      imgs.splice(0, 0, { src: "" });
    } else if (imgLen < 2) {
      imgs.splice(2, 0, { src: "" });
    } else if (imgLen === 5) {
      imgs.splice(5, 0, { isCamera: true, src: "" });
    }
    this.setData({ imgs, imgLen });
  }
});
