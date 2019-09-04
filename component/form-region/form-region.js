Component({
  properties: {},
  data: {
    region: ["北京市", "北京市", "东城区"]
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
