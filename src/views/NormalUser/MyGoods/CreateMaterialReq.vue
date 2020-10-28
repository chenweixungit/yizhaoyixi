<template>
  <div>
    <navgation-bar></navgation-bar>
    <Block><el-button type="success" id="back" @click="turnBack">返回</el-button></Block>
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
            <el-date-picker v-model="form.createDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.goodsRequisitionRemark" type="textarea" :rows="3" class="remark" placeholder="备注"></el-input>
        </el-form-item>
        <el-button type="primary" id="save-btn" @click="saveMain">保存</el-button>
      </el-form>
    </card>
    <card id="material-area">
      <block><el-button type="success" @click="chooseMaterial">选择物资</el-button></block>
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%">
        <el-table-column fixed prop="goodsId" label="序号" width="50px"></el-table-column>
        <el-table-column prop="goodsCode" label="物料编码"></el-table-column>
        <el-table-column prop="goodsName" label="物料名称"></el-table-column>
        <el-table-column prop="specification" label="规格"></el-table-column>
        <el-table-column prop="modelType" label="型号"></el-table-column>
        <el-table-column prop="measurementName" label="单位"></el-table-column>
        <el-table-column prop="requestAmount" label="申请数量">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.requestAmount" controls-position="right" :min="1" :max="scope.row.amount" style="width: 100px"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="现存量" width="150px"></el-table-column>
        <el-table-column prop="remark" label="备注">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" prop="" label="操作" width="50px">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
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
      <el-button type="primary" class="operation-btn">保存</el-button>
      <el-button type="primary" class="operation-btn">提交</el-button>
      <el-button type="danger" class="operation-btn" @click="cancelDialogVisible = true">取消</el-button>
    </card>
    <!--选择物料弹窗-->
    <el-dialog title="选择物资" :visible.sync="dialogVisible" width="80%">
      <el-input placeholder="请输入搜索信息" v-model="searchInfo" class="search-input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div id="dialog-table">
        <el-table :data="materialData.slice((materialPage-1)*materialPageSize,materialPage*materialPageSize)" ref="multipleTable" tooltip-effect="dark" style="width: 100%">
          <el-table-column fixed type="selection" width="50px"></el-table-column>
          <el-table-column fixed prop="goodsId" label="序号" width="50px"></el-table-column>
          <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
          <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
          <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
          <el-table-column prop="amount" label="现存量" width="150px"></el-table-column>
          <el-table-column prop="inventoryAttributes" label="存货属性" width="150px"></el-table-column>
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
        <el-button type="primary" @click="insert">确 定</el-button>
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
import NavgationBar from '../../../components/NavgationBar.vue'
import Block from '../../../components/Block'
import Card from '../../../components/Card'
import {findAllInvOrg, findAllCenter} from '../../../api/NormalUser/PurchaseReq'
import {addgoodsrequisition, updategoodsrequisition, querygoodsincenter, insertGoods} from '../../../api/NormalUser/MyGoods'

export default {
  beforeMount () {
    let _this = this
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
    // 获取物资申请单主键
    const id = addgoodsrequisition()
    id.then(function (e) {
      try {
        _this.goodsRequisitionCode = e.data.data.goodsRequisitionCode
        _this.goodsRequisitionId = e.data.data.goodsRequisitionId
      } catch (e) {
        console.log('获取数据失败')
      }
    })
  },
  name: 'CreateMaterialReq',
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
      invOrg: [],
      center: [],
      goodsRequisitionCode: '',
      goodsRequisitionId: '',
      // 分页参数
      currentPage: 1,
      pageSize: 6,
      // 弹框分页参数
      materialPage: 1,
      materialPageSize: 6,
      // 表单数据
      form: {
        inventoryOrganizationName: '',
        centerName: '',
        requestType: '',
        createDate: '',
        goodsRequisitionRemark: ''
      },
      // 表格数据
      tableData: [],
      dormitory: []
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
      this.$router.push('/MaterialReq')
    },
    handleCurrentChange (value) {
      this.currentPage = value
    },
    handleMaterialPage (value) {
      this.materialPage = value
    },
    // 保存主要数据
    saveMain () {
      if (this.form.inventoryOrganizationName === '') {
        this.$message.error('请选择库存组织')
      } else if (this.form.centerName === '') {
        this.$message.error('请选择申请部门')
      } else if (this.form.requestType === '') {
        this.$message.error('请选择需求类型')
      } else if (this.form.createDate === '') {
        this.$message.error('请选择申请日期')
      } else {
        let parameter = {
          goodsRequisitionCode: this.goodsRequisitionCode,
          inventoryOrganizationName: this.form.inventoryOrganizationName,
          requestType: this.form.requestType,
          centerName: this.form.centerName,
          departmentName: '部门',
          createDate: this.form.createDate,
          goodsRequisitionRemark: this.form.goodsRequisitionRemark,
          creatorName: '周鹏程'
        }
        console.log(parameter)
        updategoodsrequisition(parameter)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }
    },
    // 选择物资
    chooseMaterial () {
      let _this = this
      let parameter = {centerName: this.form.centerName}
      console.log(parameter)
      const material = querygoodsincenter(parameter)
      material.then(function (e) {
        try {
          _this.dormitory = e.data.data
        } catch (e) {
          console.log('获取数据失败')
        }
      })
      this.dialogVisible = true
    },
    // 插入物资
    insert () {
      this.tableData = this.$refs.multipleTable.selection
      let parameter = []
      for (let i = 0; i < this.tableData.length; i++) {
        let temp = {}
        temp.goodsRequisitionId = this.goodsRequisitionId
        temp.goodsId = this.tableData[i].goodsId
        parameter.push(temp)
      }
      console.log(parameter)
      insertGoods(parameter)
      this.dialogVisible = false
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
