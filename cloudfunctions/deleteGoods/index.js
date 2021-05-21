// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var goodsID = event.goodsID;
  var goodsPic = event.goodsPic;
  const db = cloud.database();
  cloud.deleteFile({
    fileList: goodsPic
  })

  db.collection("userCollection").where({
    goodsID: goodsID
  }).remove()

  db.collection("goods").where({
    _id: goodsID
  }).remove()

}