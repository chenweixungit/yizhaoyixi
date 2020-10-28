<template>
  <div>
    <navgation-bar></navgation-bar>
    <Block><el-button type="success" id="back" @click="turnBack">返回</el-button></Block>
    <!--手动选择区域-->
    <card id="select-area">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="库存组织">
          <el-select placeholder="请选择库存组织" v-model="form.inventoryOrganizationName" class="selector">
            <el-option v-for="(item,index) in organizations" :key="index" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="盘点仓库">
          <el-select placeholder="请选择仓库" class="selector" v-model="form.storageName">
            <el-option  v-for="(item,index) in storages" :key="index" :value="item.storageName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="盘点日期">
          <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="请选择日期" style="width: 100%;" v-model="form.checkDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input  v-model="form.creatorName" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <el-button class="save-btn" type="success" @click="saveCheck">保存</el-button>
    </card>
    <!--物料区域-->
    <card id="material-area">
      <block><el-button type="success" @click="selectGoods">选择物料</el-button></block>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="goodsId" label="序号" width="50px"></el-table-column>
        <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
        <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
        <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
        <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
        <el-table-column prop="amount" label="帐面数量" width="150px"></el-table-column>
        <el-table-column prop="realAmount" label="盘点数量" width="150px">
          <template v-slot="slotProps">
            <el-input-number size="mini" v-model="slotProps.row.realAmount" width="90px" controls-position="right" :min="1" :max="50"></el-input-number>
          </template>
        </el-table-column><el-table-column prop="differentAmount" label="差额数量" width="100px">
        <template v-slot="slotProps">
          {{slotProps.row.differentAmount=(slotProps.row.realAmount - slotProps.row.amount)}}
        </template>
      </el-table-column>
        <el-table-column prop="storagePrice" label="调整单价" width="150px"></el-table-column>
        <el-table-column prop="adjustMoney" label="调整金额" width="150px">
          <template v-slot="slotProps">
            {{slotProps.row.differentAmount * slotProps.row.storagePrice}}
          </template>
        </el-table-column>
        <el-table-column prop="inventoryAttributes" label="存货属性" width="150px"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="selectPageSize"
          :current-page="selectCurrentPage"
          :total="tableData.length"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <el-button type="primary" class="operation-btn" @click="saveCheckDetail">保存</el-button>
      <el-button type="primary" class="operation-btn" @click="submitCheckDetail">提交</el-button>
      <el-button type="danger" class="operation-btn" @click="cancelDialogVisible = true">取消</el-button>
    </card>
    <!--物料选择弹窗-->
    <el-dialog title="请选择物料" :visible.sync="dialogVisible" width="80%">
      <div id="dialog-table">
        <el-table ref="multipleTable" :data="multipleTable.slice((multipleCurrentPage - 1) * multiplePageSize,multipleCurrentPage * multiplePageSize)" tooltip-effect="dark" style="width: 100%">
          <el-table-column fixed type="selection" width="55"></el-table-column>
          <el-table-column fixed prop="goodsId" label="序号" width="55"></el-table-column>
          <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
          <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
          <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
          <el-table-column prop="amount" label="现存量" width="150px"></el-table-column>
          <el-table-column prop="storagePrice" label="单价" width="150px"></el-table-column>
          <el-table-column prop="inventoryAttributes" label="存货属性" width="150px"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-pagination
          @current-change="multipleTableChange"
          :page-size="multiplePageSize"
          :current-page="multipleCurrentPage"
          layout="total, prev, pager, next, jumper"
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
  findGoodsById,
  findAllWarehouseByOrganization,
  saveCheckMain,
  saveCheckGoodDetail, updateCheckStatus
} from '../../../api/NormalUser/CenterWarehouse'
export default {
  beforeMount () {
    this.organizations = store.state.allInventoryOrganizations
    console.log(store.state.allInventoryOrganizations)
    console.log(store.state.currentInventoryCheck.checkId)
    if (store.state.inventoryCheckState === 0) {
      this.form.creatorName = store.state.userInfo.username
    }
  },
  name: 'CreateInventoryCheck',
  components: {
    NavgationBar,
    Block,
    Card
  },
  data () {
    return {
      multiplePageSize: 9,
      multipleTable: [],
      multipleCurrentPage: 1,
      selectPageSize: 9,
      selectCurrentPage: 1,
      tableData: [],
      storages: [],
      storageId: 0,
      organizations: [],
      cancelDialogVisible: false,
      dialogVisible: false,
      form: []
    }
  },
  methods: {
    saveCheckDetail () {
      let _this = this
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].checkId = this.checkId
      }
      const response = saveCheckGoodDetail(this.tableData)
      response.then(function (e) {
        if (e.data.code === 0) {
          const res = updateCheckStatus({checkId: store.state.currentInventoryCheck.checkId, statusId: 3})
          console.log({checkId: _this.checkId, statusId: 3})
          res.then(function () {
            if (e.data.code === 0) {
              _this.$message({
                message: '保存成功',
                type: 'success'
              })
              _this.$router.push('/InventoryAdjustment')
            }
          })
        }
      })
    },
    submitCheckDetail () {
      let _this = this
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].checkId = this.checkId
      }
      const response = saveCheckGoodDetail(this.tableData)
      response.then(function (e) {
        if (e.data.code === 0) {
          const res = updateCheckStatus({checkId: store.state.currentInventoryCheck.checkId, statusId: 4})
          res.then(function () {
            if (e.data.code === 0) {
              _this.$message({
                message: '提交成功',
                type: 'success'
              })
              _this.$router.push('/InventoryAdjustment')
            }
          })
        }
      })
    },
    confirmGoods () {
      this.dialogVisible = false
      let temp = this.$refs.multipleTable.selection
      for (let i = 0; i < temp.length; i++) {
        this.tableData.push(temp[i])
      }
    },
    multipleTableChange (value) {
      this.multipleCurrentPage = value
    },
    handleCurrentChange (value) {
      this.selectCurrentPage = value
    },
    selectGoods () {
      let _this = this
      const response = findGoodsById({storageId: this.storageId})
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.multipleTable = e.data.data
          console.log(e.data.data)
          console.log(_this.multipleTable)
          _this.dialogVisible = true
        }
      })
    },
    // 保存库存调整明细
    saveCheck () {
      let _this = this
      let para = {checkId: store.state.currentInventoryCheck.checkId,
        inventoryOrganizationName: this.form.inventoryOrganizationName,
        checkDate: this.form.checkDate,
        storageName: this.form.storageName,
        creatorName: this.form.creatorName
      }
      const response = saveCheckMain(para)
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.storageId = e.data.data
          _this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },
    turnBack () {
      store.dispatch('changeIASelection', '库存盘点')
      this.$router.push('/InventoryAdjustment')
    }
  },
  watch: {
    'form.inventoryOrganizationName': {
      handler (newName, oldName) {
        let _this = this
        let Para = {inventoryOrganizationName: newName}
        const response = findAllWarehouseByOrganization(Para)
        response.then(function (e) {
          _this.storages = e.data.data
        })
      },
      immediate: true,
      deep: true
    }
  },
  computed: {}
}
</script>

<style lang="stylus" scoped>
  #back
    margin-top 10px
    position relative
    left 100px
  #select-area
    height 130px
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
    top 50px
  #dialog-table
    height 400px
  .dialog-pagination
    float left
  .search-input
    width 300px
    float right
  .save-btn
    position: relative
    left 1120px
</style>
