<template>
  <div>
    <navgation-bar></navgation-bar>
    <Block><el-button type="success" id="back" @click="turnBack">返回</el-button></Block>
    <card id="select-area">
      <el-form :inline="true" ref="form" :model="OrderForm" label-width="80px">
        <el-form-item label="库存组织" >
          <el-select @click="changeWarehouse" placeholder="请选择库存组织" class="selector" v-model="OrderForm.inventoryOrganizationName">
            <el-option v-for="(item,index) in organizations" :key="index" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发货仓" >
          <el-select placeholder="请选择发货仓" class="selector" v-model="OrderForm.storageName">
            <el-option v-for="(item,index) in warehouses" :key="index" :value="item.storageName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单类型" >
          <el-select placeholder="请选择需求类型" class="selector" v-model="OrderForm.saleType">
            <el-option label="普通发票" value="普通发票"></el-option>
            <el-option label="退换货" value="退换货"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户" >
          <el-select placeholder="请选择客户" class="selector" v-model="OrderForm.customerName">
            <el-option v-for="(item,index) in customers" :key="index" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单日期" >
            <el-date-picker class="selector" value-format="yyyy-MM-dd" type="date" placeholder="请选择日期" v-model="OrderForm.saleDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="创建人" >
          <el-input placeholder="请选择创建人" class="selector" v-model="OrderForm.creatorName"></el-input>
        </el-form-item >
        <el-form-item label="创建时间" >
          <el-date-picker class="selector" type="datetime" placeholder="选择日期时间" default-time="12:00:00" v-model="OrderForm.createDate">
          </el-date-picker>
        </el-form-item>
        <el-form-item >
          <el-input type="textarea" :rows="3" class="remark" placeholder="备注" v-model="OrderForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button type="primary" @click="saveOrder">保存</el-button>
      </div>
    </card>
    <card id="material-area">
      <block><el-button type="success" @click="showAllGoods">选择销售物料</el-button></block>
      <!--      显示已选中的物料，修改数量-->
      <el-table :data="choosedGoods" style="width: 100%">
        <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" width="100px"></el-table-column>
        <el-table-column prop="specification" label="规格" width="100px"></el-table-column>
        <el-table-column prop="modelType" label="型号" width="100px"></el-table-column>
        <el-table-column prop="measurementName" label="单位" width="100px"></el-table-column>
        <el-table-column prop="" label="请购数量" width="150px">
          <template v-slot="slotProps">
            <el-input-number size="mini" v-model="slotProps.row.amount" width="90px" controls-position="right" :min="1"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="taxRate" label="税率" width="150px">
          <template v-slot="slotProps">
            <el-input-number size="mini" v-model="slotProps.row.taxRate" width="90px" controls-position="right" :min="13" :max="16"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="hasTaxPrice" label="含税单价" width="150px">
          <template v-slot="slotProps">
            <el-input-number size="mini" v-model="slotProps.row.hasTaxPrice" width="90px" controls-position="right" :min="1"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="noTaxPrice" label="无税单价" width="100px">
          <template v-slot="slotProps">
            {{slotProps.row.noTaxPrice=(slotProps.row.hasTaxPrice / (1.0 + slotProps.row.taxRate / 100.0)).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="hasTaxMoney" label="含税金额" width="100px">
          <template v-slot="slotProps">
            {{slotProps.row.hasTaxMoney = (slotProps.row.hasTaxPrice * slotProps.row.amount).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="noTaxMoney" label="无税金额" width="100px">
          <template v-slot="slotProps">
            {{slotProps.row.noTaxMoney = (slotProps.row.noTaxPrice * slotProps.row.amount).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="taxMoney" label="税额" width="100px">
          <template v-slot="slotProps">
            {{slotProps.row.taxMoney = (slotProps.row.hasTaxMoney - slotProps.row.noTaxMoney).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="150px">
          <template v-slot="slotProps">
            <el-input size="mini" v-model="slotProps.row.remark"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="chooseTablePagesize"
          :current-page="chooseTablwCurrentPage"
          :total="choosedGoods.length"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <el-button type="primary" class="operation-btn" @click="toSaveSaleDetail">保存</el-button>
      <el-button type="primary" class="operation-btn" @click="submitData">提交</el-button>
      <el-button type="danger" class="operation-btn" @click="cancelOrder">取消</el-button>
    </card>
    <!--      选择物料弹框-->
    <el-dialog title="请选择请购物料" :visible.sync="dialogVisible" width="80%">
      <el-input placeholder="物料名称/规格/型号" v-model="searchInfo" class="search-input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div id="dialog-table">
        <el-table :data="tableData" ref="multipleTable" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="50px"></el-table-column>
          <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称" width="100px"></el-table-column>
          <el-table-column prop="goodsTypeName" label="物料类别" width="100px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="100px"></el-table-column>
          <el-table-column prop="modelType" label="型号"></el-table-column>
          <el-table-column prop="measurementName" label="单位"></el-table-column>
          <el-table-column prop="inventoryAttributes" label="存货属性"></el-table-column>
          <el-table-column prop="amount" label="库存量"></el-table-column>
          <el-table-column prop="hasTaxPrice" label="含税单价"></el-table-column>
          <el-table-column prop="storageMoney" label="含税总额"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :page-size="tablePageSize"
          :curren-page="tableCurrentPage"
          :total="tableData.length"
          class="dialog-pagination">
        </el-pagination>
        <el-button type="primary" @click="chooseList">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="确认取消创建" :visible.sync="cancelDialogVisible" width="30%" center>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="turnBack">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NavgationBar from '../../../components/NavgationBar'
import Card from '../../../components/Card'
import Block from '../../../components/Block'
import {
  findAllInventoryOrganization,
  UpdateSaleOrder,
  findSaleByCode,
  findAllGoodsInOneStorage,
  findAllWarehouseByOrganization, findAllCustomers,
  updateSale, updateSaleDetail, submitUpdateSale, submitUpdateSaleDetail,
  saveSaleDetail, deleteByCode
} from '../../../api/NormalUser/SaleManagement'
import store from '../../../store/store'
export default {
  name: 'CreateSaleReq',
  components: {
    NavgationBar,
    Card,
    Block
  },
  beforeMount () {
    this.OrderForm.creatorName = store.state.userInfo.username
    let _this = this
    // 获取所有库存组织
    const allInventroyOrganization = findAllInventoryOrganization()
    allInventroyOrganization.then(function (e) {
      _this.organizations = e.data.data
    })
    const response = findAllCustomers()
    response.then(function (e) {
      _this.customers = e.data.data
    })
    // 0 表示新建页面，1表示编辑界面
    if (store.state.saleOrderState === 1) {
      console.log(store.state.currentSaleOrder.saleCode)
      this.OrderForm = store.state.currentSaleOrder
      let _this = this
      let searchParam = {saleCode: store.state.currentSaleOrder.saleCode}
      const response = findSaleByCode(searchParam)
      response.then(function (e) {
        _this.choosedGoods = e.data.data
      })
    }
  },
  computed: {
    total () {
      return this.tableData.length
    },
    tableData () {
      const search = this.searchInfo
      if (search) {
        return this.goods.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.goods
    }
  },
  data () {
    return {
      tablePageSize: 6,
      tableCurrentPage: 1,
      dialogVisible: false,
      cancelDialogVisible: false,
      searchInfo: '',
      // 点击保存按钮提交的表单
      OrderForm: {
        inventoryOrganizationName: '',
        saleType: '',
        customerName: '',
        storageName: '',
        saleDate: '',
        creatorName: '',
        createDate: '',
        statusName: '',
        remark: ''
      },
      storageCode: '',
      // 下拉框中的库存组织
      organizations: [],
      // 下拉框中的仓库
      warehouses: [],
      // 下拉框中的客户
      customers: [],
      // 物料单
      goods: [],
      // 销售单里选中的数据
      choosedGoods: [],
      // 选择销售物料table
      chooseTablePagesize: 6,
      chooseTablwCurrentPage: 1,
      // 弹框table信息
      pageSize: 6,
      currentPage: 1,
      // 用于提交的订单的明细
      commitData: []
    }
  },
  watch: {
    'OrderForm.inventoryOrganizationName': {
      handler (newName, oldName) {
        console.log(newName)
        let _this = this
        let Para = {inventoryOrganizationName: newName}
        const response = findAllWarehouseByOrganization(Para)
        response.then(function (e) {
          _this.warehouses = e.data.data
        })
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    turnBack () {
      this.$router.push('/saleManage')
      this.$router.dispatch('setSaleOrderState', 0)
    },
    // 保存订单字头
    saveOrder () {
      // 0新建订单
      let _this = this
      if (store.state.saleOrderState === 0) {
        let now = this.getDate(this.OrderForm.createDate)
        let Para = {id: store.state.newSaleOrder.id,
          saleCode: store.state.newSaleOrder.saleCode,
          inventoryOrganizationName: this.OrderForm.inventoryOrganizationName,
          saleType: this.OrderForm.saleType,
          customerName: this.OrderForm.customerName,
          storageName: this.OrderForm.storageName,
          saleDate: this.OrderForm.saleDate,
          creatorName: this.OrderForm.creatorName,
          createDate: now,
          statusName: this.OrderForm.statusName,
          remark: this.OrderForm.remark}
        console.log(Para)
        const response = updateSale(Para)
        response.then(function (e) {
          if (e.data.code === 0) {
            _this.$message({
              message: '保存成功',
              type: 'success'
            })
          }
        })
      } else if (store.state.saleOrderState === 1) {
        let newSaleOrder = store.state.currentSaleOrder
        newSaleOrder.inventoryOrganizationName = this.OrderForm.inventoryOrganizationName
        newSaleOrder.saleType = this.OrderForm.saleType
        newSaleOrder.customerName = this.OrderForm.customerName
        newSaleOrder.storageName = this.OrderForm.storageName
        newSaleOrder.saleDate = this.OrderForm.saleDate
        newSaleOrder.creatorName = this.OrderForm.creatorName
        newSaleOrder.createDate = this.OrderForm.createDate
        newSaleOrder.remark = this.OrderForm.remark
        const response = UpdateSaleOrder(newSaleOrder)
        response.then(function (e) {
          if (e.data.code === 0) {
            _this.$message({
              message: '保存成功',
              type: 'success'
            })
          }
        })
      }
    },
    // 选中物料之后的确认按钮
    chooseList () {
      this.dialogVisible = false
      // 获取选中的数据
      let newList = this.$refs.multipleTable.selection
      let para = []
      for (let i = 0; i < newList.length; i++) {
        let temp = {}
        if (store.state.saleOrderState === 1) {
          temp.saleCode = store.state.currentSaleOrder.saleCode
        } else {
          temp.saleCode = store.state.newSaleOrder.saleCode
        }
        temp.goodsCode = newList[i].goodsCode
        temp.goodsName = newList[i].goodsName
        temp.specification = newList[i].specification
        temp.modelType = newList[i].modelType
        temp.measurementName = newList[i].measurementName
        temp.remark = ''
        para.push(temp)
        this.choosedGoods.push(newList[i])
      }
      console.log(para)
      console.log(this.choosedGoods)
      const response = saveSaleDetail(para)
      response.then(function (e) {
        console.log('写入数据成功')
        if (e.data.message === '成功') {
          console.log('写入数据成功')
        }
      })
    },
    showAllGoods () {
      let _this = this
      this.dialogVisible = true
      for (let i = 0; i < this.warehouses.length; i++) {
        if (this.OrderForm.storageName === this.warehouses[i].storageName) {
          this.storageCode = this.warehouses[i].storageCode
        }
      }
      let Para = {storageCode: this.storageCode}
      const response = findAllGoodsInOneStorage(Para)
      response.then(function (e) {
        console.log(e.data.data)
        _this.goods = e.data.data
      })
    },
    // 根据库存组织选择仓库
    changeWarehouse () {
      let Para = {inventoryOrganizationName: this.OrderForm.inventoryOrganizationName}
      const response = findAllWarehouseByOrganization(Para)
      response.then(function (e) {
        console.log(e.data)
      })
    },
    handleCurrentChange (value) {
      this.currentPage = value
    },
    // 保存订单明细
    toSaveSaleDetail () {
      let _this = this
      let para = []
      for (let i = 0; i < this.choosedGoods.length; i++) {
        let temp = {}
        if (store.state.saleOrderState === 1) {
          temp.id = store.state.currentSaleOrder.id
          temp.saleCode = store.state.currentSaleOrder.saleCode
        } else {
          temp.id = store.state.newSaleOrder.id
          temp.saleCode = store.state.newSaleOrder.saleCode
        }
        temp.goodsCode = this.choosedGoods[i].goodsCode
        temp.goodsName = this.choosedGoods[i].goodsName
        temp.specification = this.choosedGoods[i].specification
        temp.modelType = this.choosedGoods[i].modelType
        temp.measurementName = this.choosedGoods[i].measurementName
        temp.amount = this.choosedGoods[i].amount
        temp.taxRate = this.choosedGoods[i].taxRate
        temp.hasTaxPrice = parseFloat(this.choosedGoods[i].hasTaxPrice)
        temp.noTaxPrice = parseFloat(this.choosedGoods[i].noTaxPrice)
        temp.hasTaxMoney = parseFloat(this.choosedGoods[i].hasTaxMoney)
        temp.noTaxMoney = parseFloat(this.choosedGoods[i].noTaxMoney)
        temp.taxMoney = parseFloat(this.choosedGoods[i].taxMoney)
        temp.remark = this.choosedGoods[i].remark
        para.push(temp)
        console.log(temp)
      }
      console.log(para)
      const response = updateSaleDetail(para)
      response.then(function (e) {
        _this.$router.push('/saleManage')
        if (e.data.code === 0) {
          _this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },
    // 提交按钮
    submitData () {
      let _this = this
      if (store.state.saleOrderState === 0) {
        let Para = {id: store.state.newSaleOrder.id,
          saleCode: store.state.newSaleOrder.saleCode,
          inventoryOrganizationName: this.OrderForm.inventoryOrganizationName,
          saleType: this.OrderForm.saleType,
          customerName: this.OrderForm.customerName,
          storageName: this.OrderForm.storageName,
          saleDate: this.OrderForm.saleDate,
          creatorName: this.OrderForm.creatorName,
          createDate: this.getDate(this.OrderForm.createDate),
          statusName: '',
          remark: this.remark}
        console.log(Para)
        const response1 = submitUpdateSale(Para)
        response1.then(function (e) {
          let para = []
          for (let i = 0; i < _this.choosedGoods.length; i++) {
            let temp = {}
            temp.id = store.state.newSaleOrder.id
            temp.saleCode = store.state.newSaleOrder.saleCode
            temp.goodsCode = _this.choosedGoods[i].goodsCode
            temp.goodsName = _this.choosedGoods[i].goodsName
            temp.specification = _this.choosedGoods[i].specification
            temp.modelType = _this.choosedGoods[i].modelType
            temp.measurementName = _this.choosedGoods[i].measurementName
            temp.amount = _this.choosedGoods[i].amount
            temp.taxRate = _this.choosedGoods[i].taxRate
            temp.hasTaxPrice = _this.choosedGoods[i].hasTaxPrice
            temp.noTaxPrice = parseFloat(_this.choosedGoods[i].noTaxPrice)
            temp.hasTaxMoney = parseFloat(_this.choosedGoods[i].hasTaxMoney)
            temp.noTaxMoney = parseFloat(_this.choosedGoods[i].noTaxMoney)
            temp.taxMoney = parseFloat(_this.choosedGoods[i].taxMoney)
            temp.remark = _this.choosedGoods[i].remark
            para.push(temp)
          }
          console.log(para)
          const response = submitUpdateSaleDetail(para)
          response.then(function (e) {
            if (e.data.message === '成功') {
              if (e.data.code === 0) {
                _this.$message({
                  message: '提交成功',
                  type: 'success'
                })
              }
              _this.$router.push('/saleManage')
            }
            console.log(e.data)
            // _this.$router.push('/saleManage')
          })
        })
      } else if (store.state.saleOrderState === 1) {
        let Para = {id: store.state.currentSaleOrder.id,
          saleCode: store.state.currentSaleOrder.saleCode,
          inventoryOrganizationName: this.OrderForm.inventoryOrganizationName,
          saleType: this.OrderForm.saleType,
          customerName: this.OrderForm.customerName,
          storageName: this.OrderForm.storageName,
          saleDate: this.OrderForm.saleDate,
          creatorName: this.OrderForm.creatorName,
          createDate: this.getDate(this.OrderForm.createDate),
          statusName: '',
          remark: this.remark}
        console.log(Para)
        const response1 = submitUpdateSale(Para)
        response1.then(function (e) {
          let para = []
          for (let i = 0; i < _this.choosedGoods.length; i++) {
            let temp = {}
            temp.id = store.state.currentSaleOrder.id
            temp.saleCode = store.state.currentSaleOrder.saleCode
            temp.goodsCode = _this.choosedGoods[i].goodsCode
            temp.goodsName = _this.choosedGoods[i].goodsName
            temp.specification = _this.choosedGoods[i].specification
            temp.modelType = _this.choosedGoods[i].modelType
            temp.measurementName = _this.choosedGoods[i].measurementName
            temp.amount = _this.choosedGoods[i].amount
            temp.taxRate = _this.choosedGoods[i].taxRate
            temp.hasTaxPrice = _this.choosedGoods[i].hasTaxPrice
            temp.noTaxPrice = parseFloat(_this.choosedGoods[i].noTaxPrice)
            temp.hasTaxMoney = parseFloat(_this.choosedGoods[i].hasTaxMoney)
            temp.noTaxMoney = parseFloat(_this.choosedGoods[i].noTaxMoney)
            temp.taxMoney = parseFloat(_this.choosedGoods[i].taxMoney)
            temp.remark = _this.choosedGoods[i].remark
            para.push(temp)
          }
          console.log(para)
          const response = submitUpdateSaleDetail(para)
          response.then(function (e) {
            if (e.data.message === '成功') {
              _this.$router.push('/saleManage')
            }
            console.log(e.data)
            // _this.$router.push('/saleManage')
          })
        })
      }
    },
    getDate (myDate) {
      if (typeof myDate === 'string') {
        return myDate
      }
      let year = myDate.getFullYear()
      let month = myDate.getMonth() + 1
      let date = myDate.getDate()
      let h = myDate.getHours()
      let m = myDate.getMinutes()
      let s = myDate.getSeconds()
      month = month.toString().length > 1 ? month.toString() : '0' + month.toString()
      date = date.toString().length > 1 ? date.toString() : '0' + date.toString()
      h = h.toString().length > 1 ? h.toString() : '0' + h.toString()
      m = m.toString().length > 1 ? m.toString() : '0' + m.toString()
      s = s.toString().length > 1 ? s.toString() : '0' + s.toString()
      let now = year.toString() + '-' + month + '-' + date + ' ' + h + ':' + m + ':' + s
      return now
    },
    cancelOrder () {
      let para = {saleCode: ''}
      let _this = this
      if (store.state.saleOrderState === 0) {
        para.saleCode = store.state.newSaleOrder.saleCode
        const response = deleteByCode(para)
        response.then(function (e) {
          if (e.data.message === '成功') {
            _this.$router.push('/saleManage')
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  #back
    margin-top 10px
    position relative
    left 100px
  #select-area
    height 320px
  .selector
    width 195px
  .remark
    width 1140px
    position relative
    left 10px
  .save
    position relative
    left 220px
    top 35px
  #material-area
    height 700px
    margin-top 10px
  .operation-btn
    position relative
    left 900px
    top 40px
  #dialog-table
    height 400px
  .dialog-pagination
    float left
  .search-input
    width 300px
    float right
  .btn-box
    position relative
    left 1080px
</style>
