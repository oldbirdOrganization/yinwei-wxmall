Component({
  properties: {
    submiting: {
      type: Boolean,
      value: false
    },
    btnTxt: {
      type: String,
      value: "预约报价"
    }
  },
  methods: {
    submitOrder() {
      this.triggerEvent("tap");
    }
  }
});
