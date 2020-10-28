<template>
  <div>
    <navgation-bar id="nav"></navgation-bar>
    <block><el-button type="success" id="create-list" @click="toCreateMaterialReq">新建物资申请单</el-button></block>
    <card>
      <block>
        <div id="tag-area"><el-tag type="primary" effect="plain" id="tag">物资申请单列表</el-tag></div>
        <el-input placeholder="请输入搜索信息" v-model="searchInfo" class="search-input">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </block>
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%">
        <el-table-column fixed prop="goodsRequisitionId" label="序号" width="50px"></el-table-column>
        <el-table-column prop="goodsRequisitionCode" label="申请单号" width="150px"></el-table-column>
        <el-table-column prop="inventoryOrganizationName" label="库存组织" width="300px"></el-table-column>
        <el-table-column prop="requestType" label="需求类型" width="150px"></el-table-column>
        <el-table-column prop="centerName" label="申请部门" width="150px"></el-table-column>
        <el-table-column prop="createDate" label="申请日期" width="150px"></el-table-column>
        <el-table-column prop="goodsRequisitionRemark" label="备注" width="150px"></el-table-column>
        <el-table-column prop="statusName" label="状态" width="150px"></el-table-column>
        <el-table-column prop="creatorName" label="申请人" width="150px"></el-table-column>
        <el-table-column fixed="right" prop="" label="操作" width="100px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.statusName === '草稿'" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button v-if="scope.row.statusName === '已领取' || scope.row.statusName === '待领取'" size="mini" type="success" icon="el-icon-document" @click="dialogVisible = true" circle></el-button>
            <el-button v-if="scope.row.statusName === '草稿'" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            <el-button v-if="scope.row.statusName === '待领取'" size="mini" type="warning" icon="el-icon-check" circle></el-button>
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
            <el-input v-model="form.organization" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item label="申请部门">
            <el-input v-model="form.department" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item label="需求类型">
            <el-input v-model="form.type" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item label="申请日期">
            <el-input v-model="form.date" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.remark" type="textarea" :rows="3" class="remark" :disabled="true" style="width: 1082px"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="detailData.slice((detailPage-1)*detailPageSize,detailPage*detailPageSize)" style="width: 100%">
          <el-table-column fixed prop="orderNum" label="序号" width="50px"></el-table-column>
          <el-table-column prop="materialCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="materialName" label="物料名称" width="150px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
          <el-table-column prop="model" label="型号" width="150px"></el-table-column>
          <el-table-column prop="unit" label="单位" width="150px"></el-table-column>
          <el-table-column prop="amount" label="申请数量" width="150px"></el-table-column>
          <el-table-column prop="stock" label="现存量" width="150px"></el-table-column>
          <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
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
import {getAllMaterialReq} from '../../../api/NormalUser/MyGoods'

export default {
  beforeMount () {
    let _this = this
    const materialReq = getAllMaterialReq()
    materialReq.then(function (e) {
      _this.dormitory = e.data.data
    })
  },
  name: 'MaterialRequisition',
  components: {
    NavgationBar,
    Block,
    Card
  },
  data () {
    return {
      dialogVisible: false,
      searchInfo: '',
      // 申请表单分页参数
      currentPage: 1,
      pageSize: 7,
      // 详情弹框分页参数
      detailPage: 1,
      detailPageSize: 7,
      // 申请表单数据
      dormitory: [],
      form: {
        organization: '',
        department: '',
        type: '',
        date: '',
        remark: ''
      },
      detailData: []
    }
  },
  computed: {
    // 表单数据总数
    total () {
      return this.dormitory.length
    },
    // 详情弹框数据总量
    detailTotal () {
      return this.detailData.length
    },
    // 模糊查询
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
    toCreateMaterialReq () {
      this.$router.push('/CreateMaterialReq')
    },
    handleCurrentChange (value) {
      this.currentPage = value
    },
    handleDetailDataPage (value) {
      this.detailPage = value
    }
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
