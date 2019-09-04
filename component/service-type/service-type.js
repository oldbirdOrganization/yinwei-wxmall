Component({
  properties: {},
  data: {
    typeList: ["别墅", "公寓", "商铺", "办公楼", "其他"],
    showTypeList: false,
    serviceType: ""
  },
  methods: {
    troggleTypeList() {
      this.setData({
        showTypeList: !this.data.showTypeList
      });
    },
    selectType(ev) {
      const d = ev.currentTarget.dataset.d;
      this.setData({
        showTypeList: false,
        serviceType: d
      });
      this.triggerEvent("get", { val: d, key: "serviceType" });
    }
  }
});
