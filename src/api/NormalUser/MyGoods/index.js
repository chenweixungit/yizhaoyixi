import axios from 'axios'
// 查询所有物资申请单信息
async function getAllMaterialReq () {
  const res = await axios({
    method: 'get',
    url: '/goodsrequisition/all'
  })
  return res
}
// 新增物资申请单
async function addgoodsrequisition () {
  const res = await axios({
    method: 'get',
    url: '/goodsrequisition/addgoodsrequisition'
  })
  return res
}
// 保存主明细数据
async function updategoodsrequisition (data) {
  const res = await axios({
    method: 'post',
    url: '/goodsrequisition/updategoodsrequisition',
    data: data
  })
  return res
}
// 查询物资信息
async function querygoodsincenter (data) {
  const res = await axios({
    method: 'post',
    url: '/goodsrequisitiondetail/querygoodsincenter',
    data: data
  })
  return res
}
// 将物资插入物资申请单列表
async function insertGoods (data) {
  const res = await axios({
    method: 'post',
    url: '/goodsrequisitiondetail/addOneGoodsDetail',
    data: data
  })
  return res
}
export {
  getAllMaterialReq,
  addgoodsrequisition,
  updategoodsrequisition,
  querygoodsincenter,
  insertGoods
}
