/**
 * 支付相关服务
 */

const util = require("../utils/util.js");
const api = require("../config/api.js");
const login = require("../services/login.js");

/**
 * 判断用户是否登录
 */
function payOrder(orderNo) {
  return new Promise((resove, reject) => {
    login().then(() => {
      util.request(api.PayPrepayId, { orderNo }).then(res => {
        const { nonceStr, paySign, signType, timeStamp } = res.data;
        const pa = res.data.package;
        if (res.errno == 0) {
          wx.requestPayment({
            timeStamp,
            nonceStr,
            package: pa,
            signType,
            paySign,
            success(res) {
              resove();
            },
            fail(res) {
              reject();
            }
          });
        } else {
          reject();
        }
      });
    });
  });
}

module.exports = payOrder;
