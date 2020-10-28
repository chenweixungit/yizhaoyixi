import axios from 'axios'
/* 采购入库 */
// 查询所有的采购入库单
async function queryAllPurchaseIn () {
  const res = await axios({
    method: 'get',
    url: '/purchaseIn/queryAllPurchaseIn'
  })
  return res
}
// 获取所有的采购订单
async function queryAllOrder () {
  const res = await axios({
    method: 'get',
    url: '/purchaseIn/queryAllOrder'
  })
  return res
}
// 根据采购订单编码新建采购入库
async function newPurchaseIn (data) {
  const res = await axios({
    method: 'post',
    url: '/purchaseIn/newPurchaseIn',
    data: data
  })
  return res
}
// 保存物料明细数据
async function insertPurchaseInDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/purchaseIn/insertPurchaseInDetail',
    data: data
  })
  return res
}
// 保存主明细数据
async function updatePurchaseInMain (data) {
  const res = await axios({
    method: 'post',
    url: '/purchaseIn/updatePurchaseInMain',
    data: data
  })
  return res
}
// 更新实收数量与无税金额
async function updatePurchaseIn (data) {
  const res = await axios({
    method: 'post',
    url: '/purchaseIn/updatePurchaseIn',
    data: data
  })
  return res
}
// 采购入库的保存和提交
async function updatePurchaseInStatus (data) {
  const res = await axios({
    method: 'post',
    url: '/purchaseIn/updatePurchaseInStatus',
    data: data
  })
  return res
}
// 删除采购入库单
async function deletePurchaseIn (data) {
  const res = await axios({
    method: 'post',
    url: '/purchaseIn/deletePurchaseIn',
    data: data
  })
  return res
}
// 获取采购入库单详情
async function queryPurchaseInDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/purchaseIn/queryPurchaseInDetail',
    data: data
  })
  return res
}

/* 其他入库 */
// 获取所有其他入库单
async function queryAllOtherIn () {
  const res = await axios({
    method: 'get',
    url: '/otherIn/queryAllOtherIn'
  })
  return res
}
/* 销售出库 */
// 查询得到所有的销售出库单
async function queryAllSaleOut () {
  const res = await axios({
    method: 'get',
    url: '/saleLeave/all'
  })
  return res
}
// 查询销售出库单明细
async function queryAllSaleDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/saleLeave/detailBySaleLeaveCode',
    data: data
  })
  return res
}

/* 其他出库 */
// 查询得到所有的其他出库单
async function queryAllOtherOut () {
  const res = await axios({
    method: 'get',
    url: '/otherOut/all'
  })
  return res
}
// 查询其他出库单明细
async function queryOtherDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/otherOut/detailByOutId',
    data: data
  })
  return res
}
/* 期初库存 */
// 查询所有的期初库存
async function getAllInit () {
  const res = await axios({
    method: 'get',
    url: '/beginningStorage/all'
  })
  return res
}
// 新建期初库存
async function newInit (data) {
  const res = await axios({
    method: 'post',
    url: '/beginningStorage/insert',
    data: data
  })
  return res
}
// 上边的保存按钮
async function saveInitMain (data) {
  const res = await axios({
    method: 'post',
    url: '/beginningStorage/update',
    data: data
  })
  return res
}
// 插入物料
async function insertInitDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/beginningStorage/insertDetail',
    data: data
  })
  return res
}
// 删除一条物料明细
async function deleteInitDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/beginningStorage/deleteDetail',
    data: data
  })
  return res
}
// 下面的保存
async function updateInitDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/beginningStorage/updateDetail',
    data: data
  })
  return res
}
// 提交
async function commitInitAll (data) {
  const res = await axios({
    method: 'post',
    url: '/beginningStorage/submit',
    data: data
  })
  return res
}
// 删除一条期初库存
async function deleteInit (data) {
  const res = await axios({
    method: 'post',
    url: '/beginningStorage/delete',
    data: data
  })
  return res
}
// 查询期初库存明细
async function queryInitDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/beginningStorage/queryDetail',
    data: data
  })
  return res
}
export {
  queryAllPurchaseIn,
  queryAllSaleOut,
  queryAllOtherOut,
  queryOtherDetail,
  queryAllSaleDetail,
  queryAllOrder,
  queryAllOtherIn,
  newPurchaseIn,
  insertPurchaseInDetail,
  updatePurchaseInMain,
  updatePurchaseIn,
  updatePurchaseInStatus,
  deletePurchaseIn,
  queryPurchaseInDetail,
  getAllInit,
  newInit,
  saveInitMain,
  insertInitDetail,
  deleteInitDetail,
  updateInitDetail,
  commitInitAll,
  deleteInit,
  queryInitDetail
}
