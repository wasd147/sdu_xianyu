// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  if (event.bool) {
    db.collection("user").where({
      openid: event.openid
    }).update({
      data: {

        location: event.location,
        qq: event.qq
      }
    })
  } else {
    db.collection("user").add({
      data: {
        openid: event.openid,
        location: event.location,
        qq: event.qq
      }
    })
  }
}