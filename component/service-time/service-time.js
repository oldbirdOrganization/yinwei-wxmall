Component({
  properties: {},
  data: {
    serviceTime: ""
  },
  methods: {
    bindValue(ev) {
      this.setData({
        serviceTime: ev.detail.value
      });
      this.triggerEvent("get", { val: ev.detail.value, key: "serviceTime" });
    }
  }
});
