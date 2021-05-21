// pages/goodsInf/goodsInf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    goodsData: {},
    goodsOwner: {},
  },
  collect() {
    var id = this.data.goodsData._id;
    var db = wx.cloud.database();
    db.collection("userCollection").add({
      data: {
        goodsID: id,
        //openid: this.data.openid
      },
      success: res => {
        wx.showToast({
          title: '收藏成功',
          duration:2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goodsData: JSON.parse(options.value),
    })
    this.getGoodsOwner()
  },
  getGoodsOwner() {
    var db = wx.cloud.database();
    db.collection("user").where({
      openid: this.data.goodsData.goodsOwner
    }).get().then(res => {
      this.setData({
        goodsOwner: res.data[0]
      })
      console.log(this.data.goodsOwner)
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