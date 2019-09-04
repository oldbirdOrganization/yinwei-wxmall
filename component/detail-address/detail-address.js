Component({
  properties: {},
  data: {
    addressTxt: ""
  },
  methods: {
    inputAddressTxt(ev) {
      this.setData({
        addressTxt: ev.detail.value
      });
      this.triggerEvent("get", { val: ev.detail.value, key: "addressTxt" });
    }
  }
});
