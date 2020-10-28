export default {
  changeTabSelection ({commit}, data) {
    commit('changeTabSelection', data)
  },
  changeActiveIndex ({commit}, data) {
    commit('changeActiveIndex', data)
  },
  changeIASelection ({commit}, data) {
    commit('changeIASelection', data)
  },
  changeUserInfo ({commit}, data) {
    commit('changeUserInfo', data)
  },
  getSaleOrderData ({commit}, data) {
    commit('getSaleOrderData', data)
  },
  setSaleOrderState ({commit}, data) {
    commit('setSaleOrderState', data)
  },
  setCurrentSaleOrder ({commit}, data) {
    commit('setCurrentSaleOrder', data)
  },
  setCurrentSaleOrderDetail ({commit}, data) {
    commit('setCurrentSaleOrderDetail', data)
  },
  setNewSaleOrder ({commit}, data) {
    commit('setNewSaleOrder', data)
  },
  setAllInventoryOrganizations ({commit}, data) {
    commit('setAllInventoryOrganizations', data)
  },
  setInventoryTransferState ({commit}, data) {
    commit('setInventoryTransferState', data)
  },
  setNewTransferReq ({commit}, data) {
    commit('setNewTransferReq', data)
  },
  setCurrentInventoryCheck ({commit}, data) {
    commit('setCurrentInventoryCheck', data)
  },
  setInventoryCheckState ({commit}, data) {
    commit('setInventoryCheckState', data)
  },
  setCenterOtherInState ({commit}, data) {
    commit('setCenterOtherInState', data)
  },
  setCenterOtherInHead ({commit}, data) {
    commit('setCenterOtherInHead', data)
  },
  // 改变请购状态
  changePurchaseState ({commit}, data) {
    commit('changePurchaseState', data)
  },
  changePurchaseReq ({commit}, data) {
    commit('changePurchaseReq', data)
  },
  changePurchaseGoods ({commit}, data) {
    commit('changePurchaseGoods', data)
  },
  // 采购合同状态
  changeContractState ({commit}, data) {
    commit('changeContractState', data)
  },
  changeContractMain ({commit}, data) {
    commit('changeContractMain', data)
  },
  changeContractGoods ({commit}, data) {
    commit('changeContractGoods', data)
  },
  // 采购入库状态
  changePurchaseIntoState ({commit}, data) {
    commit('changePurchaseIntoState', data)
  },
  changePurchaseIntoMain ({commit}, data) {
    commit('changePurchaseIntoMain', data)
  },
  changePurchaseIntoDetail ({commit}, data) {
    commit('changePurchaseIntoDetail', data)
  },
  // 期初库存
  changeInitState ({commit}, data) {
    commit('changeInitState', data)
  },
  changeInitMain ({commit}, data) {
    commit('changeInitMain', data)
  },
  changeInitDetail ({commit}, data) {
    commit('changeInitDetail', data)
  }
}
