Component({
  properties: {},
  data: {
    serviceTime: "",
    index: 0,
    range: [
      "00:00 - 01:59",
      "02:00 - 03:59",
      "04:00 - 05:59",
      "06:00 - 07:59",
      "08:00 - 09:59",
      "10:00 - 11:59",
      "12:00 - 13:59",
      "14:00 - 15:59",
      "16:00 - 17:59",
      "18:00 - 19:59",
      "20:00 - 21:59",
      "22:00 - 23:59"
    ]
  },
  lifetimes: {
    attached() {
      const date = new Date();
      const h = date.getHours();
      const index = Math.ceil(h / 2);
      this.setData({
        index,
        serviceTime: this.data.range[index]
      });
    }
  },
  methods: {
    bindValue(ev) {
      this.setData({
        serviceTime: this.data.range[ev.detail.value]
      });
      this.triggerEvent("get", { val: ev.detail.value, key: "serviceTime" });
    }
  }
});
