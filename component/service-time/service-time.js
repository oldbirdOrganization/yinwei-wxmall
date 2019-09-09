Component({
  properties: {},
  data: {
    serviceTime: ""
  },
  lifetimes: {
    attached() {
      const date = new Date();
      const h = date.getHours();
      const m = date.getMinutes();
      this.setData({
        serviceTime: `${h}:${m}`
      });
    }
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
