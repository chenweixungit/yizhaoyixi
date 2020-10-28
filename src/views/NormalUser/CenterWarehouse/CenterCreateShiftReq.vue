<template>
  <div>
    <navgation-bar></navgation-bar>
    <Block><el-button type="success" id="back" @click="turnBack">返回</el-button></Block>
    <!--手动选择区域-->
    <card id="select-area">
      <el-form :inline="true" ref="form" :model="selectForm" label-width="80px">
        <el-form-item label="库存组织">
          <el-select placeholder="请选择库存组织" class="selector" v-model="selectForm.inventoryOrganizationName">
            <el-option v-for="(item,index) in organizations" :key="index" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转入仓库">
          <el-select placeholder="请选择转入仓库" class="selector" v-model="selectForm.storageIn">
            <el-option v-for="(item,index) in storageIns" :key="index" :value="item.storageName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转出仓库">
          <el-select placeholder="请选择转入仓库" class="selector" v-model="selectForm.storageOut">
            <el-option v-for="(item,index) in storageOuts" :key="index" :value="item.storageName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请日期">
          <el-date-picker v-model="selectForm.transferRequestDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button type="success" @click="saveBaseInfo">保存</el-button>
      </div>
    </card>
    <!--物料选择区域-->
    <card id="material-area">
      <block><el-button type="success" @click="selectGoods">选择物料</el-button></block>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
        <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
        <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
        <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
        <el-table-column prop="requestAmount" label="申请数量" width="150px">
          <template v-slot="slotProps">
            <el-input-number size="mini" v-model="slotProps.row.requestAmount" width="90px" controls-position="right" :min="1" :max="50"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="nowAmount" label="现存量" width="150px"></el-table-column>
        <el-table-column prop="remark" label="备注" width="150px">
          <template v-slot="slotProps">
            <el-input size="mini" v-model="slotProps.row.remark"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="tableDataPageChange"
          :current-page="tableDataCurrentPage"
          :page-size="tableDataPagesize"
          :total="tableData.length"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <el-button type="primary" class="operation-btn" @click="saveTransferReqDetail">保存</el-button>
      <el-button type="primary" class="operation-btn" @click="submitTransferReqDetail">提交</el-button>
      <el-button type="danger" class="operation-btn" @click="cancelTransferReq">取消</el-button>
    </card>
    <!--物料选择弹窗-->
    <el-dialog title="请选择物料" :visible.sync="dialogVisible" width="80%">
      <el-input placeholder="" v-model="searchInfo" class="search-input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div id="dialog-table">
        <el-table :data="multipleTableCom" ref="multipleTable" tooltip-effect="dark" style="width: 100%">
          <el-table-column fixed type="selection" width="55"></el-table-column>
          <el-table-column fixed prop="" label="序号" width="55"></el-table-column>
          <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
          <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
          <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
          <el-table-column prop="nowAmount" label="现存量" width="150px"></el-table-column>
          <el-table-column prop="inventoryAttributes" label="存货属性" width="150px"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-pagination
          @current-change="multiplePageChange"
          layout="total, prev, pager, next, jumper"
          :current-page="multipleCurrentPage"
          :page-size="multiplePagesize"
          :total="multipleTable.length"
          class="dialog-pagination">
        </el-pagination>
        <el-button type="primary" @click="confirmGoods">确 定</el-button>
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
  findAllWarehouseByOrganization,
  findAllGoodsInOneStorage,
  updateTransferRequest,
  transferRequestDetail,
  updateTransferReqDetail,
  submitTransferRequest,
  detailByTransferId,
  submitTransferRequestDetail,
  deleteTransferRequestById
} from '../../../api/NormalUser/CenterWarehouse'
export default {
  beforeMount () {
    let _this = this
    this.organizations = store.state.allInventoryOrganizations
    if (store.state.inventoryTransferState === 1) {
      this.selectForm = store.state.newTransferReq
      console.log(store.state.newTransferReq)
      const response = detailByTransferId({transferRequestId: store.state.newTransferReq.transferRequestId})
      response.then(function (e) {
        _this.tableData = e.data.data
      })
    }
  },
  name: 'CenterCreateShiftReq',
  components: {
    NavgationBar,
    Block,
    Card
  },
  data () {
    return {
      // 申请单选择区域
      selectForm: {
        inventoryOrganizationName: '',
        storageIn: '',
        storageOut: '',
        transferRequestDate: ''
      },
      cancelDialogVisible: false,
      dialogVisible: false,
      tableDataCurrentPage: 1,
      tableDataPagesize: 6,
      tableData: [],
      multipleTable: [],
      multipleCurrentPage: 1,
      multiplePagesize: 6,
      // 库存组织
      organizations: [],
      storageIns: [],
      storageOuts: [],
      // 转出仓库的编码
      storageCode: '',
      searchInfo: ''
    }
  },
  methods: {
    // 保存初步的申请单信息
    saveBaseInfo () {
      let _this = this
      let para = {}
      para.transferRequestId = store.state.newTransferReq.transferRequestId
      para.transferRequestCode = store.state.newTransferReq.transferRequestCode
      para.inventoryOrganizationName = this.selectForm.inventoryOrganizationName
      para.storageOut = this.selectForm.storageOut
      para.storageIn = this.selectForm.storageIn
      para.transferRequestDate = this.selectForm.transferRequestDate
      const response = updateTransferRequest(para)
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.$message({
            message: '提交成功',
            type: 'success'
          })
        }
      })
    },
    // 确认选中的物料
    confirmGoods () {
      let _this = this
      let goods = this.$refs.multipleTable.selection
      let confirmGoods = []
      for (let i = 0; i < goods.length; i++) {
        let temp = {}
        temp.transferRequestId = store.state.newTransferReq.transferRequestId
        temp.goodsCode = goods[i].goodsCode
        temp.goodsName = goods[i].goodsName
        temp.specification = goods[i].specification
        temp.modelType = goods[i].modelType
        temp.measurementName = goods[i].measurementName
        temp.nowAmount = goods[i].amount
        temp.requestAmount = 0
        temp.remark = ''
        confirmGoods.push(temp)
      }
      const response = transferRequestDetail(confirmGoods)
      response.then(function (e) {
        if (e.data.code === 0) {
          for (let i = 0; i < e.data.data.length; i++) {
            _this.tableData.push(e.data.data[i])
          }
          _this.dialogVisible = false
        }
      })
    },
    // 保存转库申请单明细
    saveTransferReqDetail () {
      let _this = this
      // 0表示新建
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].transferRequestId = store.state.newTransferReq.transferRequestId
      }
      const response = updateTransferReqDetail(this.tableData)
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.$message({
            message: '保存成功',
            type: 'success'
          })
          _this.$router.push('/CenterInventoryAdjustment')
        }
      })
    },
    // 提交转库申请单明细
    submitTransferReqDetail () {
      let _this = this
      this.selectForm.transferRequestId = store.state.newTransferReq.transferRequestId
      this.selectForm.transferRequestCode = store.state.newTransferReq.transferRequestCode
      this.selectForm.statusName = ''
      this.selectForm.departmentName = ''
      this.selectForm.creatorName = ''
      console.log(this.tableData)
      this.selectForm.createDate = ''
      const response = submitTransferRequest(this.selectForm)
      response.then(function (e) {
        if (e.data.code === 0) {
          const res = submitTransferRequestDetail(_this.tableData)
          console.log(_this.tableData)
          res.then(function (e) {
            if (e.data.code === 0) {
              _this.$router.push('/CenterInventoryAdjustment')
              _this.$message({
                message: '提交成功',
                type: 'success'
              })
            }
          })
        }
      })
    },
    // 取消创建
    cancelTransferReq () {
      let _this = this
      const response = deleteTransferRequestById({transferRequestId: store.state.newTransferReq.transferRequestId})
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.$router.push('/CenterInventoryAdjustment')
        }
      })
    },
    turnBack () {
      store.dispatch('changeIASelection', '转库申请单')
      this.$router.push('/CenterInventoryAdjustment')
    },
    tableDataPageChange (value) {
      this.tableDataCurrentPage = value
    },
    multiplePageChange (value) {
      this.multipleCurrentPage = value
    },
    // 点击选择物料按钮
    selectGoods () {
      for (let i = 0; i < this.storageOuts.length; i++) {
        if (this.selectForm.storageOut === this.storageOuts[i].storageName) {
          this.storageCode = this.storageOuts[i].storageCode
          break
        }
      }
      let _this = this
      const response = findAllGoodsInOneStorage({storageCode: this.storageCode})
      response.then(function (e) {
        console.log(e.data.data)
        if (e.data.code === 0) {
          _this.multipleTable = e.data.data
          _this.dialogVisible = true
        }
      })
    }
  },
  watch: {
    'selectForm.inventoryOrganizationName': {
      handler (newName, oldName) {
        let _this = this
        let Para = {inventoryOrganizationName: newName}
        const response = findAllWarehouseByOrganization(Para)
        response.then(function (e) {
          _this.storageIns = e.data.data
          _this.storageOuts = e.data.data
        })
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    multipleTableCom () {
      const search = this.searchInfo
      if (search) {
        return this.multipleTable.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.multipleTable
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
    height 150px
  .selector
    width 195px
  .remark
    width 1178px
    position relative
    left 10px
  .save
    position relative
    left 220px
    top 35px
  #material-area
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
    left 1115px
</style>
