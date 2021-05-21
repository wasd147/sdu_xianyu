// pages/userInf/userInf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    location: "",
    qq: "",
  },
  //保存按钮的绑定函数
  infor(res) {
    this.setData({
      location: res.detail.value.location,
      qq: res.detail.value.qq
    })
    wx.showToast({
      title: '保存成功',
      icon: "success",
      duration: 1000
    })

    var db = wx.cloud.database();
    db.collection("user").where({
      openid: this.data.openid
    }).get({
      success: res => {
        if (res.data.length != 0) {
          wx.cloud.callFunction({
            name: "submitUser",
            data: {
              openid: this.data.openid,
              location: this.data.location,
              qq: this.data.qq,
              bool: true
            }
          })
        } else {
          wx.cloud.callFunction({
            name: "submitUser",
            data: {
              openid: this.data.openid,
              location: this.data.location,
              qq: this.data.qq,
              bool: false
            }
          })
        }
      }
    })
  },

  getUserInf(openid) {
    var db = wx.cloud.database();
    db.collection("user").where({
      openid: openid
    }).get().then(res => {
      this.setData({
        location: res.data[0].location,
        qq: res.data[0].qq
      })
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
    wx.cloud.callFunction({
        name: "getOpenid",
      })
      .then(res => {
        this.setData({
          openid: res.result.openid
        })
        this.getUserInf(this.data.openid)
      })
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