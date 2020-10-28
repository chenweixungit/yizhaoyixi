export default {
  changeTabSelection (state, data) {
    state.tabSelection = data
  },
  changeActiveIndex (state, data) {
    state.activeIndex = data
  },
  changeIASelection (state, data) {
    state.IASelection = data
  },
  changeUserInfo (state, data) {
    state.userInfo = data
  },
  getSaleOrderData (state, data) {
    state.saleOrderData = data
  },
  setSaleOrderState (state, data) {
    state.saleOrderState = data
  },
  setCurrentSaleOrder (state, data) {
    state.currentSaleOrder = data
  },
  setCurrentSaleOrderDetail (state, data) {
    state.currentSaleOrderDetail = data
  },
  setNewSaleOrder (state, data) {
    state.newSaleOrder = data
  },
  setAllInventoryOrganizations (state, data) {
    state.allInventoryOrganizations = data
  },
  setInventoryTransferState (state, data) {
    state.inventoryTransferState = data
  },
  setNewTransferReq (state, data) {
    state.newTransferReq = data
  },
  setCurrentInventoryCheck (state, data) {
    state.currentInventoryCheck = data
  },
  setInventoryCheckState (state, data) {
    state.inventoryCheckState = data
  },
  setCenterOtherInState (state, data) {
    state.centerOtherInState = data
  },
  setCenterOtherInHead (state, data) {
    state.centerOtherInHead = data
  },
  // 改变请购状态
  changePurchaseState (state, data) {
    state.purchaseState = data
  },
  changePurchaseReq (state, data) {
    state.purchaseReq = data
  },
  changePurchaseGoods (state, data) {
    state.purchaseGoods = data
  },
  // 采购合同状态
  changeContractState (state, data) {
    state.contractState = data
  },
  changeContractMain (state, data) {
    state.contractMain = data
  },
  changeContractGoods (state, data) {
    state.contractGoods = data
  },
  // 采购入库状态
  changePurchaseIntoState (state, data) {
    state.purchaseIntoState = data
  },
  changePurchaseIntoMain (state, data) {
    state.purchaseIntoMain = data
  },
  changePurchaseIntoDetail (state, data) {
    state.purchaseIntoDetail = data
  },
  // 期初库存
  changeInitState (state, data) {
    state.initState = data
  },
  changeInitMain (state, data) {
    state.initMain = data
  },
  changeInitDetail (state, data) {
    state.initDetail = data
  }

}
