Component({
  properties: {},
  data: {
    serviceHouseName: ""
  },
  methods: {
    inputValue(ev) {
      this.setData({
        serviceHouseName: ev.detail.value
      });
      this.triggerEvent("get", {
        val: ev.detail.value,
        key: "serviceHouseName"
      });
    }
  }
});
