Page({

  /**
   * 页面的初始数据
   */
  data: {
    kind: ["全部", "数码产品", "食品生鲜", "二手书籍", "时尚美妆", "生活用具", "体育器材", "虚拟资源", "其他"],
    goods: [],
  },
  getGoods(res) {
    //调用云函数查询数据库获取商品列表
    wx.cloud.callFunction({
      name: "getGoods",
      data: {
        kind: res.target.dataset.value,
      }
    }).then(res => {
      this.setData({
        goods: res.result.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "getGoods",
      data: {
        kind: "全部",
      }
    }).then(res => {
      this.setData({
        goods: res.result.data
      })
    })
  },
  goods_detail(res) {
    console.log(res.currentTarget.dataset.value)
    var idx = res.currentTarget.dataset.value
    var goods_data = JSON.stringify(this.data.goods[idx])
    wx.navigateTo({
      url: '/pages/goodsInf/goodsInf?value=' + goods_data,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})