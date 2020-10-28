import axios from 'axios'
// 查询所有物料
async function findAllGoods () {
  const res = await axios({
    method: 'get',
    url: '/goodsInStorage/all'
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
export {
  findAllGoods,
  findAllInventoryOrganization,
  findAllWarehouseByOrganization
}
