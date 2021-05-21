Page({

  /**
   * 页面的初始数据
   */
  data: {
    wasd: false,
    WASD_: true,
    userName: '',
    userImg: ''
  },
  getInf(e) {
    this.setData({
      userName: "用户名：" + e.detail.userInfo.nickName,
      userImg: e.detail.userInfo.avatarUrl
    })
    this.setData({
      wasd: true,
      WASD_: false,

    })
  },
  userInf() {
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/userInf/userInf',
      })
    }, 200)
  },
  myGoods() {
    wx.navigateTo({
      url: '/pages/myGoods/myGoods'
    })
  },
  myCollection() {
    wx.navigateTo({
      url: '/pages/myCollection/myCollection',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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