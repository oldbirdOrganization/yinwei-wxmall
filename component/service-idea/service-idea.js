Component({
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  data: {
    showList: false,
    serviceIdea: ""
  },
  methods: {
    troggleTypeList() {
      this.setData({
        showList: !this.data.showList
      });
    },
    selectType(ev) {
      const d = ev.currentTarget.dataset.d;
      this.setData({
        showList: false,
        serviceIdea: d
      });
      this.triggerEvent("get", { val: d, key: "serviceIdea" });
    }
  }
});
