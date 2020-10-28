<template>
  <div>
    <navgation-bar></navgation-bar>
    <Block><el-button type="success" id="back" @click="turnBack">返回</el-button></Block>
    <card id="select-area">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="库存组织">
          <el-input v-model="form.inventoryOrganizationName" :disabled="true" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item  label="入库仓库">
          <el-select v-model="form.storageName" placeholder="请选入库仓库" class="selector">
            <el-option value="音乐仓库"></el-option>
            <el-option value="美术仓库"></el-option>
            <el-option value="舞蹈仓库"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库日期">
          <el-col :span="20">
            <el-date-picker v-model="form.inDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择日期" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input v-model="form.supplierName" :disabled="true" style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.remark" type="textarea" :rows="3" class="remark" placeholder="备注"></el-input>
        </el-form-item>
        <el-button type="primary" id="save-btn" @click="saveMain">保存</el-button>
      </el-form>
    </card>
    <card id="material-area">
      <block><el-button type="success" @click="selectOrder">选择采购订单</el-button></block>
      <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%">
        <el-table-column fixed prop="purchaseInDetailId" label="序号" width="50px"></el-table-column>
        <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
        <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
        <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
        <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
        <el-table-column prop="amount" label="应收数量" width="150px"></el-table-column>
        <el-table-column prop="realAmount" label="实收数量" width="150px">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.realAmount" controls-position="right" :min="0" style="width: 100px"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="noTaxPrice" label="无税单价" width="150px"></el-table-column>
        <el-table-column prop="orderCode" label="采购订单号" width="150px"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="tableData.length">
        </el-pagination>
      </div>
      <el-button type="primary" class="operation-btn" @click="saveAll">保存</el-button>
      <el-button type="primary" class="operation-btn" @click="commitAll">提交</el-button>
      <el-button type="danger" class="operation-btn" @click="cancelDialogVisible = true">取消</el-button>
    </card>
    <el-dialog title="请选择采购订单" :visible.sync="dialogVisible" width="50%">
      <el-input placeholder="请输入搜索信息" v-model="searchInfo" class="search-input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div id="dialog-table">
        <el-table :data="purchaseData.slice((purchasePage-1)*purchasePageSize, purchasePage*purchasePageSize)" ref="multipleTable" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="200px"></el-table-column>
          <el-table-column prop="orderCode" label="采购订单号"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-pagination
          @current-change="handlePurchasePage"
          layout="total, prev, pager, next, jumper"
          class="dialog-pagination"
          :current-page="purchasePage"
          :page-size="purchasePageSize"
          :total="purchaseData.length">
        </el-pagination>
        <el-button type="primary" @click="saveDetails">确 定</el-button>
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
import Block from '../../../components/Block'
import Card from '../../../components/Card'
import store from '../../../store/store'
import {
  queryAllOrder,
  newPurchaseIn,
  insertPurchaseInDetail,
  updatePurchaseInMain,
  updatePurchaseIn,
  updatePurchaseInStatus
} from '../../../api/NormalUser/MainWarehouse'

