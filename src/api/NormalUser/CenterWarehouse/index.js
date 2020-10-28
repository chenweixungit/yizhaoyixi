import axios from 'axios'
async function findAllWarehouseByOrganization (data) {
  const res = await axios({
    method: 'post',
    url: '/storage/queryByInveOranName',
    data: data
  })
  return res
}
async function findAllGoodsInOneStorage (data) {
  const res = await axios({
    method: 'post',
    url: '/goodsInStorage/queryInOneStorage',
    data: data
  })
  return res
}
// 创建转库申请单
async function createNewTransfer (data) {
  const res = await axios({
    method: 'post',
    url: '/transferRequest/addOne',
    data: data
  })
  return res
}
// 创建转库申请单的保存按钮
async function updateTransferRequest (data) {
  const res = await axios({
    method: 'post',
    url: '/transferRequest/updateRequest',
    data: data
  })
  return res
}
// 转库申请单选择物料确认后
async function transferRequestDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/transferRequest/addDetail',
    data: data
  })
  return res
}
// 获取全部转库申请单
async function findAllTransferReq (data) {
  const res = await axios({
    method: 'get',
    url: '/transferRequest/all',
    data: data
  })
  return res
}
async function updateTransferReqDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/transferRequest/updateDetail',
    data: data
  })
  return res
}
// 转库申请单提交主数据
async function submitTransferRequest (data) {
  const res = await axios({
    method: 'post',
    url: '/transferRequest/submitRequest',
    data: data
  })
  return res
}
// 按照id去查询转库单明细
async function detailByTransferId (data) {
  const res = await axios({
    method: 'post',
    url: '/transferRequest/detailByTransferId',
    data: data
  })
  return res
}
// 提交转库申请单mingxi
async function submitTransferRequestDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/transferRequest/submitDetail',
    data: data
  })
  return res
}
// 按ID删除转库申请单
async function deleteTransferRequestById (data) {
  const res = await axios({
    method: 'post',
    url: '/transferRequest/deleteOne',
    data: data
  })
  return res
}
// 查询全部转库单
async function findAllTransfer (data) {
  const res = await axios({
    method: 'post',
    url: '/transfer/all',
    data: data
  })
  return res
}
// 按code查询转库单
async function findTransferByCode (data) {
  const res = await axios({
    method: 'post',
    url: '/transfer/queryDetail',
    data: data
  })
  return res
}
// 转库单详情保存
async function saveTransferDetailDialog (data) {
  const res = await axios({
    method: 'post',
    url: '/transfer/updateDetail',
    data: data
  })
  return res
}

// 转库单详情提交
async function submitTransferDetailDialog (data) {
  const res = await axios({
    method: 'post',
    url: '/transfer/submitDetail',
    data: data
  })
  return res
}
// 删除转库单
async function deleteTransferDetailDialog (data) {
  const res = await axios({
    method: 'post',
    url: '/transfer/delete',
    data: data
  })
  return res
}

