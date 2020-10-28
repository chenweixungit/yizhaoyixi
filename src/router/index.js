import Vue from 'vue'
import Router from 'vue-router'
import Login from '../common/Login'
import adminHome from '../views/admin/adminHome'
import adminNavigation from '../components/adminNavigation'
import roleManage from '../views/admin/roleManage'
import userManage from '../views/admin/userManage'
import warehouseManage from '../views/admin/warehouseManage'
import supportManage from '../views/admin/supportManage'
import storageManage from '../views/admin/storageManage'
import organizeManage from '../views/admin/organizeManage'
import measureManage from '../views/admin/measureManage'
import materialManage from '../views/admin/materialManage'
import materialKindManage from '../views/admin/materialKindManage'
import clientManage from '../views/admin/clientManage'
import centerManage from '../views/admin/centerManage'
import brandManage from '../views/admin/brandManage'
import PurchaseRequisition from '../views/NormalUser/PurchaseReq/PurchaseRequisition.vue'
import CreatePurchaseReq from '../views/NormalUser/PurchaseReq/CreatePurchaseReq'
import MaterialRequisition from '../views/NormalUser/MyGoods/MaterialRequisition'
import CreateMaterialReq from '../views/NormalUser/MyGoods/CreateMaterialReq'
import ReturnMaterial from '../views/NormalUser/MyGoods/ReturnMaterial'
import CreateReturnReq from '../views/NormalUser/MyGoods/CreateReturnReq'
import SaleManage from '../views/NormalUser/SaleManagement/SaleManage'
import CreateSaleReq from '../views/NormalUser/SaleManagement/CreateSaleReq'
import SearchGoods from '../views/NormalUser/SearchGoods/SearchGoods'
import Contract from '../views/NormalUser/PurchaseManagement/Contract'
import CreateContract from '../views/NormalUser/PurchaseManagement/CreateContract'
import Order from '../views/NormalUser/PurchaseManagement/Order'
import IntoWarehouse from '../views/NormalUser/MainWarehouse/IntoWarehouse'
import CreatePurchaseInto from '../views/NormalUser/MainWarehouse/CreatePurchaseInto'
import CreateOtherInto from '../views/NormalUser/MainWarehouse/CreateOtherInto'
import ExWarehouse from '../views/NormalUser/MainWarehouse/ExWarehouse'
import InventoryAdjustment from '../views/NormalUser/MainWarehouse/InventoryAdjustment'
import CreateShiftReq from '../views/NormalUser/MainWarehouse/CreateShiftReq'
import CreateInventoryCheck from '../views/NormalUser/MainWarehouse/CreateInventoryCheck'
import CreateInitialInventory from '../views/NormalUser/MainWarehouse/CreateInitialInventory'
import CenterInventoryAdjustment from '../views/NormalUser/CenterWarehouse/CenterInventoryAdjustment'
import CenterCreateShiftReq from '../views/NormalUser/CenterWarehouse/CenterCreateShiftReq'
import CenterCreateTransfer from '../views/NormalUser/CenterWarehouse/CenterCreateTransfer'
import CenterCreateInventoryCheck from '../views/NormalUser/CenterWarehouse/CenterCreateInventoryCheck'
import CenterCreateInitialInventory from '../views/NormalUser/CenterWarehouse/CenterCreateInitialInventory'
import CenterExWarehouse from '../views/NormalUser/CenterWarehouse/CenterExWarehouse'
import CenterIntoWarehouse from '../views/NormalUser/CenterWarehouse/CenterIntoWarehouse'
import CenterCreateOtherInto from '../views/NormalUser/CenterWarehouse/CenterCreateOtherInto'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: Login,
      component: Login
    },
    {
      path: '/admin/adminHome',
      name: adminHome,
      component: adminHome
    },
    {
      path: '/admin/navigation',
      name: adminNavigation,
      component: adminNavigation
    },
    {
      path: '/admin/role',
      name: roleManage,
      component: roleManage
    },
    {
      path: '/admin/user',
      name: userManage,
      component: userManage
    },
    {
      path: '/admin/warehouse',
      name: warehouseManage,
      component: warehouseManage
    },
    {
      path: '/admin/support',
      name: supportManage,
      component: supportManage
    },
    {
      path: '/admin/storage',
      name: storageManage,
      component: storageManage
    },
    {
      path: '/admin/organize',
      name: organizeManage,
      component: organizeManage
    },
    {
      path: '/admin/measure',
      name: measureManage,
      component: measureManage
    },
    {
      path: '/admin/material',
      name: materialManage,
      component: materialManage
    },
    {
      path: '/admin/materialKind',
      name: materialKindManage,
      component: materialKindManage
    },
    {
      path: '/admin/client',
      name: clientManage,
      component: clientManage
    },
    {
      path: '/admin/center',
      name: centerManage,
      component: centerManage
    },
    {
      path: '/admin/brand',
      name: brandManage,
      component: brandManage
    },
    // 请购路由
    {
      path: '/PurchaseReq',
      name: PurchaseRequisition,
      component: PurchaseRequisition
    },
    {
      path: '/CreatePurchaseReq',
      name: CreatePurchaseReq,
      component: CreatePurchaseReq
    },
    // 我的物资路由
    {
      path: '/MaterialReq',
      name: MaterialRequisition,
      component: MaterialRequisition
    },
    {
      path: '/CreateMaterialReq',
      name: CreateMaterialReq,
      component: CreateMaterialReq
    },
    {
      path: '/ReturnMaterial',
      name: ReturnMaterial,
      component: ReturnMaterial
    },
    {
      path: '/CreateReturnReq',
      name: CreateReturnReq,
      component: CreateReturnReq
    },
    // 采购路由
    {
      path: '/Contract',
      name: Contract,
      component: Contract
    },
    {
      path: '/CreateContract',
      name: CreateContract,
      component: CreateContract
    },
    {
      path: '/Order',
      name: Order,
      component: Order
    },
    // 总仓管理路由
    {
      path: '/IntoWarehouse',
      name: IntoWarehouse,
      component: IntoWarehouse
    },
    {
      path: '/CreatePurchaseInto',
      name: CreatePurchaseInto,
      component: CreatePurchaseInto
    },
    {
      path: '/CreateOtherInto',
      name: CreateOtherInto,
      component: CreateOtherInto
    },
    {
      path: '/ExWarehouse',
      name: ExWarehouse,
      component: ExWarehouse
    },
    {
      path: '/InventoryAdjustment',
      name: InventoryAdjustment,
      component: InventoryAdjustment
    },
    {
      path: '/CreateShiftReq',
      name: CreateShiftReq,
      component: CreateShiftReq
    },
    {
      path: '/CreateInventoryCheck',
      name: CreateInventoryCheck,
      component: CreateInventoryCheck
    },
    {
      path: '/CreateInitialInventory',
      name: CreateInitialInventory,
      component: CreateInitialInventory
    },
    // 中心库存管理
    {
      path: '/CenterInventoryAdjustment',
      name: CenterInventoryAdjustment,
      component: CenterInventoryAdjustment
    },
    {
      path: '/CenterCreateShiftReq',
      name: CenterCreateShiftReq,
      component: CenterCreateShiftReq
    },
    {
      path: '/CenterCreateTransfer',
      name: CenterCreateTransfer,
      component: CenterCreateTransfer
    },
    {
      path: '/CenterCreateInventoryCheck',
      name: CenterCreateInventoryCheck,
      component: CenterCreateInventoryCheck
    },
    {
      path: '/CenterCreateInitialInventory',
      name: CenterCreateInitialInventory,
      component: CenterCreateInitialInventory
    },
    {
      path: '/CenterExWarehouse',
      name: CenterExWarehouse,
      component: CenterExWarehouse
    },
    {
      path: '/CenterIntoWarehouse',
      name: CenterIntoWarehouse,
      component: CenterIntoWarehouse
    },
    {
      path: '/CenterCreateOtherInto',
      name: CenterCreateOtherInto,
      component: CenterCreateOtherInto
    },
    // 销售管理
    {
      path: '/saleManage',
      name: SaleManage,
      component: SaleManage
    },
    {
      path: '/CreateSaleReq',
      name: CreateSaleReq,
      component: CreateSaleReq
    },
    // 物料查询
    {
      path: '/SearchGoods',
      name: SearchGoods,
      component: SearchGoods
    }
  ]
})
