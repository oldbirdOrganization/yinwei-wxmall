Component({
  properties: {},
  data: {
    contactName: ""
  },
  methods: {
    inputContactName(ev) {
      this.setData({
        contactName: ev.detail.value
      });
      this.triggerEvent("get", { val: ev.detail.value, key: "contactName" });
    }
  }
});
