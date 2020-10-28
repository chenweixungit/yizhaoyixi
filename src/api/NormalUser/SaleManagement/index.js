import axios from 'axios'

async function findAllSale () {
  const res = await axios({
    method: 'get',
    url: '/sale/all'
  })
  return res
}

async function findSaleByCode (data) {
  const res = await axios({
    method: 'post',
    url: '/saleDetail/queryBySaleCode',
    data: data
  })
  return res
}
async function findAllInventoryOrganization () {
  const res = await axios({
    method: 'get',
    url: '/inventoryOrganization/all'
  })
  return res
}
async function findAllWarehouseByOrganization (data) {
  const res = await axios({
    method: 'post',
    url: '/storage/queryByInveOranName',
    data: data
  })
  return res
}

async function UpdateSaleOrder (data) {
  const res = await axios({
    method: 'post',
    url: '/sale/updateSale',
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
async function findAllCustomers () {
  const res = await axios({
    method: 'get',
    url: '/customer/all'
  })
  return res
}
async function saveSale (data) {
  const res = await axios({
    method: 'post',
    url: '/sale/saveSale',
    data: data
  })
  return res
}
async function updateSale (data) {
  const res = await axios({
    method: 'post',
    url: '/sale/updateSale',
    data: data
  })
  return res
}
async function updateSaleDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/sale/updateSaleDetail',
    data: data
  })
  return res
}
// 确认选中物料按钮
async function saveSaleDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/sale/saveSaleDetail',
    data: data
  })
  return res
}
async function submitUpdateSale (data) {
  const res = await axios({
    method: 'post',
    url: '/sale/submitUpdateSale',
    data: data
  })
  return res
}
async function submitUpdateSaleDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/sale/submitUpdateSaleDetail',
    data: data
  })
  return res
}
async function deleteByCode (data) {
  const res = await axios({
    method: 'post',
    url: '/sale/deleteByCode',
    data: data
  })
  return res
}
export {
  findAllSale,
  findSaleByCode,
  findAllInventoryOrganization,
  findAllWarehouseByOrganization,
  UpdateSaleOrder,
  findAllGoodsInOneStorage,
  findAllCustomers,
  saveSale,
  updateSale,
  updateSaleDetail,
  submitUpdateSale,
  submitUpdateSaleDetail,
  saveSaleDetail,
  deleteByCode
}
