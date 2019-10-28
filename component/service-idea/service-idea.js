Component({
  properties: {},
  data: {
    ideaList: wx.getStorageSync("caseList"),
    showList: false,
    serviceIdea: ""
  },
  methods: {
    troggleTypeList() {
      this.setData({
        showList: !this.data.showList
      });
    },
    selectType(ev) {
      const d = ev.currentTarget.dataset.d;
      this.setData({
        showList: false,
        serviceIdea: d
      });
      this.triggerEvent("get", { val: d, key: "serviceIdea" });
    }
  }
});
