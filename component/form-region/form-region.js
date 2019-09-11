Component({
  properties: {},
  data: {
    region: ["上海市", "上海市", "黄浦区"]
  },
  methods: {
    selectRegion(ev) {
      this.setData({
        region: ev.detail.value
      });
      this.triggerEvent("get", { val: ev.detail.value, key: "region" });
    }
  }
});
