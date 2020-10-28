<template>
  <div>
    <navgation-bar></navgation-bar>
    <block><el-button type="success" id="back" @click="turnBack">返回</el-button></block>
    <!--手动选择-->
    <card id="select-area">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="库存组织">
          <el-select v-model="form.inventoryOrganizationName" placeholder="请选择库存组织" class="selector">
            <el-option v-for="(item, index) in invOrg" :key="index" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请部门">
          <el-select v-model="form.centerName" placeholder="请选择申请部门" class="selector">
            <el-option v-for="(item, index) in center" :key="index" :value="item.centerName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需求类型">
          <el-select v-model="form.requestType" placeholder="请选择需求类型" class="selector">
            <el-option value="礼品"></el-option>
            <el-option value="教学用品"></el-option>
            <el-option value="办公用品"></el-option>
            <el-option value="销售商品"></el-option>
            <el-option value="市场物资"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请日期">
          <el-col :span="20">
            <el-date-picker v-model="form.date" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.remark" type="textarea" :rows="3" class="remark" placeholder="备注"></el-input>
        </el-form-item>
        <el-button type="primary" id="save-btn" @click="saveMain">保存</el-button>
      </el-form>
    </card>
    <!--物料-->
    <card id="material-area">
      <block><el-button type="success" @click="getAllGoods">新增请购物料</el-button></block>
      <el-table :data="materialData.slice((materialPage-1)*materialPageSize,materialPage*materialPageSize)" style="width: 100%">
        <el-table-column fixed prop="goodsId" label="序号" width="50px"></el-table-column>
        <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
        <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
        <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
        <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
        <el-table-column prop="requestAmount" label="请购数量" width="150px">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.requestAmount" controls-position="right" :min="1" :max="scope.row.amount" style="width: 100px"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="现存量" width="150px"></el-table-column>
        <el-table-column prop="goodsRemark" label="备注" width="150px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.goodsRemark"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" prop="" label="操作" width="50px">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteMaterial(scope)" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleMaterialPage"
        layout="total, prev, pager, next, jumper"
        :current-page="materialPage"
        :page-size="materialPageSize"
        :total="materialTotal">
      </el-pagination>
      <el-button type="primary" class="operation-btn" @click="saveAll">保存</el-button>
      <el-button type="primary" class="operation-btn" @click="commitAll">提交</el-button>
      <el-button type="danger" class="operation-btn" @click="cancelDialogVisible = true">取消</el-button>
    </card>
    <!--选择物料的弹窗-->
    <el-dialog title="请选择请购物料" :visible.sync="dialogVisible" width="80%">
      <el-input placeholder="请输入搜索信息" v-model="searchInfo" class="search-input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div id="dialog-table">
        <el-table :data="selectMaterialData.slice((selectMaterialPage-1)*selectMaterialPageSize,selectMaterialPage*selectMaterialPageSize)" ref="multipleTable" tooltip-effect="dark" style="width: 100%">
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
          @current-change="handleSelectMaterialPage"
          layout="total, prev, pager, next, jumper"
          class="dialog-pagination"
          :current-page="selectMaterialPage"
          :page-size="selectMaterialPageSize"
          :total="selectMaterialTotal">
        </el-pagination>
        <el-button type="primary" @click="insertMaterial">确 定</el-button>
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
import store from '../../../store/store'
import {
  findAllInvOrg,
  findAllCenter,
  getPurReqCode,
  saveMain,
  getGoods,
  insertGoods,
  deleteGoods,
  updataGoodsInfo,
  saveOrCommit
} from '../../../api/NormalUser/PurchaseReq'

