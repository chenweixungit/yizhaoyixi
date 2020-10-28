<template>
  <div>
    <navgation-bar></navgation-bar>
    <Block><el-button type="success" id="back" @click="turnBack">返回</el-button></Block>
    <!--手动选择区域-->
    <card id="select-area">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="库存组织">
          <el-select v-model="form.inventoryOrganizationName" placeholder="请选择库存组织" class="selector">
            <el-option value="艺朝艺夕教育科技集团有限公司"></el-option>
            <el-option value="杭州艺朝艺夕培训学校"></el-option>
            <el-option value="南京艺朝艺夕培训学校"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库">
          <el-select v-model="form.storageName" placeholder="请选择仓库" class="selector">
            <el-option value="合肥总仓"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="录入日期">
          <el-date-picker v-model="form.beginningStorageDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-button type="primary" id="save-btn" @click="saveMain">保存</el-button>
      </el-form>
    </card>
    <!--物料选择区域-->
    <card id="material-area">
      <block><el-button type="success" @click="getMaterial">选择物料</el-button></block>
      <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%">
        <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
        <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
        <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
        <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
        <el-table-column prop="inAmount" label="入库数量" width="150px">
          <template v-slot="slotProps">
            <el-input-number v-model="slotProps.row.inAmount" controls-position="right" :min="0" style="width: 100px"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="inPrice" label="入库单价" width="150px">
          <template v-slot="slotProps">
            <el-input-number v-model="slotProps.row.inPrice" controls-position="right" :min="0" style="width: 100px"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="inMoney" label="入库金额" width="150px">
          <template v-slot="slotProps">
            {{slotProps.row.inMoney = (slotProps.row.inAmount * slotProps.row.inPrice).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="beginningStorageDetailDate" label="入库时间" width="150px"></el-table-column>
        <el-table-column prop="remark" label="备注" width="150px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" prop="" label="操作" width="50px">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteIt(scope)" circle></el-button>
          </template>
        </el-table-column>
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
    <!--物料选择弹窗-->
    <el-dialog title="请选择物料" :visible.sync="dialogVisible" width="80%">
      <el-input placeholder="请输入搜索信息" v-model="searchInfo" class="search-input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div id="dialog-table">
        <el-table :data="materialData.slice((materialPage-1)*materialPageSize, materialPage*materialPageSize)" ref="multipleTable" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="50px"></el-table-column>
          <el-table-column prop="goodsId" label="序号" width="50px"></el-table-column>
          <el-table-column prop="goodsCode" label="物料编码"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称"></el-table-column>
          <el-table-column prop="specification" label="规格"></el-table-column>
          <el-table-column prop="modelType" label="型号"></el-table-column>
          <el-table-column prop="measurementName" label="单位"></el-table-column>
          <el-table-column prop="amount" label="现存量"></el-table-column>
          <el-table-column prop="inventoryAttribute" label="存货属性"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-pagination
          @current-change="handleMaterialPage"
          layout="total, prev, pager, next, jumper"
          class="dialog-pagination"
          :current-page="materialPage"
          :page-size="materialPageSize"
          :total="materialData.length">
        </el-pagination>
        <el-button type="primary" @click="insertDetail">确 定</el-button>
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
import {newInit, saveInitMain, insertInitDetail, deleteInitDetail, updateInitDetail, commitInitAll} from '../../../api/NormalUser/MainWarehouse'
import {getGoods} from '../../../api/NormalUser/PurchaseReq'

export default {
  beforeMount () {
    let _this = this
    if (store.state.initState === 1) {
      this.form = store.state.initMain
      this.tableData = store.state.initDetail
      this.newInit.beginningStorageCode = store.state.initMain.beginningStorageCode
      this.newInit.beginningStorageId = store.state.initDetail[0].beginningStorageId
    } else {
      let parameter = {creatorName: '周鹏程'}
      const init = newInit(parameter)
      init.then(function (e) {
        try {
          _this.newInit = e.data.data
        } catch (e) {
          console.log('获取数据失败')
        }
      })
    }
  },
  name: 'CreateInitialInventory',
  components: {
    NavgationBar,
    Block,
    Card
  },
  data () {
    return {
      searchInfo: '',
      cancelDialogVisible: false,
      dialogVisible: false,
      newInit: {},
      // 分页
      currentPage: 1,
      pageSize: 6,
      // 物料弹窗分页
      materialPage: 1,
      materialPageSize: 7,
      tableData: [],
      dormitory: [],
      form: {
        inventoryOrganizationName: '',
        storageName: '',
        beginningStorageDate: ''
      }
    }
  },
  computed: {
    materialData () {
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
      store.dispatch('changeIASelection', '期初库存')
      this.$router.push('/InventoryAdjustment')
    },
    handleCurrentChange (value) {
      this.currentPage = value
    },
    handleMaterialPage (value) {
      this.materialPage = value
    },
    // 保存主要的明细数据
    saveMain () {
      let _this = this
      let parameter = {
        beginningStorageId: this.newInit.beginningStorageId,
        beginningStorageCode: this.newInit.beginningStorageCode,
        inventoryOrganizationName: this.form.inventoryOrganizationName,
        storageName: this.form.storageName,
        beginningStorageDate: this.form.beginningStorageDate,
        creatorName: '周鹏程',
        createDate: '2020-01-14 14:50:31',
        statusName: '草稿'
      }
      console.log(parameter)
      const response = saveInitMain(parameter)
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },
    // 获取物料
    getMaterial () {
      if (this.form.inventoryOrganizationName === '') {
        this.$message.error('请输入库存组织')
      } else {
        let _this = this
        let parameter = {inventoryOrganizationName: ''}
        parameter.inventoryOrganizationName = this.form.inventoryOrganizationName
        const goods = getGoods(parameter)
        console.log(goods)
        goods.then(function (e) {
          _this.dormitory = e.data.data
          _this.dialogVisible = true
        })
      }
    },
    // 插入明细数据
    insertDetail () {
      let data = this.$refs.multipleTable.selection
      let _this = this
      let parameter = []
      for (let i = 0; i < data.length; i++) {
        let temp = {
          beginningStorageDetailId: null,
          beginningStorageId: this.newInit.beginningStorageId,
          goodsCode: data[i].goodsCode,
          goodsName: '',
          specification: '',
          modelType: '',
          measurementName: '',
          inAmount: null,
          inPrice: null,
          inMoney: null,
          beginningStorageDetailDate: '',
          remark: ''
        }
        parameter.push(temp)
        const response = insertInitDetail(parameter)
        response.then(function (e) {
          if (e.data.code === 0) {
            _this.tableData = e.data.data
            _this.dialogVisible = false
          }
        })
      }
    },
    // 删除一条物料明细
    deleteIt (scope) {
      let _this = this
      let parameter = {beginningStorageDetailId: this.tableData[scope.$index].beginningStorageDetailId}
      const response = deleteInitDetail(parameter)
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.tableData.splice(scope.$index, 1)
          _this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 保存所有
    saveAll () {
      let _this = this
      let parameter = {
        beginningStorageId: this.newInit.beginningStorageId,
        beginningStorageCode: this.newInit.beginningStorageCode,
        inventoryOrganizationName: this.form.inventoryOrganizationName,
        storageName: this.form.storageName,
        beginningStorageDate: this.form.beginningStorageDate,
        creatorName: '周鹏程',
        createDate: '2020-01-14 14:50:31',
        statusName: '草稿'
      }
      console.log(parameter)
      const response = saveInitMain(parameter)
      response.then(function (e) {
        let parameter2 = []
        for (let i = 0; i < _this.tableData.length; i++) {
          let temp = {
            beginningStorageDetailId: _this.tableData[i].beginningStorageDetailId,
            beginningStorageId: _this.tableData[i].beginningStorageId,
            goodsCode: _this.tableData[i].goodsCode,
            goodsName: '',
            specification: '',
            modelType: '',
            measurementName: '',
            inAmount: _this.tableData[i].inAmount,
            inPrice: _this.tableData[i].inPrice,
            inMoney: parseFloat(_this.tableData[i].inMoney),
            beginningStorageDetailDate: _this.tableData[i].beginningStorageDetailDate,
            remark: _this.tableData[i].remark
          }
          parameter2.push(temp)
        }
        console.log(parameter2)
        const response2 = updateInitDetail(parameter2)
        response2.then(function (e) {
          if (e.data.code === 0) {
            _this.$message({
              message: '保存成功',
              type: 'success'
            })
          }
        })
      })
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
    // 保存所有
    commitAll () {
      let _this = this
      let parameter = {
        beginningStorageId: this.newInit.beginningStorageId,
        beginningStorageCode: this.newInit.beginningStorageCode,
        inventoryOrganizationName: this.form.inventoryOrganizationName,
        storageName: this.form.storageName,
        beginningStorageDate: this.form.beginningStorageDate,
        creatorName: '周鹏程',
        createDate: '2020-01-14 14:50:31',
        statusName: '草稿'
      }
      console.log(parameter)
      const response = saveInitMain(parameter)
      response.then(function (e) {
        let parameter2 = []
        for (let i = 0; i < _this.tableData.length; i++) {
          let temp = {
            beginningStorageDetailId: _this.tableData[i].beginningStorageDetailId,
            beginningStorageId: _this.tableData[i].beginningStorageId,
            goodsCode: _this.tableData[i].goodsCode,
            goodsName: '',
            specification: '',
            modelType: '',
            measurementName: '',
            inAmount: _this.tableData[i].inAmount,
            inPrice: _this.tableData[i].inPrice,
            inMoney: parseFloat(_this.tableData[i].inMoney),
            beginningStorageDetailDate: _this.tableData[i].beginningStorageDetailDate,
            remark: _this.tableData[i].remark
          }
          parameter2.push(temp)
        }
        console.log(parameter2)
        const response2 = updateInitDetail(parameter2)
        response2.then(function (e) {
          let nowDate = new Date()
          let parameter3 = {
            beginningStorageId: _this.newInit.beginningStorageId,
            beginningStorageCode: _this.newInit.beginningStorageCode,
            inventoryOrganizationName: _this.form.inventoryOrganizationName,
            storageName: _this.form.storageName,
            beginningStorageDate: _this.form.beginningStorageDate,
            creatorName: '周鹏程',
            createDate: _this.getDate(nowDate),
            statusName: ''
          }
          const response3 = commitInitAll(parameter3)
          response3.then(function (e) {
            if (e.data.code === 0) {
              _this.$router.push('/InventoryAdjustment')
            }
          })
        })
      })
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
    height 80px
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
    margin-right 20px
</style>
