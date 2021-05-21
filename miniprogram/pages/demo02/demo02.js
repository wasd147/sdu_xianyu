// pages/demo02/demo02.js
var openid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kind: ["数码产品", "食品生鲜", "二手书籍", "时尚美妆", "生活用具", "体育器材", "虚拟资源", "其他"],
    tempFilePaths: [],
    goods: {},
    goodsPic: [],
  },


  chooseImage() {
    wx.chooseImage({}).then(chooseResult => {
      this.setData({
        tempFilePaths: chooseResult.tempFilePaths
      })
    })
  },
  uploadeImg() {
    wx.showLoading({
      title: '正在上传中...',
    })
    for (var i = 0; i < this.data.tempFilePaths.length; i++) {
      wx.cloud.uploadFile({
        filePath: this.data.tempFilePaths[i],
        cloudPath: "goodsImg/" + openid + "_" + Date.now() + "_" + i + ".jpg"
      }).then(res => {
        this.data.goodsPic.push(res.fileID)
        console.log(this.data.goodsPic)
      })
    }
    setTimeout(() => {
        wx.hideLoading({
          success: res => {
            console.log("上传成功！")
          }
        })
      },
      2000)

    setTimeout(() => {
      this.addGoods()
    }, 9000)

    setTimeout(function () {
      wx.reLaunch({
        url: "/pages/demo01/demo01"
      });
    }, 200)
  },

  upload(res) {
    this.uploadeImg();
    this.setData({
      goods: res.detail.value
    })
  },
  addGoods() {
    //调用云函数增加一条商品记录
    wx.cloud.callFunction({
      name: "addGoods",
      data: {
        goodsInf: this.data.goods.goodsInf,
        goodsPrice: this.data.goods.goodsPrice,
        goodsKinds: this.data.goods.kind,
        goodsPic: this.data.goodsPic,
        goodsOwner: openid,
        goodsName: this.data.goods.goodsName
      }

    }).then(res => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        // 获取到用户的 openid
        openid = res.result.openid
      }
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