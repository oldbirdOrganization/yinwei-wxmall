// 订单提交
const util = require("../utils/util.js");
const api = require("../config/api.js");

function submitOrder() {
  let params = {
    channelId: +this.data.channelId,
    goodsId: +this.data.goodsId || "",
    orderType: ["1", "4"].indexOf(this.data.channelId) === -1 ? 1 : 2,
    orderPrice: this.data.orderPrice || "",
    serviceHouseName: this.data.serviceHouseName || "",
    serviceTime: this.data.serviceTime || "",
    serviceRequired: this.data.serviceRequired || "",
    problemDescription: this.data.problemDescription || "",
    serviceType: this.data.serviceType || "",
    serviceSpace: this.data.serviceSpace || "",
    serviceAcreage: this.data.serviceAcreage || "",
    serviceIdea: this.data.serviceIdea || "",
    serviceAirConditionerModel: this.data.serviceAirConditionerModel || "",
    serviceAirConditionerType: this.data.serviceAirConditionerType || "",
    serviceFurniture: this.data.serviceFurniture || "",
    serviceHouseType: this.data.serviceHouseType || "",
    serviceHouseDeliveryStandards: "",
    imgVoList: this.data.imgVoList || [],
    contactName: this.data.contactName || "",
    contactMobile: this.data.contactMobile || "",
    outerMerchantName: this.data.outerMerchantName || "",
    isOuterOrder: this.data.isOuterOrder || "",
    outerServiceCombo: this.data.outerServiceCombo || "",
    orderPrice: this.data.orderPrice || "",
    outerServiceBrand: this.data.outerServiceBrand || ""
  };
  if (this.data.region) {
    params.address = this.data.region.join("") + this.data.addressTxt;
  }
  this.setData({
    submiting: true
  });
  util
    .request(api.SubmitOrder, params, "POST", "application/json")
    .then(res => {
      this.setData({
        submiting: false
      });
      const flag = res.errno === 0 ? 1 : 0;
      wx.navigateTo({
        url: "/pages/home/bespokeResult/bespokeResult?flag=" + flag
      });
    });
}

module.exports = submitOrder;
