const util = require("../../utils/util.js");
const api = require("../../config/api.js");
Component({
  properties: {},
  data: {
    categoryList: wx.getStorageSync("categoryList"),
    showCategoryList: false,
    serviceSpace: ""
  },
  methods: {
    troggleCategoryList() {
      this.setData({
        showCategoryList: !this.data.showCategoryList
      });
    },
    selectCategory(ev) {
      const d = ev.currentTarget.dataset.d;
      this.setData({
        serviceSpace: d,
        showCategoryList: false
      });
      this.triggerEvent("get", { val: d, key: "serviceSpace" });
    }
  }
});
