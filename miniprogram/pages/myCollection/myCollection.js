// pages/myCollection/myCollection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    myCollectionId: [],
    myCollectionGoods: [],
  },
  goods_detail(res) {
    console.log(res.currentTarget.dataset.value)
    var idx = res.currentTarget.dataset.value
    var goods_data = JSON.stringify(this.data.myCollectionGoods[idx])
    wx.navigateTo({
      url: '/pages/myCollectionInf/myCollectionInf?value=' + goods_data,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      myCollectionId: [],
    })
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        // 获取到用户的 openid
        this.setData({
          openid: res.result.openid
        })
        this.getMyCollectionId(this.data.openid) //得到商品ID
        setTimeout(() => {
          this.getMyCollectionGoods(this.data.myCollectionId)
        }, 500)
      }
    })

  },
  getMyCollectionId(openid) {
    //得到商品ID
    var db = wx.cloud.database();
    db.collection("userCollection").where({
      _openid: openid
    }).get().then(res => {
      console.log(res)
      var array = res.data;
      for (var i = 0; i < array.length; i++) {
        this.data.myCollectionId.push(array[i].goodsID);
      }
    })
  },
  getMyCollectionGoods(goodsIdList) {
    var db = wx.cloud.database();
    const _ = db.command;
    db.collection("goods").where({
      _id: _.in(goodsIdList)
    }).get().then(res => {
      this.setData({
        myCollectionGoods: res.data
      })
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
    //模拟加载
    wx.stopPullDownRefresh() //停止下拉刷新 
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