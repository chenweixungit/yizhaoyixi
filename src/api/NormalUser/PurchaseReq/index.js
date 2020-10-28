import axios from 'axios'

async function findPurReq () {
  const res = await axios({
    method: 'get',
    url: '/addPurReq/queryPurchaseReqAll'
  })
  return res
}
async function getPurReqDetails (data) {
  const res = await axios({
    method: 'post',
    url: '/addPurReq/queryPurchaseReqInfo',
    data: data
  })
  return res
}
async function getPurReqGoodsDetails (data) {
  const res = await axios({
    method: 'post',
    url: '/addPurReq/queryPurchaseReqGoodsInfo',
    data: data
  })
  return res
}
// 查询所有库存组织
async function findAllInvOrg () {
  const res = await axios({
    method: 'get',
    url: '/inventoryOrganization/all'
  })
  return res
}
// 查询所有中心
async function findAllCenter () {
  const res = await axios({
    method: 'get',
    url: '/center/all'
  })
  return res
}
// 新建请购单获取请购单号
async function getPurReqCode () {
  const res = await axios({
    method: 'get',
    url: '/addPurReq/newPurchaseReq'
  })
  return res
}
// 保存主明细数据
async function saveMain (data) {
  const res = await axios({
    method: 'post',
    url: '/addPurReq/mainPurchaseDetail',
    data: data
  })
  return res
}
// 点击新增获取物料数据
async function getGoods (data) {
  const res = await axios({
    method: 'post',
    url: '/addPurReq/queryAllGoods',
    data: data
  })
  return res
}
// 插入物料
async function insertGoods (data) {
  const res = await axios({
    method: 'post',
    url: '/addPurReq/insertPurchaseReqDetail',
    data: data
  })
  return res
}
// 删除物料
async function deleteGoods (data) {
  const res = await axios({
    method: 'post',
    url: '/addPurReq/deleteGoodsDetail',
    data: data
  })
  return res
}
// 更新请购单中的物料信息
async function updataGoodsInfo (data) {
  const res = await axios({
    method: 'post',
    url: '/addPurReq/updatePurchaseReqGoods',
    data: data
  })
  return res
}
// 保存或提交
async function saveOrCommit (data) {
  const res = await axios({
    method: 'post',
    url: '/addPurReq/updatePurchaseReqStatus',
    data: data
  })
  return res
}
// 删除请购单
async function deletePurReq (data) {
  const res = await axios({
    method: 'post',
    url: '/addPurReq/deletePurchaseReq',
    data: data
  })
  return res
}
// 关闭请购单
async function closePurReq (data) {
  const res = await axios({
    method: 'post',
    url: '/addPurReq/closePurchaseReq',
    data: data
  })
  return res
}
export {
  findPurReq,
  getPurReqDetails,
  getPurReqGoodsDetails,
  findAllInvOrg,
  findAllCenter,
  getPurReqCode,
  saveMain,
  getGoods,
  insertGoods,
  deleteGoods,
  updataGoodsInfo,
  saveOrCommit,
  deletePurReq,
  closePurReq
}
