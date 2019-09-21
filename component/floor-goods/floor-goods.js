const util = require("../../utils/util.js");
const api = require("../../config/api.js");
Component({
  properties: {
    type: {
      type: String,
      value: "1"
    }
  },
  lifetimes: {
    attached() {
      const t = this.data.type;
      this.setData({
        titleSrc: "../../static/images/index/card-" + t + ".png",
        name: this.data.type === "1" ? "限时优惠" : "明星产品"
      });
      util
        .request(api.IndexFLoorGoods, { floorType: this.data.type })
        .then(res => {
          if (res.errno === 0) {
            const list = res.data.goodsList;
            this.setData({
              list,
              goodsList: list.filter((val, i) => {
                return i < 2;
              })
            });
          }
        });
    }
  },
  data: {
    list: [],
    goodsList: [],
    titleSrc: ""
  },
  methods: {
    showMore() {
      const list = this.data.goodsList;
      if (list.length > 2) {
        this.setData({
          goodsList: this.data.list.filter((val, i) => {
            return i < 2;
          })
        });
      } else {
        this.setData({
          goodsList: this.data.list
        });
      }
    }
  }
});
