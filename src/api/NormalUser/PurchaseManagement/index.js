import axios from 'axios'
// 采购合同
// 获取所有采购合同信息
async function getAllContract () {
  const res = await axios({
    method: 'get',
    url: '/contract/queryAllContract'
  })
  return res
}
// 获取采购合同的主键
async function getContractId () {
  const res = await axios({
    method: 'get',
    url: '/contract/newContract'
  })
  return res
}
// 保存采购合同的主要明细数据
async function saveContractMain (data) {
  const res = await axios({
    method: 'post',
    url: '/contract/mainContract',
    data: data
  })
  return res
}
// 根据库存组织选择请购单
async function choosePurchaseReq (data) {
  const res = await axios({
    method: 'post',
    url: '/contract/choosePurchaseReq',
    data: data
  })
  return res
}
// 保存物料信息到合同中
async function insertContractGoods (data) {
  const res = await axios({
    method: 'post',
    url: '/contract/insertContractGoods',
    data: data
  })
  return res
}
// 删除明细表中的某条数据
async function deleteContractDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/contract/deleteContractDetail',
    data: data
  })
  return res
}
// 保存和提交
async function updateContractStatus (data) {
  const res = await axios({
    method: 'post',
    url: '/contract/updateContractStatus',
    data: data
  })
  return res
}
// 明细数据的更新
async function updateContractGoodsDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/contract/updateContractGoodsDetail',
    data: data
  })
  return res
}
// 删除某个合同
async function deleteContract (data) {
  const res = await axios({
    method: 'post',
    url: '/contract/deleteContract',
    data: data
  })
  return res
}
// 获得某个合同的明细数据
async function queryContractDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/contract/queryContractDetail',
    data: data
  })
  return res
}
// 采购订单
// 获取所有的采购订单
async function queryAllOrder () {
  const res = await axios({
    method: 'get',
    url: '/order/queryAllOrder'
  })
  return res
}
// 查询所有的请购单
async function queryPurReq (data) {
  const res = await axios({
    method: 'post',
    url: '/contract/choosePurchaseReq',
    data: data
  })
  return res
}
// 根据请购单创建采购订单
async function newOrderByPurchaseReq (data) {
  const res = await axios({
    method: 'post',
    url: '/order/newOrderByPurchaseReq',
    data: data
  })
  return res
}
async function saveMainInfo (data) {
  const res = await axios({
    method: 'post',
    url: '/order/saveMainInfo',
    data: data
  })
  return res
}
// 查询合同
async function queryContract (data) {
  const res = await axios({
    method: 'post',
    url: '/order/queryContract',
    data: data
  })
  return res
}
// 查看合同明细
async function queryContractDetailById (data) {
  const res = await axios({
    method: 'post',
    url: '/order/queryContractDetailById',
    data: data
  })
  return res
}
// 按照合同插入表单
async function newOrderByContract (data) {
  const res = await axios({
    method: 'post',
    url: '/order/newOrderByContract',
    data: data
  })
  return res
}
// 查询采购订单详情
async function queryOrderDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/order/queryOrderDetail',
    data: data
  })
  return res
}
export {
  getAllContract,
  getContractId,
  saveContractMain,
  choosePurchaseReq,
  insertContractGoods,
  deleteContractDetail,
  updateContractStatus,
  updateContractGoodsDetail,
  deleteContract,
  queryContractDetail,
  queryAllOrder,
  queryPurReq,
  newOrderByPurchaseReq,
  saveMainInfo,
  queryContract,
  queryContractDetailById,
  newOrderByContract,
  queryOrderDetail
}
