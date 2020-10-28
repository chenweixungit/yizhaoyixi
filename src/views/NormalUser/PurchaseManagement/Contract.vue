<template>
  <div>
    <navgation-bar></navgation-bar>
    <block><el-button type="success" id="create-list" @click="toCreateContract">新建合同</el-button></block>
    <card>
      <block>
        <div id="tag-area"><el-tag type="primary" effect="plain" id="tag">采购合同列表</el-tag></div>
        <el-input placeholder="请输入搜索信息" v-model="searchInfo" class="search-input">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </block>
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%">
        <el-table-column fixed prop="id" label="序号" width="50px"></el-table-column>
        <el-table-column prop="contractCode" label="合同编号" width="150px"></el-table-column>
        <el-table-column prop="inventoryOrganizationName" label="库存组织" width="300px"></el-table-column>
        <el-table-column prop="contractName" label="合同名称" width="150px"></el-table-column>
        <el-table-column prop="supplierName" label="供应商" width="150px"></el-table-column>
        <el-table-column prop="date" label="签订日期" width="150px"></el-table-column>
        <el-table-column prop="total" label="合同总额" width="150px"></el-table-column>
        <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
        <el-table-column prop="statusName" label="状态" width="150px"></el-table-column>
        <el-table-column prop="creatorName" label="创建人" width="150px"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="150px"></el-table-column>
        <el-table-column fixed="right" prop="" label="操作" width="100px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.statusName === '草稿'" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)" circle></el-button>
            <el-button v-if="scope.row.statusName === '已审批'" size="mini" type="success" icon="el-icon-document"  @click="getDetails(scope.row)" circle></el-button>
            <el-button v-if="scope.row.statusName === '草稿'" size="mini" type="danger" icon="el-icon-delete" @click="deleteIt(scope)" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="tableData.length">
      </el-pagination>
    </card>
    <!--详情弹框-->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="80%">
      <div class="details">
        <el-form :inline="true" ref="form" :model="form" label-width="100px">
          <el-form-item label="库存组织">
            <el-input v-model="form.organization" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item label="合同名称">
            <el-input v-model="form.contractName" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item label="供应商">
            <el-input v-model="form.supplier" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item label="签订日期">
            <el-input v-model="form.date" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item label="合同总额">
            <el-input v-model="form.sum" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.remark" type="textarea" :rows="3" class="remark" :disabled="true" style="width: 1082px"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="detailData.slice((detailPage-1)*detailPageSize,detailPage*detailPageSize)" style="width: 100%">
          <el-table-column fixed prop="goodsId" label="序号" width="50px"></el-table-column>
          <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
          <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
          <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
          <el-table-column prop="requestAmount" label="数量" width="150px"></el-table-column>
          <el-table-column prop="taxRate" label="税率" width="150px"></el-table-column>
          <el-table-column prop="hasTaxPrice" label="含税单价" width="150px"></el-table-column>
          <el-table-column prop="noTaxPrice" label="无税单价" width="150px"></el-table-column>
          <el-table-column prop="hasTaxMoney" label="含税金额" width="150px"></el-table-column>
          <el-table-column prop="noTaxMoney" label="无税金额" width="150px"></el-table-column>
          <el-table-column prop="taxMoney" label="税额" width="150px"></el-table-column>
          <el-table-column prop="goodsRemark" label="备注" width="150px"></el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleDetailDataPage"
          layout="total, prev, pager, next, jumper"
          :current-page="detailPage"
          :page-size="detailPageSize"
          :total="detailData.length">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NavgationBar from '../../../components/NavgationBar'
import Block from '../../../components/Block'
import Card from '../../../components/Card'
import {getAllContract, deleteContract, queryContractDetail} from '../../../api/NormalUser/PurchaseManagement'
import store from '../../../store/store'
export default {
  beforeMount () {
    store.dispatch('changeContractState', 0)
    let _this = this
    const contract = getAllContract()
    contract.then(function (e) {
      try {
        _this.dormitory = e.data.data
      } catch (e) {
        console.log('获取数据失败')
      }
    })
  },
  name: 'Contract',
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
      detailPageSize: 6,
      // 申请表单数据
      dormitory: [],
      form: {
        organization: '',
        contractName: '',
        supplier: '',
        date: '',
        sum: '',
        remark: ''
      },
      detailData: []
    }
  },
  computed: {
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
    toCreateContract () {
      this.$router.push('/CreateContract')
    },
    handleCurrentChange (value) {
      this.currentPage = value
    },
    handleDetailDataPage (value) {
      this.detailPage = value
    },
    // 删除某条合同
    deleteIt (scope) {
      let parameter = {id: scope.row.id}
      console.log(parameter)
      deleteContract(parameter)
      this.dormitory.splice(scope.$index, 1)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    // 获取详情信息
    getDetails (row) {
      let _this = this
      this.form.organization = row.inventoryOrganizationName
      this.form.contractName = row.contractName
      this.form.supplier = row.supplierName
      this.form.date = row.date
      this.form.sum = row.total
      this.form.remark = row.remark
      let parameter = {id: row.id}
      console.log(parameter)
      const details = queryContractDetail(parameter)
      details.then(function (e) {
        try {
          _this.detailData = e.data.data
        } catch (e) {
          console.log('获取数据出错')
        }
        _this.dialogVisible = true
      })
    },
    // 编辑
    edit (row) {
      let _this = this
      store.dispatch('changeContractState', 1)
      let contractMainData = {}
      contractMainData.inventoryOrganizationName = row.inventoryOrganizationName
      contractMainData.contractName = row.contractName
      contractMainData.supplierName = row.supplierName
      contractMainData.date = row.date
      contractMainData.endDate = row.date
      contractMainData.total = row.total
      contractMainData.remark = row.remark
      contractMainData.id = row.id
      store.dispatch('changeContractMain', contractMainData)
      let parameter = {id: row.id}
      console.log(parameter)
      const details = queryContractDetail(parameter)
      details.then(function (e) {
        try {
          store.dispatch('changeContractGoods', e.data.data)
        } catch (e) {
          console.log('获取数据出错')
        }
        _this.$router.push('/CreateContract')
      })
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
