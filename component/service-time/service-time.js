Component({
  properties: {},
  data: {
    date: "",
    time: "",
    index: 0,
    startTime: "",
    range: [
      "00:00-01:59",
      "02:00-03:59",
      "04:00-05:59",
      "06:00-07:59",
      "08:00-09:59",
      "10:00-11:59",
      "12:00-13:59",
      "14:00-15:59",
      "16:00-17:59",
      "18:00-19:59",
      "20:00-21:59",
      "22:00-23:59"
    ]
  },
  lifetimes: {
    attached() {
      const date = new Date();
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const h = date.getHours();
      const index = Math.ceil(h / 2);
      this.setData({
        index,
        date: y + "-" + toTwo(m) + "-" + toTwo(d),
        time: this.data.range[index + 1],
        startTime: y + "-" + toTwo(m) + "-" + toTwo(d)
      });
      function toTwo(n) {
        return n < 10 ? "0" + n : "" + n;
      }
      this.triggerEvent("get", {
        val: this.data.date + " " + this.data.time,
        key: "serviceTime"
      });
    }
  },
  methods: {
    bindDate(ev) {
      this.setData({
        date: ev.detail.value
      });
      this.triggerEvent("get", {
        val: this.data.date + " " + this.data.time,
        key: "serviceTime"
      });
    },
    bindTime(ev) {
      this.setData({
        time: this.data.range[ev.detail.value]
      });
      this.triggerEvent("get", {
        val: this.data.date + " " + this.data.time,
        key: "serviceTime"
      });
    }
  }
});