// 获取所有的库存盘点单
async function findAllCheck () {
  const res = await axios({
    method: 'get',
    url: '/check/queryAllCheck'
  })
  return res
}
// 新建库存盘点
async function createNewCheck () {
  const res = await axios({
    method: 'get',
    url: '/check/newCheck'
  })
  return res
}
// 保存盘点单主要信息
async function saveCheckMain (data) {
  const res = await axios({
    method: 'post',
    url: '/check/saveMainDetail',
    data: data
  })
  return res
}
async function findGoodsById (data) {
  const res = await axios({
    method: 'post',
    url: '/check/queryAllGoods',
    data: data
  })
  return res
}
// 保存盘点单
async function saveCheckGoodDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/check/updateCheckGoodDetail',
    data: data
  })
  return res
}
async function updateCheckStatus (data) {
  const res = await axios({
    method: 'post',
    url: '/check/updateCheckStatus',
    data: data
  })
  return res
}
// 获取所有的其他入库单
async function findAllOtherIn () {
  const res = await axios({
    method: 'get',
    url: '/otherIn/queryAllOtherIn'
  })
  return res
}
// 查询其他入库的明细数据
async function findOtherInDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/otherIn/getOtherInDetail',
    data: data
  })
  return res
}
// 新建其他入库
async function createOtherIn () {
  const res = await axios({
    method: 'get',
    url: '/otherIn/newOtherIn'
  })
  return res
}
// otherIn/updateOtherInMain
async function updateOtherInMain (data) {
  const res = await axios({
    method: 'post',
    url: '/otherIn/updateOtherInMain',
    data: data
  })
  return res
}
// 寻找所有其他入库单
async function findAllOtherTransfer () {
  const res = await axios({
    method: 'get',
    url: '/otherIn/queryAllOtherIn'
  })
  return res
}
// 插入转库单明细otherIn/insertOtherInDetailByTransfer
async function insertOtherInDetailByTransfer (data) {
  const res = await axios({
    method: 'post',
    url: '/otherIn/insertOtherInDetailByTransfer',
    data: data
  })
  return res
}
// otherIn/getOtherInDetail
async function getOtherInDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/otherIn/getOtherInDetail',
    data: data
  })
  return res
}
// 获取转库单明细
async function getTranferDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/transfer/queryDetail',
    data: data
  })
  return res
}
// otherIn/updateOtherInStatus
async function updateOtherInStatus (data) {
  const res = await axios({
    method: 'post',
    url: '/otherIn/updateOtherInStatus',
    data: data
  })
  return res
}
// 查询所有转库单
async function getAllTransfer () {
  const res = await axios({
    method: 'get',
    url: '/transfer/all'
  })
  return res
}
// 取消时删除其他入库 otherIn/deleteOtherIn
async function deleteOtherIn (data) {
  const res = await axios({
    method: 'post',
    url: '/otherIn/deleteOtherIn',
    data: data
  })
  return res
}
// 获取一个入库信息头
async function getOtherIn (data) {
  const res = await axios({
    method: 'post',
    url: '/otherIn/getOtherIn',
    data: data
  })
  return res
}
// 查询所有材料出库
async function findAllGoodsOut () {
  const res = await axios({
    method: 'get',
    url: '/goodsout/allgoodsout'
  })
  return res
}
// 查询所有的销售出库
async function findAllSaleOut () {
  const res = await axios({
    method: 'get',
    url: '/saleLeave/all'
  })
  return res
}
// 查询所有其他出库
async function findAllOtherOut () {
  const res = await axios({
    method: 'get',
    url: '/otherOut/all'
  })
  return res
}
// 材料出库明细查询
async function findGoodsDetailById (data) {
  const res = await axios({
    method: 'post',
    url: '/goodsoutdetail/querygoodsoutdetailbyid',
    data: data
  })
  return res
}
// 查询销售出库明细
async function findSaleDetailById (data) {
  const res = await axios({
    method: 'post',
    url: '/saleLeave/detailBySaleLeaveCode',
    data: data
  })
  return res
}
// 查询其他出库明细
async function findOtherDetailById (data) {
  const res = await axios({
    method: 'post',
    url: '/otherOut/detailByOutId',
    data: data
  })
  return res
}
export {
  findAllWarehouseByOrganization,
  findAllGoodsInOneStorage,
  createNewTransfer,
  updateTransferRequest,
  transferRequestDetail,
  findAllTransferReq,
  updateTransferReqDetail,
  submitTransferRequest,
  detailByTransferId,
  submitTransferRequestDetail,
  deleteTransferRequestById,
  findAllTransfer,
  findTransferByCode,
  saveTransferDetailDialog,
  submitTransferDetailDialog,
  deleteTransferDetailDialog,
  findAllCheck,
  createNewCheck,
  saveCheckMain,
  findGoodsById,
  saveCheckGoodDetail,
  updateCheckStatus,
  findAllOtherIn,
  findOtherInDetail,
  createOtherIn,
  updateOtherInMain,
  findAllOtherTransfer,
  insertOtherInDetailByTransfer,
  getOtherInDetail,
  updateOtherInStatus,
  getTranferDetail,
  getAllTransfer,
  deleteOtherIn,
  getOtherIn,
  findAllGoodsOut,
  findAllSaleOut,
  findAllOtherOut,
  findGoodsDetailById,
  findSaleDetailById,
  findOtherDetailById
}
