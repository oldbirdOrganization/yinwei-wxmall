Component({
  properties: {
    labelTxt: {
      type: String,
      value: "空间面积"
    }
  },
  data: {
    serviceAcreage: ""
  },
  methods: {
    inputServiceAcreage(ev) {
      this.setData({
        serviceAcreage: ev.detail.value
      });
      this.triggerEvent("get", { val: ev.detail.value, key: "serviceAcreage" });
    }
  }
});