export default {
  beforeMount () {
    if (store.state.purchaseIntoState === 1) {
      this.purchaseInId = store.state.purchaseIntoMain.purchaseInId
      this.form = store.state.purchaseIntoMain
      this.tableData = store.state.purchaseIntoDetail
    }
  },
  name: 'CreatePurchaseInto',
  components: {
    NavgationBar,
    Block,
    Card
  },
  data () {
    return {
      searchInfo: '',
      dialogVisible: false,
      cancelDialogVisible: false,
      purchaseInId: '',
      // 分页
      currentPage: 1,
      pageSize: 6,
      // 选择采购单弹框分页
      purchasePage: 1,
      purchasePageSize: 7,
      tableData: [],
      dormitory: [],
      form: {
        inventoryOrganizationName: '',
        storageName: '',
        inDate: '',
        supplierName: '',
        remark: ''
      }
    }
  },
  computed: {
    purchaseData () {
      const search = this.searchInfo
      if (search) {
        return this.dormitory.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.dormitory
    }
  },
  methods: {
    turnBack () {
      store.dispatch('changeTabSelection', '采购入库')
      this.$router.push('/IntoWarehouse')
    },
    handleCurrentChange (value) {
      this.currentPage = value
    },
    handlePurchasePage (value) {
      this.purchasePage = value
    },
    // 查询采购订单
    selectOrder () {
      this.dialogVisible = true
      let _this = this
      const order = queryAllOrder()
      order.then(function (e) {
        try {
          if (e.data.data !== null) {
            _this.dormitory = e.data.data
            console.log(e.data.data)
          }
        } catch (e) {
          console.log('获取数据失败')
        }
      })
    },
    // 保存明细数据
    saveDetails () {
      let _this = this
      const orderCode = this.$refs.multipleTable.selection
      let parameter = {orderCode: orderCode[0].orderCode}
      let parameter2 = {orderCode: orderCode[0].orderCode, purchaseInId: ''}
      const mainData = newPurchaseIn(parameter)
      mainData.then(function (e) {
        try {
          if (store.state.purchaseIntoState === 0) {
            _this.purchaseInId = e.data.data.purchaseInId
          }
          parameter2.purchaseInId = _this.purchaseInId
          _this.form.inventoryOrganizationName = e.data.data.inventoryOrganizationName
          _this.form.supplierName = e.data.data.supplierName
          console.log(parameter2)
          const detailData = insertPurchaseInDetail(parameter2)
          detailData.then(function (e) {
            try {
              _this.tableData = e.data.data
            } catch (e) {
              console.log('获取数据失败')
            }
          })
          _this.dialogVisible = false
        } catch (e) {
          console.log('获取数据失败')
        }
      })
    },
    saveMain () {
      if (this.form.storageName === '') {
        this.$message.error('请输入入库仓库')
      } else if (this.form.inDate === '') {
        this.$message.error('请输入库如日期')
      } else {
        let parameter = {
          purchaseInId: this.purchaseInId,
          storageName: this.form.storageName,
          inDate: this.form.inDate,
          remark: this.form.remark,
          creatorName: '周鹏程'
        }
        console.log(parameter)
        updatePurchaseInMain(parameter)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }
    },
    // 保存所有
    saveAll () {
      let _this = this
      if (this.form.storageName === '') {
        this.$message.error('请输入入库仓库')
      } else if (this.form.inDate === '') {
        this.$message.error('请输入库如日期')
      } else {
        let parameter = {
          purchaseInId: this.purchaseInId,
          storageName: this.form.storageName,
          inDate: this.form.inDate,
          remark: this.form.remark,
          creatorName: '周鹏程'
        }
        const response1 = updatePurchaseInMain(parameter)
        response1.then(function () {
          let detailParameter = []
          console.log(_this.tableData)
          for (let i = 0; i < _this.tableData.length; i++) {
            let temp = {}
            temp.purchaseInDetailId = _this.tableData[i].purchaseInDetailId
            temp.realAmount = _this.tableData[i].realAmount
            temp.noTaxMoney = _this.tableData[i].realAmount * _this.tableData[i].noTaxPrice
            detailParameter.push(temp)
          }
          const response2 = updatePurchaseIn(detailParameter)
          response2.then(function (e) {
            let stateParameter = {purchaseInId: _this.purchaseInId, statusId: 3}
            console.log(stateParameter)
            const response3 = updatePurchaseInStatus(stateParameter)
            response3.then(function (e) {
              _this.$message({
                message: '保存成功',
                type: 'success'
              })
            })
          })
        })
      }
    },
    // 提交所有
    commitAll () {
      let _this = this
      if (this.form.storageName === '') {
        this.$message.error('请输入入库仓库')
      } else if (this.form.inDate === '') {
        this.$message.error('请输入库如日期')
      } else {
        let parameter = {
          purchaseInId: this.purchaseInId,
          storageName: this.form.storageName,
          inDate: this.form.inDate,
          remark: this.form.remark,
          creatorName: '周鹏程'
        }
        const response = updatePurchaseInMain(parameter)
        response.then(function () {
          let detailParameter = []
          console.log(_this.tableData)
          for (let i = 0; i < _this.tableData.length; i++) {
            let temp = {}
            temp.purchaseInDetailId = _this.tableData[i].purchaseInDetailId
            temp.realAmount = _this.tableData[i].realAmount
            temp.noTaxMoney = _this.tableData[i].realAmount * _this.tableData[i].noTaxPrice
            detailParameter.push(temp)
          }
          console.log(detailParameter)
          const response = updatePurchaseIn(detailParameter)
          response.then(function (e) {
            let stateParameter = {purchaseInId: _this.purchaseInId, statusId: 4}
            console.log(stateParameter)
            const response = updatePurchaseInStatus(stateParameter)
            response.then(function (e) {
              _this.$router.push('/IntoWarehouse')
            })
          })
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
    height 230px
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
    margin-top 10px
    height 650px
  .operation-btn
    position relative
    left 900px
  #dialog-table
    height 400px
  .dialog-pagination
    float left
  .search-input
    width 300px
    float right
  #save-btn
    float right
    margin-right 60px
</style>
