<template>
  <div>
    <navgation-bar id="nav"></navgation-bar>
    <block><el-button type="success" id="create-list" @click="toCreateMaterialReq">新建销售单</el-button></block>
    <card>
      <block>
        <div id="tag-area"><el-tag type="primary" effect="plain" id="tag">销售单列表</el-tag></div>
        <el-input placeholder="请输入搜索内容" v-model="searchInfo" class="search-input">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </block>
      <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%">
        <el-table-column fixed prop="id" label="序号" width="50px" ></el-table-column>
        <el-table-column prop="saleCode" label="申请订单号" width="150px"></el-table-column>
        <el-table-column prop="inventoryOrganizationName" label="库存组织" width="250px"></el-table-column>
        <el-table-column prop="saleType" label="订单类型" width="150px"></el-table-column>
        <el-table-column prop="customerName" label="客户" width="150px"></el-table-column>
        <el-table-column prop="saleDate" label="订单日期" width="150px"></el-table-column>
        <el-table-column prop="storageName" label="发货仓来" width="150px"></el-table-column>
        <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
        <el-table-column prop="statusName" label="状态" width="150px"></el-table-column>
        <el-table-column prop="creatorName" label="创建人" width="150px"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="150px"></el-table-column>
        <el-table-column fixed="right" prop="" label="操作" width="100px">
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.statusName === '草稿' " type="primary" icon="el-icon-edit" circle @click="editData(scope.row)"></el-button>
            <el-button size="mini" v-if="scope.row.statusName === '已审批' " type="success" icon="el-icon-document" circle @click="showDetails(scope.row)"></el-button>
            <el-button size="mini" v-if="scope.row.statusName === '草稿' " type="danger" icon="el-icon-delete" circle @click="deleteSale(scope.row)"></el-button>
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
    </card>
    <!--    详细订单弹框-->
    <el-dialog title="订单详情" :visible.sync="detailsVisible" width="80%">
      <div class="details">
        <el-table :data="detailData" style="width: 100%">
          <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称" width="100px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="100px"></el-table-column>
          <el-table-column prop="modelType" label="型号" width="100px"></el-table-column>
          <el-table-column prop="measurementName" label="单位" width="100px"></el-table-column>
          <el-table-column prop="amount" label="订购数量" width="100px"></el-table-column>
          <el-table-column prop="taxRate" label="税率" width="100px"></el-table-column>
          <el-table-column prop="hasTaxPrice" label="含税单价" width="100px"></el-table-column>
          <el-table-column prop="noTaxPrice" label="无税单价" width="100px"></el-table-column>
          <el-table-column prop="hasTaxMoney" label="含税金额" width="100px"></el-table-column>
          <el-table-column prop="noTaxMoney" label="无税金额" width="100px"></el-table-column>
          <el-table-column prop="taxMoney" label="税额" width="100px"></el-table-column>
          <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="dialogCurrentPage"
          :page-size="dialogPageSize"
          :total="detailData.length"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Block from '../../../components/Block'
import Card from '../../../components/Card'
import NavgationBar from '../../../components/NavgationBar'
import {findAllSale,
  findSaleByCode,
  saveSale,
  deleteByCode
} from '../../../api/NormalUser/SaleManagement'
import store from '../../../store/store'
export default {
  beforeMount () {
    let _this = this
    const saleResource = findAllSale()
    saleResource.then(function (e) {
      try {
        _this.dormitory = e.data.data
      } catch (e) {
        console.log('获取数据失败')
      }
    })
  },
  name: 'SaleManage',
  components: {
    Block,
    Card,
    NavgationBar
  },
  methods: {
    // 新建销售订单
    toCreateMaterialReq () {
      let myDate = new Date()
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
      let Para = {creatorName: store.state.userInfo.username, createDate: now}
      let _this = this
      console.log(Para)
      const response = saveSale(Para)
      response.then(function (e) {
        console.log(e.data.message)
        if (e.data.message === '添加成功') {
          _this.$store.dispatch('setNewSaleOrder', e.data.data)
          _this.$router.push('/CreateSaleReq')
          _this.$store.dispatch('setSaleOrderState', 0)
        }
      })
    },
    handleCurrentChange (value) {
      this.currentPage = value
    },
    // 点击详情按钮显示订单明细
    showDetails (row) {
      let _this = this
      let tansferData = {saleCode: ''}
      tansferData.saleCode = row.saleCode.toString()
      this.detailsVisible = true
      const orderDetail = findSaleByCode(row)
      orderDetail.then(function (e) {
        console.log(e.data.data)
        _this.detailData = e.data.data
      })
    },
    // 编辑选中一行的数据
    editData (row) {
      this.$store.dispatch('setSaleOrderState', 1)
      // 选中的一行数据存储到本地
      this.$store.dispatch('setCurrentSaleOrder', row)
      this.$router.push('/CreateSaleReq')
    },
    // 删除一行
    deleteSale (row) {
      let para = {saleCode: row.saleCode}
      let _this = this
      const response = deleteByCode(para)
      response.then(function (e) {
        _this.dormitory = e.data.data
      })
    }
  },
  data () {
    return {
      searchInfo: '',
      dormitory: [],
      currentPage: 1,
      pageSize: 6,
      detailsVisible: false,
      // 弹框详情
      detailData: [],
      dialogCurrentPage: 1,
      dialogPageSize: 6
    }
  },
  computed: {
    total () {
      return this.tableData.length
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
</style>
