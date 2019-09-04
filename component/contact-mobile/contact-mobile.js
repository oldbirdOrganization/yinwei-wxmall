Component({
  properties: {},
  data: {
    contactMobile: ""
  },
  methods: {
    inputContactMobile(ev) {
      this.setData({
        contactMobile: ev.detail.value
      });
      this.triggerEvent("get", { val: ev.detail.value, key: "contactMobile" });
    }
  }
});
