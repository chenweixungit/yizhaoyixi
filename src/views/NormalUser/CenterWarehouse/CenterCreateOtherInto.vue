<template>
  <div>
    <navgation-bar></navgation-bar>
    <Block><el-button type="success" id="back" @click="turnBack">返回</el-button></Block>
    <!--手动选择区域-->
    <card id="select-area">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="库存组织">
          <el-select  placeholder="请选择库存组织" class="selector" v-model="form.inventoryOrganizationName">
            <el-option v-for="(item,index) in organizations" :key="index" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库仓库">
          <el-select placeholder="请选入库仓库" class="selector" v-model="form.storageName">
            <el-option  v-for="(item,index) in warehouses" :key="index" :value="item.storageName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库日期">
          <el-date-picker value-format="yyyy-MM-dd" v-model="form.inDate" type="date" placeholder="请选择日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="form.creatorName" style="width: 195px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.remark" type="textarea" :rows="3" class="remark" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <el-button class="save-btn" type="success" @click="saveOtherInHead">保存</el-button>
    </card>
    <!--选择转库单-->
    <card class="material-area">
      <block><el-button type="success" @click="chooseTransfer">选择转库单</el-button></block>
      <el-table :data="tableDataCom.slice((tableCurrentPage - 1)*tablePageSize,tableCurrentPage*tablePageSize)" style="width: 100%">
        <el-table-column prop="transferDetailId" label="序号" width="150px"></el-table-column>
        <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
        <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
        <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
        <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
        <el-table-column prop="requestAmount" label="应收数量" width="150px"></el-table-column>
        <el-table-column prop="realAmount" label="实收数量" width="150px">
          <template v-slot="slotProps">
            <el-input-number size="mini" v-model="slotProps.row.realAmount" width="90px" controls-position="right" :min="1"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="transferCode" label="来源单号" width="150px"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="tablePageChange"
          :page-size="tablePageSize"
          :current-page="tableCurrentPage"
          :total="tableDataCom.length"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <el-button type="primary" class="operation-btn" @click="saveTransferReqDetail">保存</el-button>
      <el-button type="primary" class="operation-btn" @click="submitTransferReqDetail">提交</el-button>
      <el-button type="danger" class="operation-btn" @click="cancelTransferReq">取消</el-button>
    </card>
    <!--转库单弹窗-->
    <el-dialog title="请选择转库单" :visible.sync="transferDialogVisible" width="50%">
      <el-input placeholder="" v-model="dialogSearchInfo" class="search-input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div class="dialog-table">
        <el-table :data="dialogData.slice((dialogCurrentPage - 1)*dialogPageSize , dialogCurrentPage * dialogPageSize)" ref="multipleTable" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="200px"></el-table-column>
          <el-table-column prop="transferCode" label="序号"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-pagination
          @current-change="dialogPageChange"
          :page-size="dialogPageSize"
          :current-page="dialogCurrentPage"
          :total="dialogData.length"
          layout="total, prev, pager, next, jumper"
          class="dialog-pagination">
        </el-pagination>
        <el-button type="primary" @click="confirmTransfer">确 定</el-button>
        <el-button @click="transferDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--取消创建时的弹窗-->
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
import {findAllInventoryOrganization, findAllWarehouseByOrganization} from '../../../api/NormalUser/SaleManagement'
import {
  getTranferDetail, insertOtherInDetailByTransfer,
  updateOtherInMain, updateOtherInStatus, getAllTransfer, deleteOtherIn, getOtherInDetail, getOtherIn
} from '../../../api/NormalUser/CenterWarehouse'
export default {
  computed: {
    tableDataCom () {
      return this.tableData
    }
  },
  beforeMount () {
    let _this = this
    // 获取所有库存组织
    const allInventroyOrganization = findAllInventoryOrganization()
    allInventroyOrganization.then(function (e) {
      _this.organizations = e.data.data
      console.log(_this.organizations)
    })
    this.otherInId = store.state.centerOtherInHead.otherInId
    if (store.state.centerOtherInState === 0) {
      this.form.creatorName = store.state.userInfo.username
    }
    if (store.state.centerOtherInState === 1) {
      const response = getOtherInDetail({otherInId: this.otherInId})
      response.then(function (e) {
        _this.tableData = e.data.data
      })
      const res = getOtherIn({otherInId: this.otherInId})
      res.then(function (e) {
        _this.form = e.data.data
      })
    }
  },
  name: 'CenterCreateOtherInto',
  components: {
    NavgationBar,
    Block,
    Card
  },
  data () {
    return {
      dialogSearchInfo: '',
      dialogData: [],
      dialogPageSize: 6,
      dialogCurrentPage: 1,
      tablePageSize: 6,
      tableCurrentPage: 1,
      tableData: [],
      organizations: [],
      form: {remark: ''},
      warehouses: [],
      otherInId: 0,
      transferDetailId: 0,
      cancelDialogVisible: false,
      transferDialogVisible: false,
      checkDialogVisible: false
    }
  },
  methods: {
    dialogPageChange (value) {
      this.dialogCurrentPage = value
    },
    cancelTransferReq () {
      let _this = this
      const response = deleteOtherIn({otherInId: this.otherInId})
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.$message({
            message: '取消创建',
            type: 'success'
          })
          _this.$router.push('/CenterIntoWarehouse')
        }
      })
    },
    submitTransferReqDetail () {
      let _this = this
      let para = []
      for (let i = 0; i < this.tableData.length; i++) {
        let temp = {}
        temp.otherInId = this.otherInId
        temp.transferDetailId = this.tableData[i].transferDetailId
        temp.realAmount = this.tableData[i].realAmount
        para.push(temp)
      }
      const response = insertOtherInDetailByTransfer(para)
      response.then(function (e) {
        const res = updateOtherInStatus({otherInId: _this.otherInId, statusId: 4})
        res.then(function (e) {
          if (e.data.code === 0) {
            _this.$message({
              message: '提交成功',
              type: 'success'
            })
            _this.$router.push('/CenterIntoWarehouse')
          }
        })
      })
    },
    saveTransferReqDetail () {
      let _this = this
      let para = []
      for (let i = 0; i < this.tableData.length; i++) {
        let temp = {}
        temp.otherInId = this.otherInId
        temp.transferDetailId = this.tableData[i].transferDetailId
        temp.realAmount = this.tableData[i].realAmount
        para.push(temp)
      }
      const response = insertOtherInDetailByTransfer(para)
      response.then(function (e) {
        const res = updateOtherInStatus({otherInId: _this.otherInId, statusId: 3})
        console.log({otherInId: _this.otherInId, statusId: 3})
        res.then(function (e) {
          if (e.data.code === 0) {
            _this.$message({
              message: '保存成功',
              type: 'success'
            })
            _this.$router.push('/CenterIntoWarehouse')
          }
        })
      })
    },
    // 确认
    confirmTransfer () {
      this.transferDialogVisible = false
      let _this = this
      let temp = this.$refs.multipleTable.selection
      console.log(temp)
      const response = getTranferDetail({transferCode: temp[0].transferCode})
      response.then(function (e) {
        console.log(e.data.data)
        _this.tableData = e.data.data
        _this.transferDetailId = e.data.data[0].transferDetailId
        console.log(_this.transferDetailId)
        console.log(e.data.data)
      })
    },
    // 选择转库单
    chooseTransfer () {
      const response = getAllTransfer()
      let _this = this
      response.then(function (e) {
        _this.dialogData = e.data.data
        _this.transferDialogVisible = true
      })
    },
    // 上边的保存按钮
    saveOtherInHead () {
      let _this = this
      this.form.otherInId = this.otherInId
      const response = updateOtherInMain(this.form)
      console.log(this.form)
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },
    tablePageChange (value) {
      this.tableCurrentPage = value
    },
    turnBack () {
      store.dispatch('changeTabSelection', '其他入库')
      this.$router.push('/CenterIntoWarehouse')
    }
  },
  watch: {
    'form.inventoryOrganizationName': {
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
    width 1178px
    position relative
    left 10px
  .save
    position relative
    left 220px
    top 35px
  .material-area
    margin-top 10px
  .operation-btn
    position relative
    left 900px
    top 300px
  .dialog-table
    height 400px
  .dialog-pagination
    float left
  .search-input
    width 300px
    float right
  .save-btn
    position relative
    left 1120px
  .operation-btn
    position relative
    left 900px
    top 40px
</style>
