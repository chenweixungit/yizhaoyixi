import axios from 'axios'

async function userLogin (data) {
  const res = await axios({
    method: 'post',
    url: '/user/login',
    data: data
  })
  return res
}
// 查询所有品牌
async function findAllBrand (data) {
  const res = await axios({
    method: 'get',
    url: '/brand/all',
    data: data
  })
  return res
}
// 添加新品牌
async function createNewBrand (data) {
  const res = await axios({
    method: 'post',
    url: '/brand/newBrand',
    data: data
  })
  return res
}
// 品牌启用
async function enableBrand (data) {
  const res = await axios({
    method: 'post',
    url: '/brand/enableBrand',
    data: data
  })
  return res
}
// 品牌停用
async function stopBrand (data) {
  const res = await axios({
    method: 'post',
    url: '/brand/stopBrand',
    data: data
  })
  return res
}
// 编辑品牌
async function updateBrandDetail (data) {
  const res = await axios({
    method: 'post',
    url: '/brand/updateBrandDetail',
    data: data
  })
  return res
}
// 删除品牌
async function deleteBrand (data) {
  const res = await axios({
    method: 'post',
    url: '/brand/deleteBrand',
    data: data
  })
  return res
}
// 查询所有用户
async function findAllUser (data) {
  const res = await axios({
    method: 'get',
    url: 'user/all',
    data: data
  })
  return res
}
// 修改密码
async function changePassword (data) {
  const res = await axios({
    method: 'post',
    url: 'user/changePassword',
    data: data
  })
  return res
}
// 停用用户
async function stopUser (data) {
  const res = await axios({
    method: 'post',
    url: 'user/stop',
    data: data
  })
  return res
}
// 启用用户
async function enableUser (data) {
  const res = await axios({
    method: 'post',
    url: 'user/enable',
    data: data
  })
  return res
}
// 删除用户
async function deleteUser (data) {
  const res = await axios({
    method: 'post',
    url: '/user/delete',
    data: data
  })
  return res
}
// 添加用户
async function addUser (data) {
  const res = await axios({
    method: 'post',
    url: '/user/add',
    data: data
  })
  return res
}
// 更新用户
async function updateUser (data) {
  const res = await axios({
    method: 'post',
    url: '/user/update',
    data: data
  })
  return res
}
// 查询所有角色
async function findAllRole (data) {
  const res = await axios({
    method: 'get',
    url: 'role/all',
    data: data
  })
  return res
}
// 添加角色
async function insertRole (data) {
  const res = await axios({
    method: 'post',
    url: 'role/insert',
    data: data
  })
  return res
}
// 修改角色
async function updateRole (data) {
  const res = await axios({
    method: 'post',
    url: 'role/update',
    data: data
  })
  return res
}
// 停用角色
async function stopRole (data) {
  const res = await axios({
    method: 'post',
    url: 'role/stop',
    data: data
  })
  return res
}
// 启用角色
async function enableRole (data) {
  const res = await axios({
    method: 'post',
    url: 'role/enable',
    data: data
  })
  return res
}
// 删除角色
async function deleteRole (data) {
  const res = await axios({
    method: 'post',
    url: '/role/delete',
    data: data
  })
  return res
}
// 查询所有中心
async function findAllCenter (data) {
  const res = await axios({
    method: 'get',
    url: 'center/all',
    data: data
  })
  return res
}
// 新建中心
async function insertCenter (data) {
  const res = await axios({
    method: 'post',
    url: 'center/newCenter',
    data: data
  })
  return res
}
// 修改中心
async function updateCenter (data) {
  const res = await axios({
    method: 'post',
    url: 'center/updateCenterDetail',
    data: data
  })
  return res
}
// 停用中心
async function stopCenter (data) {
  const res = await axios({
    method: 'post',
    url: 'center/stopCenter',
    data: data
  })
  return res
}
// 启用中心
async function startCenter (data) {
  const res = await axios({
    method: 'post',
    url: 'center/startCenter',
    data: data
  })
  return res
}
// 删除中心
async function deleteCenter (data) {
  const res = await axios({
    method: 'post',
    url: '/center/deleteCenter',
    data: data
  })
  return res
}
// 查询所有客户
async function findAllCustomer (data) {
  const res = await axios({
    method: 'get',
    url: 'customer/all',
    data: data
  })
  return res
}
// 新增客户
async function insertCustomer (data) {
  const res = await axios({
    method: 'post',
    url: 'customer/newCustomer',
    data: data
  })
  return res
}
// 修改客户
async function updateCustomer (data) {
  const res = await axios({
    method: 'post',
    url: 'customer/updateCustomerDetail',
    data: data
  })
  return res
}
// 停用客户
async function stopCustomer (data) {
  const res = await axios({
    method: 'post',
    url: 'customer/stopCustomer',
    data: data
  })
  return res
}
// 启用客户
async function enableCustomer (data) {
  const res = await axios({
    method: 'post',
    url: 'customer/enableCustomer',
    data: data
  })
  return res
}
// 删除客户
async function deleteCustomer (data) {
  const res = await axios({
    method: 'post',
    url: '/customer/deleteCustomer',
    data: data
  })
  return res
}
// 查询所有物料类别
async function findAllGoodsType (data) {
  const res = await axios({
    method: 'get',
    url: 'goodstype/all',
    data: data
  })
  return res
}
// 停用物料类别
async function stopGoodsType (data) {
  const res = await axios({
    method: 'post',
    url: 'goodstype/stopgoodstype',
    data: data
  })
  return res
}
// 启用物料类别
async function enableGoodsType (data) {
  const res = await axios({
    method: 'post',
    url: 'goodstype/enablegoodstype',
    data: data
  })
  return res
}
// 删除物料类别
async function deleteGoodsType (data) {
  const res = await axios({
    method: 'post',
    url: '/goodstype/deleteonegoodstype',
    data: data
  })
  return res
}
// 查询所有物料
async function findAllGoods (data) {
  const res = await axios({
    method: 'get',
    url: 'goods/all',
    data: data
  })
  return res
}
// 停用物料
async function stopGoods (data) {
  const res = await axios({
    method: 'post',
    url: 'goods/stopgoods',
    data: data
  })
  return res
}
// 启用物料
async function enableGoods (data) {
  const res = await axios({
    method: 'post',
    url: 'goods/enablegoods',
    data: data
  })
  return res
}
// 删除物料
async function deleteGoods (data) {
  const res = await axios({
    method: 'post',
    url: '/goods/deletegoodsbycode',
    data: data
  })
  return res
}
// 查询所有计量单位
async function findAllMeasurement (data) {
  const res = await axios({
    method: 'get',
    url: 'measurement/all',
    data: data
  })
  return res
}
// 添加计量单位
async function insertMeasurement (data) {
  const res = await axios({
    method: 'post',
    url: 'measurement/newMeasurement',
    data: data
  })
  return res
}
// 修改计量单位
async function updateMeasurement (data) {
  const res = await axios({
    method: 'post',
    url: 'measurement/updateMeasurement',
    data: data
  })
  return res
}
// 停用计量单位
async function stopMeasurement (data) {
  const res = await axios({
    method: 'post',
    url: 'measurement/stopmeasurementstatus',
    data: data
  })
  return res
}
// 启用计量单位
async function enableMeasurement (data) {
  const res = await axios({
    method: 'post',
    url: 'measurement/enablemeasurementstatus',
    data: data
  })
  return res
}
// 删除计量单位
async function deleteMeasurement (data) {
  const res = await axios({
    method: 'post',
    url: '/measurement/deleteMeasurement',
    data: data
  })
  return res
}
// 查询所有库存组织
async function findAllInventoryOrganization (data) {
  const res = await axios({
    method: 'get',
    url: 'inventoryOrganization/all',
    data: data
  })
  return res
}
// 新建库存组织
async function insertInventoryOrganization (data) {
  const res = await axios({
    method: 'post',
    url: 'inventoryOrganization/newInventoryOrganization',
    data: data
  })
  return res
}
// 修改库存组织
async function updateInventoryOrganizationDetail (data) {
  const res = await axios({
    method: 'post',
    url: 'inventoryOrganization/updateInventoryOrganizationDetail',
    data: data
  })
  return res
}
// 停用库存组织
async function stopInveOran (data) {
  const res = await axios({
    method: 'post',
    url: 'inventoryOrganization/stopInveOran',
    data: data
  })
  return res
}
// 启用库存组织
async function enableInveOran (data) {
  const res = await axios({
    method: 'post',
    url: 'inventoryOrganization/enableInveOran',
    data: data
  })
  return res
}
// 删除库存组织
async function deleteInventoryOrganization (data) {
  const res = await axios({
    method: 'post',
    url: '/inventoryOrganization/delete',
    data: data
  })
  return res
}
// 查询所有仓库
async function findAllStorage (data) {
  const res = await axios({
    method: 'get',
    url: 'storage/all',
    data: data
  })
  return res
}
// 停用仓库
async function stopStorage (data) {
  const res = await axios({
    method: 'post',
    url: 'storage/stopStorage',
    data: data
  })
  return res
}
// 启用仓库
async function startStorage (data) {
  const res = await axios({
    method: 'post',
    url: 'storage/startStorage',
    data: data
  })
  return res
}
// 删除仓库
async function deleteStorage (data) {
  const res = await axios({
    method: 'post',
    url: '/storage/deleteStorage',
    data: data
  })
  return res
}
// 查询所有供应商
async function findAllSupplier (data) {
  const res = await axios({
    method: 'get',
    url: 'supplier/all',
    data: data
  })
  return res
}
// 新建供应商
async function insertSupplier (data) {
  const res = await axios({
    method: 'post',
    url: 'supplier/newSupplier',
    data: data
  })
  return res
}
// 修改供应商
async function updateSupplier (data) {
  const res = await axios({
    method: 'post',
    url: 'supplier/updateSupplierDetail',
    data: data
  })
  return res
}
// 停用供应商
async function stopSupplier (data) {
  const res = await axios({
    method: 'post',
    url: 'supplier/stop',
    data: data
  })
  return res
}
// 启用供应商
async function enableSupplier (data) {
  const res = await axios({
    method: 'post',
    url: 'supplier/enable',
    data: data
  })
  return res
}
// 删除供应商
async function deleteSupplier (data) {
  const res = await axios({
    method: 'post',
    url: '/supplier/deleteSupplier',
    data: data
  })
  return res
}
// 查询所有部门
async function findAllDepartment (data) {
  const res = await axios({
    method: 'get',
    url: 'department/all',
    data: data
  })
  return res
}
// 停用部门
async function stopDepartment (data) {
  const res = await axios({
    method: 'post',
    url: 'department/stopdepartment',
    data: data
  })
  return res
}
// 启用部门
async function enableDepartment (data) {
  const res = await axios({
    method: 'post',
    url: 'department/enabledepartment',
    data: data
  })
  return res
}
// 删除部门
async function deleteDepartment (data) {
  const res = await axios({
    method: 'post',
    url: '/department/deletedepartmentbyid',
    data: data
  })
  return res
}

