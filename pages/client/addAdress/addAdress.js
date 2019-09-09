const ImgPath = "../../../static/images/index/";
const util = require("../../../utils/util.js");
const api = require("../../../config/api.js");
//获取应用实例
const app = getApp();
Page({
  data: {
    id: "",
    isDefault: 0,
    address: "",
    contactMobile: "",
    contactName: "",
    sex: 1,
    addressIndex: 1,
    userId: ""
  },
  onPullDownRefresh() {},
  onLoad(options) {
    this.setData({
      id: options.id
    });
    if (this.data.id) this.getDetail();
  },
  changeDefault() {
    const isDefault = this.data.isDefault;
    this.setData({
      isDefault: isDefault === 0 ? 1 : 0
    });
  },
  getDetail() {
    util.request(api.AddressDetail, { id: this.data.id }, "GET").then(res => {
      if (res.errno === 0) {
        this.setData({
          address: res.data.address,
          contactMobile: res.data.contactMobile,
          contactName: res.data.contactName,
          isDefault: res.data.isDefault,
          sex: res.data.sex,
          addressIndex: res.data.addressIndex,
          userId: res.data.userId
        });
      }
    });
  },
  saveAddress() {
    util
      .request(api.AddressSave, this.data, "POST", "application/json")
      .then(res => {
        if (res.errno === 0) {
          util.showSuccessToast("保存成功");
          setTimeout(() => {
            wx.navigateTo({
              url: "/pages/client/address/address"
            });
          }, 500);
        } else {
          util.showErrorToast("保存失败");
        }
      });
  },
  removeAddress() {
    util.request(api.AddressDelete, { id: this.data.id }).then(res => {
      if (res.errno === 0) {
        util.showSuccessToast("删除成功");
        setTimeout(() => {
          wx.navigateTo({
            url: "/pages/client/address/address"
          });
        }, 1000);
      } else {
        util.showErrorToast("删除失败");
      }
    });
  },
  inputItem(ev) {
    const key = ev.currentTarget.dataset.d;
    const data = this.data;
    data[key] = ev.detail.value;
    this.setData(data);
  },
  changeAddressIndex(ev) {
    const val = ev.currentTarget.dataset.d;
    this.setData({
      addressIndex: Number(val)
    });
  },
  changeSex(ev) {
    const val = ev.currentTarget.dataset.d;
    this.setData({
      sex: Number(val)
    });
  }
});
