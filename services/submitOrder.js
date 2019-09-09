// 订单提交
const util = require("../utils/util.js");
const api = require("../config/api.js");
const pay = require("../services/pay.js");

function submitOrder(data, needPay) {
  let params = {
    channelId: +data.channelId,
    goodsId: +data.goodsId || "",
    orderType: ["1", "4"].indexOf(data.channelId) === -1 ? 1 : 2,
    orderPrice: data.orderPrice || "",
    serviceHouseName: data.serviceHouseName || "",
    serviceTime: data.serviceTime || "",
    serviceRequired: data.serviceRequired || "",
    problemDescription: data.problemDescription || "",
    serviceType: data.serviceType || "",
    serviceSpace: data.serviceSpace || "",
    serviceAcreage: data.serviceAcreage || "",
    serviceIdea: data.serviceIdea || "",
    serviceAirConditionerModel: data.serviceAirConditionerModel || "",
    serviceAirConditionerType: data.serviceAirConditionerType || "",
    serviceFurniture: data.serviceFurniture || "",
    serviceHouseType: data.serviceHouseType || "",
    serviceHouseDeliveryStandards: "",
    imgVoList: data.imgVoList || [],
    contactName: data.contactName || "",
    contactMobile: data.contactMobile || "",
    outerMerchantName: data.outerMerchantName || "",
    isOuterOrder: data.isOuterOrder || "",
    outerServiceCombo: data.outerServiceCombo || "",
    orderPrice: data.orderPrice || "",
    outerServiceBrand: data.outerServiceBrand || ""
  };
  if (data.region) {
    params.address = data.region.join("") + data.addressTxt;
  }
  if (data.address) params.address = data.address;
  return new Promise((resove, reject) => {
    util
      .request(api.SubmitOrder, params, "POST", "application/json")
      .then(res => {
        const flag = res.errno === 0 ? 1 : 0;
        if (flag && needPay) {
          wx.navigateTo({
            url: "/pages/orderDetail/orderDetail?orderNo=" + res.data
          });
          resove();
        } else {
          wx.navigateTo({
            url: "/pages/home/bespokeResult/bespokeResult?flag=" + flag
          });
          resove();
        }
      });
  });
}

module.exports = submitOrder;