export {
  userLogin,
  findAllBrand,
  createNewBrand,
  stopBrand,
  enableBrand,
  updateBrandDetail,
  deleteBrand,
  // 用户
  findAllUser,
  changePassword,
  stopUser,
  enableUser,
  deleteUser,
  addUser,
  updateUser,
  // 角色
  findAllRole,
  insertRole,
  updateRole,
  stopRole,
  enableRole,
  deleteRole,
  // 中心
  findAllCenter,
  insertCenter,
  updateCenter,
  stopCenter,
  startCenter,
  deleteCenter,
  // 客户
  findAllCustomer,
  insertCustomer,
  updateCustomer,
  stopCustomer,
  enableCustomer,
  deleteCustomer,
  // 物料类别
  findAllGoodsType,
  stopGoodsType,
  enableGoodsType,
  deleteGoodsType,
  // 物料
  findAllGoods,
  stopGoods,
  enableGoods,
  deleteGoods,
  // 计量单位
  findAllMeasurement,
  insertMeasurement,
  updateMeasurement,
  stopMeasurement,
  enableMeasurement,
  deleteMeasurement,
  // 库存组织
  findAllInventoryOrganization,
  insertInventoryOrganization,
  updateInventoryOrganizationDetail,
  stopInveOran,
  enableInveOran,
  deleteInventoryOrganization,
  // 仓库
  findAllStorage,
  stopStorage,
  startStorage,
  deleteStorage,
  // 供应商
  findAllSupplier,
  insertSupplier,
  updateSupplier,
  stopSupplier,
  enableSupplier,
  deleteSupplier,
  // 部门
  findAllDepartment,
  stopDepartment,
  enableDepartment,
  deleteDepartment

}
