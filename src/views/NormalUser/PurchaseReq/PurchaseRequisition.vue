<template>
  <div id="purchase-requisition">
    <navgation-bar></navgation-bar>
    <block><el-button type="success" id="create-list" @click="toCreatePurchaseReq">新建请购单</el-button></block>
    <!--请购单信息-->
    <card>
      <block>
        <div id="tag-area"><el-tag type="primary" effect="plain" id="tag">请购单列表</el-tag></div>
        <el-input placeholder="请输入查询信息" v-model="searchInfo" class="search-input">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </block>
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%">
        <el-table-column fixed prop="id" label="序号" width="50px"></el-table-column>
        <el-table-column prop="code" label="请购单号" width="150px"></el-table-column>
        <el-table-column prop="inventoryOrganizationName" label="库存组织" width="300px"></el-table-column>
        <el-table-column prop="requestType" label="需求类型" width="150px"></el-table-column>
        <el-table-column prop="centerName" label="申请部门" width="150px"></el-table-column>
        <el-table-column prop="date" label="请购日期" width="150px"></el-table-column>
        <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
        <el-table-column prop="statusName" label="状态" width="150px"></el-table-column>
        <el-table-column prop="creatorName" label="创建人" width="150px"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="150px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100px">
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.statusName === '草稿'" @click="edit(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button size="mini" v-if="scope.row.statusName === '已审批' || scope.row.statusName === '已关闭'"
                       type="success" icon="el-icon-document" @click="showDetails(scope.row)" circle></el-button>
            <el-button size="mini" v-if="scope.row.statusName === '已审批'" @click="closePurchaseReq(scope.row)" type="warning" icon="el-icon-close" circle></el-button>
            <el-button size="mini" v-if="scope.row.statusName === '草稿'" @click="deletePurchaseReq(scope)" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
    </card>
    <!--详情弹框-->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="80%">
      <div class="details">
        <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item label="库存组织">
            <el-input v-model="form.inventoryOrganizationName" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item label="申请部门">
            <el-input v-model="form.centerName" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item label="需求类型">
            <el-input v-model="form.requestType" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item label="申请日期">
            <el-input v-model="form.date" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.remark" type="textarea" :rows="3" class="remark" :disabled="true" style="width: 1082px"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="detailData.slice((detailPage-1)*detailPageSize,detailPage*detailPageSize)" style="width: 100%">
          <el-table-column fixed prop="goodsCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
          <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
          <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
          <el-table-column prop="requestAmount" label="请购数量" width="150px"></el-table-column>
          <el-table-column prop="amount" label="现存量" width="150px"></el-table-column>
          <el-table-column prop="goodsRemark" label="备注" width="150px"></el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleDetailDataPage"
          layout="total, prev, pager, next, jumper"
          :current-page="detailPage"
          :page-size="detailPageSize"
          :total="detailTotal">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NavgationBar from '../../../components/NavgationBar.vue'
import Block from '../../../components/Block'
import Card from '../../../components/Card'
import {findPurReq, getPurReqDetails, getPurReqGoodsDetails, deletePurReq, closePurReq} from '../../../api/NormalUser/PurchaseReq'
import store from '../../../store/store'

export default {
  beforeMount () {
    store.dispatch('changePurchaseState', 0)
    let _this = this
    const purReq = findPurReq()
    purReq.then(function (e) {
      try {
        _this.dormitory = e.data.data
        console.log(_this.dormitory)
      } catch (e) {
        console.log('获取数据失败')
      }
    })
  },
  name: 'PurchaseRequisition',
  data () {
    return {
      // 详情弹窗的显示参数
      dialogVisible: false,
      // 请购单模糊查询
      searchInfo: '',
      // 请购单分页参数
      pageSize: 7,
      currentPage: 1,
      // 详情弹框分页参数
      detailPage: 1,
      detailPageSize: 13,
      // 详情页面表单信息
      form: {
        inventoryOrganizationName: '',
        centerName: '',
        requestType: '',
        date: '',
        remark: ''
      },
      dormitory: [],
      detailData: []
    }
  },
  computed: {
    // 请购单表格数据量
    total () {
      return this.tableData.length
    },
    // 详情弹框表格数据量
    detailTotal () {
      return this.detailData.length
    },
    // 表格模糊查询
    tableData () {
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
    toCreatePurchaseReq () {
      this.$router.push('/CreatePurchaseReq')
    },
    handleCurrentChange (value) {
      this.currentPage = value
    },
    handleDetailDataPage (value) {
      this.detailPage = value
    },
    // 获取请购单详情
    showDetails (row) {
      let _this = this
      let parameter = {id: ''}
      parameter.id = row.id
      console.log(parameter)
      const purReqDetails = getPurReqDetails(parameter)
      purReqDetails.then(function (e) {
        _this.form = e.data.data
      })
      const purReqGoodsDetails = getPurReqGoodsDetails(parameter)
      purReqGoodsDetails.then(function (e) {
        _this.detailData = e.data.data
      })
      this.dialogVisible = true
    },
    // 删除请购单
    deletePurchaseReq (scope) {
      let parameter = {id: scope.row.id}
      deletePurReq(parameter)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.dormitory.splice(scope.$index, 1)
    },
    // 关闭请购单
    closePurchaseReq (row) {
      let _this = this
      let parameter = {
        id: row.id,
        closeMan: '周鹏程',
        closeDate: '2020-01-14',
        closeReason: ''
      }
      const response = closePurReq(parameter)
      response.then(function (e) {
        const purReq = findPurReq()
        purReq.then(function (e) {
          try {
            _this.dormitory = e.data.data
            console.log(_this.dormitory)
          } catch (e) {
            console.log('获取数据失败')
          }
          _this.$message({
            message: '关闭成功',
            type: 'success'
          })
        })
      })
    },
    // 编辑
    edit (row) {
      let _this = this
      store.dispatch('changePurchaseState', 1)
      console.log(store.state.purchaseState)
      let parameter = {id: ''}
      parameter.id = row.id
      const purReqDetails = getPurReqDetails(parameter)
      purReqDetails.then(function (e) {
        try {
          store.dispatch('changePurchaseReq', e.data.data)
          console.log(store.state.purchaseReq)
        } catch (e) {
          console.log('获取数据失败')
        }
        const purReqGoodsDetails = getPurReqGoodsDetails(parameter)
        purReqGoodsDetails.then(function (e) {
          try {
            store.dispatch('changePurchaseGoods', e.data.data)
          } catch (e) {
            console.log('获取数据失败')
          }
          if (store.state.purchaseReq !== null && store.state.purchaseGoods !== null) {
            _this.$router.push('/CreatePurchaseReq')
          }
        })
      })
    }
  },
  components: {
    NavgationBar,
    Block,
    Card
  }
}
</script>

<style lang="stylus" scoped>
#create-list
  margin-top 10px
  position relative
  left 100px
.search-input
  width 300px
  height 40px
  float right
#tag-area
  width 200px
  float left
.details
  height 600px
.details-input
  width 180px
</style>
