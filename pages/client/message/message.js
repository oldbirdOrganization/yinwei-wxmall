const ImgPath = "../../../static/images/index/"
//获取应用实例
const app = getApp()
Page({
  data: {
    list: [
      {name: "换灯泡",price: "8",unit: "只"}
    ],
    activeIndex: 0
  },
  onPullDownRefresh(){
	  
  },
  onLoad: function (options) {
    // this.getIndexData();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
})
