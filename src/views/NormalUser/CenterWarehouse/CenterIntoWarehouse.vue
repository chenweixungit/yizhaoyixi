<template>
  <div>
    <navgation-bar></navgation-bar>
    <!--标签页-->
    <div id="tabs">
      <el-tabs type="border-card" :value="tabSelection">
        <!--其他入库主页面-->
        <el-tab-pane label="其他入库" name="其他入库">
          <div style="height: 650px">
            <block><el-button type="success" id="create-list" @click="toCreateOtherInto">新建其他入库单</el-button></block>
            <block>
              <div class="tag-area"><el-tag type="primary" effect="plain" id="tag">其他入库单列表</el-tag></div>
              <el-input placeholder="请输入搜索内容" v-model="searchInfo" class="search-input">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </block>
            <el-table :data="tableDataCom.slice((tableCurrentPage-1)*tablePageSize,tableCurrentPage*tablePageSize)" style="width: 100%">
              <el-table-column fixed prop="otherInId" label="序号" width="50px"></el-table-column>
              <el-table-column prop="otherInCode" label="入库单编号" width="150px"></el-table-column>
              <el-table-column prop="inventoryOrganizationName" label="库存组织" width="300px"></el-table-column>
              <el-table-column prop="storageName" label="入库仓库" width="150px"></el-table-column>
              <el-table-column prop="type" label="入库类型" width="150px"></el-table-column>
              <el-table-column prop="date" label="入库日期" width="150px"></el-table-column>
              <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
              <el-table-column prop="statusName" label="状态" width="150px"></el-table-column>
              <el-table-column prop="creatorName" label="创建人" width="150px"></el-table-column>
              <el-table-column prop="createDate" label="创建时间" width="150px"></el-table-column>
              <el-table-column fixed="right" prop="" label="操作" width="100px">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.statusName === '草稿'" size="mini" type="primary" icon="el-icon-edit" @click="editDetail(scope.row)" circle></el-button>
                  <el-button v-if="scope.row.statusName === '已审批'" size="mini" type="success" icon="el-icon-document" circle @click="lookDetail(scope.row)"></el-button>
                  <el-button v-if="scope.row.statusName === '草稿'" size="mini" type="danger" icon="el-icon-delete" @click="deleteDetail(scope)" circle></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @current-change="handleCurrentChange"
                :page-size="tablePageSize"
                :current-page="tableCurrentPage"
                :total="tableDataCom.length"
                layout="total, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--采购入库详请弹窗-->
    <el-dialog title="详情" :visible.sync="otherDetailsVisible" width="1200px">
      <div class="details">
        <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item label="库存组织">
            <el-input v-model="form.inventoryOrganizationName" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="入库仓库">
            <el-input v-model="form.storageName" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="入库日期">
            <el-input v-model="form.date" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="入库类型">
            <el-input :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="textarea" :rows="3" class="remark" placeholder="备注" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="detailDialogData.slice((detailDialogCurrentPage - 1) * detailDialogPageSize ,detailDialogCurrentPage * detailDialogPageSize)" style="width: 100%">
          <el-table-column fixed prop="otherInDetailId" label="序号" width="50px"></el-table-column>
          <el-table-column prop="goodsId" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
          <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
          <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
          <el-table-column prop="amount" label="应收数量" width="150px"></el-table-column>
          <el-table-column prop="realAmount" label="实收数量" width="150px"></el-table-column>
          <el-table-column prop="noTaxPrice" label="无税单价" width="150px"></el-table-column>
          <el-table-column prop="noTaxMoney" label="无税金额" width="150px"></el-table-column>
        </el-table>
        <el-pagination
          @current-change="dialogCurrentChange"
          :page-size="detailDialogPageSize"
          :current-page="detailDialogCurrentPage"
          :total="detailDialogData.length"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NavgationBar from '../../../components/NavgationBar'
import Block from '../../../components/Block'
import Card from '../../../components/Card'
import {createOtherIn, deleteOtherIn, findAllOtherIn, findOtherInDetail} from '../../../api/NormalUser/CenterWarehouse'
export default {
  beforeMount () {
    let _this = this
    const response = findAllOtherIn()
    response.then(function (e) {
      _this.dormitory = e.data.data
    })
  },
  name: 'CenterIntoWarehouse',
  components: {
    NavgationBar,
    Block,
    Card
  },
  computed: {
    // 表格模糊查询
    tableDataCom () {
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
  data () {
    return {
      form: [],
      tableData: [],
      tablePageSize: 8,
      tableCurrentPage: 1,
      detailDialogData: [],
      detailDialogPageSize: 6,
      detailDialogCurrentPage: 1,
      searchInfo: '',
      pageSize: 7,
      currentPage: 1,
      dormitory: [
      ],
      otherDetailsVisible: false,
      tabSelection: '其他入库'
    }
  },
  methods: {
    deleteDetail (scope) {
      for (let i = 0; i < this.dormitory.length; i++) {
        if (this.dormitory[i].otherInId === scope.row.otherInId) {
          this.dormitory.splice(scope.$index, 1)
          console.log('delete')
        }
      }
      const response = deleteOtherIn({otherInId: scope.row.otherInId})
      response.then(function (e) {
      })
    },
    editDetail (row) {
      this.$store.dispatch('setCenterOtherInState', 1)
      this.$store.dispatch('setCenterOtherInHead', {otherInId: row.otherInId})
      this.$router.push('/CenterCreateOtherInto')
    },
    dialogCurrentChange (value) {
      this.detailDialogCurrentPage = value
    },
    lookDetail (row) {
      this.otherDetailsVisible = true
      this.form = row
      let _this = this
      const response = findOtherInDetail({otherInId: row.otherInId})
      response.then(function (e) {
        _this.detailDialogData = e.data.data
      })
    },
    handleCurrentChange (value) {
      this.tableCurrentPage = value
    },
    toCreateOtherInto () {
      let _this = this
      const response = createOtherIn()
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.$store.dispatch('setCenterOtherInState', 0)
          _this.$store.dispatch('setCenterOtherInHead', {otherInId: e.data.data})
          _this.$router.push('CenterCreateOtherInto')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  #tabs
    width 1250px
    margin-left 100px
  #create-list
    margin-top 10px
  .search-input
    width 300px
    height 40px
    float right
  #tag-area
    width 200px
    float left
  .details
    height 600px
  .remark
    width 1073px
    position relative
    left 10px
</style>
