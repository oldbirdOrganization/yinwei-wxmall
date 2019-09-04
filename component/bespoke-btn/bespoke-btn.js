Component({
  properties: {
    submiting: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    submitOrder() {
      this.triggerEvent("tap");
    }
  }
});
