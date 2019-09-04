const util = require("../../../utils/util.js");
const api = require("../../../config/api.js");
const submitOrder = require("../../../services/submitOrder.js");
const ImgPath = require("../../../config/picPath");
Page({
  data: {
    channelId: "7",
    serviceHouseName: "",
    serviceType: "",
    region: ["北京市", "北京市", "东城区"],
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
  onLoad(options) {},
  submitOrder,
  setItemValue(args) {
    const data = this.data;
    data[args.detail.key] = args.detail.val;
    this.setData(data);
  },
  inputDescription(ev) {
    this.setData({
      contactName: ev.detail.value
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
