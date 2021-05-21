// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {

  switch (event.kind) {
    case "全部": {
      return getAll();
      break;
    }
    case "数码产品": {
      return getSmcp();
      break;
    }
    case "食品生鲜": {
      return getSpsx()
      break;
    }
    case "二手书籍": {
      return getEssj()
      break;
    }
    case "时尚美妆": {
      return getSsmz()
      break;
    }
    case "生活用具": {
      return getShyj()
      break;
    }
    case "体育器材": {
      return getTyqc()
      break;
    }
    case "虚拟资源": {
      return getXnzy()
      break;
    }
    case "其他": {
      return getQt()
      break;
    }
    default:
      break;
  }
}
async function getAll() {
  return db.collection("goods").get()
}

async function getSmcp() {
  return db.collection("goods").where({
    goodsKinds: _.in(["数码产品"])
  }).get()
}

async function getSpsx() {
  return db.collection("goods").where({
    goodsKinds: _.in(["食品生鲜"])
  }).get()
}


async function getEssj() {
  return db.collection("goods").where({
    goodsKinds: _.in(["二手书籍"])
  }).get()
}

async function getSsmz() {
  return db.collection("goods").where({
    goodsKinds: _.in(["时尚美妆"])
  }).get()
}

async function getShyj() {
  return db.collection("goods").where({
    goodsKinds: _.in(["生活用具"])
  }).get()
}
async function getTyqc() {
  return db.collection("goods").where({
    goodsKinds: _.in(["体育器材"])
  }).get()
}
async function getXnzy() {
  return db.collection("goods").where({
    goodsKinds: _.in(["虚拟资源"])
  }).get()
}
async function getQt() {
  return db.collection("goods").where({
    goodsKinds: _.in(["其他"])
  }).get()
}