export default {
  beforeMount () {
    let _this = this
    if (store.state.purchaseState === 1) {
      this.form = store.state.purchaseReq
      this.materialData = store.state.purchaseGoods
      this.purReqCode = store.state.purchaseReq.id
    } else {
      const purReqCode = getPurReqCode()
      purReqCode.then(function (e) {
        try {
          _this.purReqCode = e.data.data
        } catch (e) {
          console.log('获取数据失败')
        }
      })
    }
    const invOrg = findAllInvOrg()
    invOrg.then(function (e) {
      try {
        _this.invOrg = e.data.data
      } catch (e) {
        console.log('获取数据失败')
      }
    })
    const center = findAllCenter()
    center.then(function (e) {
      try {
        _this.center = e.data.data
      } catch (e) {
        console.log('获取数据失败')
      }
    })
  },
  name: 'CreatePurchaseReq',
  components: {
    NavgationBar,
    Card,
    Block
  },
  data () {
    return {
      dialogVisible: false,
      cancelDialogVisible: false,
      materialPage: 1,
      materialPageSize: 6,
      selectMaterialPage: 1,
      selectMaterialPageSize: 7,
      searchInfo: '',
      invOrg: [],
      center: [],
      purReqCode: '',
      form: {
        inventoryOrganizationName: '',
        centerName: '',
        requestType: '',
        date: '',
        remark: ''
      },
      materialData: [],
      dormitory: []
    }
  },
  computed: {
    materialTotal () {
      return this.materialData.length
    },
    selectMaterialTotal () {
      return this.selectMaterialData.length
    },
    selectMaterialData () {
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
      this.$router.push('/PurchaseReq')
    },
    handleMaterialPage (value) {
      this.materialPage = value
    },
    handleSelectMaterialPage (value) {
      this.selectMaterialPage = value
    },
    // 保存主要明细信息
    saveMain () {
      if (this.form.inventoryOrganizationName === '') {
        this.$message.error('请输入库存组织')
      } else if (this.form.centerName === '') {
        this.$message.error('请输入申请部门')
      } else if (this.form.requestType === '') {
        this.$message.error('请输入需求类型')
      } else if (this.form.date === '') {
        this.$message.error('请输入申请日期')
      } else {
        let parameter = {
          id: this.purReqCode,
          inventoryOrganizationName: this.form.inventoryOrganizationName,
          centerId: 1,
          requestType: this.form.requestType,
          date: this.form.date,
          remark: this.form.remark,
          creatorName: '周鹏程'
        }
        console.log(parameter)
        let _this = this
        const response = saveMain(parameter)
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
    // 获取物资
    getAllGoods () {
      if (this.form.inventoryOrganizationName === '' || this.form.centerName === '') {
        this.$message.error('请输入库存组织和申请部门')
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
    // 插入物料
    insertMaterial () {
      this.materialData = this.$refs.multipleTable.selection
      let parameter = []
      for (let i = 0; i < this.materialData.length; i++) {
        let temp = {}
        temp.goodsId = this.materialData[i].goodsId
        temp.id = this.purReqCode
        temp.requestAmount = 0
        temp.amount = this.materialData[i].amount
        parameter.push(temp)
      }
      insertGoods(parameter)
      this.dialogVisible = false
    },
    // 删除物料
    deleteMaterial (scope) {
      let parameter = {id: '', goodsId: ''}
      parameter.id = this.purReqCode
      parameter.goodsId = scope.row.goodsId
      console.log(parameter)
      deleteGoods(parameter)
      this.materialData.splice(scope.$index, 1)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    // 保存所有
    saveAll () {
      let _this = this
      if (this.form.inventoryOrganizationName === '') {
        this.$message.error('请输入库存组织')
      } else if (this.form.centerName === '') {
        this.$message.error('请输入申请部门')
      } else if (this.form.requestType === '') {
        this.$message.error('请输入需求类型')
      } else if (this.form.date === '') {
        this.$message.error('请输入申请日期')
      } else {
        let parameter = {
          id: this.purReqCode,
          inventoryOrganizationName: this.form.inventoryOrganizationName,
          centerId: 1,
          requestType: this.form.requestType,
          date: this.form.date,
          remark: this.form.remark,
          creatorName: '周鹏程'
        }
        const response = saveMain(parameter)
        response.then(function (e) {
          let updateParameter = []
          for (let i = 0; i < _this.materialData.length; i++) {
            let temp = {}
            temp.id = _this.purReqCode
            temp.goodsId = _this.materialData[i].goodsId
            temp.requestAmount = _this.materialData[i].requestAmount
            temp.goodsRemark = _this.materialData[i].goodsRemark
            updateParameter.push(temp)
          }
          console.log(updateParameter)
          updataGoodsInfo(updateParameter)
          let saveParameter = {id: _this.purReqCode, statusId: 3}
          saveOrCommit(saveParameter)
          _this.$message({
            message: '保存成功',
            type: 'success'
          })
        })
      }
    },
    // 提交
    commitAll () {
      let _this = this
      if (this.form.inventoryOrganizationName === '') {
        this.$message.error('请输入库存组织')
      } else if (this.form.centerName === '') {
        this.$message.error('请输入申请部门')
      } else if (this.form.requestType === '') {
        this.$message.error('请输入需求类型')
      } else if (this.form.date === '') {
        this.$message.error('请输入申请日期')
      } else {
        let parameter = {
          id: this.purReqCode,
          inventoryOrganizationName: this.form.inventoryOrganizationName,
          centerId: 1,
          requestType: this.form.requestType,
          date: this.form.date,
          remark: this.form.remark,
          creatorName: '周鹏程'
        }
        const response = saveMain(parameter)
        response.then(function (e) {
          let updateParameter = []
          for (let i = 0; i < _this.materialData.length; i++) {
            let temp = {}
            temp.id = _this.purReqCode
            temp.goodsId = _this.materialData[i].goodsId
            temp.requestAmount = _this.materialData[i].requestAmount
            temp.goodsRemark = _this.materialData[i].goodsRemark
            updateParameter.push(temp)
          }
          console.log(updateParameter)
          updataGoodsInfo(updateParameter)
          let saveParameter = {id: _this.purReqCode, statusId: 4}
          const response = saveOrCommit(saveParameter)
          response.then(function (e) {
            _this.$router.push('/PurchaseReq')
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
