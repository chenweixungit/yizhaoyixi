<template>
  <div>
    <navgation-bar></navgation-bar>
    <!--标签页-->
    <div id="tabs">
      <el-tabs type="border-card">
        <!--销售出库主页面-->
        <el-tab-pane label="销售出库">
          <div style="height: 650px">
            <block>
              <div class="tag-area"><el-tag type="primary" effect="plain" id="tag">销售出库单列表</el-tag></div>
              <el-input placeholder="请输入搜索信息" v-model="saleInfo" class="search-input">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </block>
            <el-table :data="saleData.slice((salePage-1)*salePageSize, salePage*salePageSize)" style="width: 100%">
              <el-table-column fixed prop="saleLeaveId" label="序号" width="50px"></el-table-column>
              <el-table-column prop="saleLeaveCode" label="出库单号" width="150px"></el-table-column>
              <el-table-column prop="inventoryOrganizationName" label="库存组织" width="300px"></el-table-column>
              <el-table-column prop="storageName" label="出库仓库" width="150px"></el-table-column>
              <el-table-column prop="saleType" label="出库分类" width="150px"></el-table-column>
              <el-table-column prop="saleDate" label="出库日期" width="150px"></el-table-column>
              <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
              <el-table-column prop="statusName" label="状态" width="150px"></el-table-column>
              <el-table-column prop="creatorName" label="创建人" width="150px"></el-table-column>
              <el-table-column fixed="right" prop="" label="操作" width="50px">
                <template slot-scope="scope">
                  <el-button size="mini" type="success" icon="el-icon-document" circle @click="checkSaleDetail(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @current-change="handleSalePage"
                layout="total, prev, pager, next, jumper"
                :current-page="salePage"
                :page-size="salePageSize"
                :total="saleData.length">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <!--其他出库主页面-->
        <el-tab-pane label="其他出库">
          <div style="height: 650px">
            <block>
              <div class="tag-area"><el-tag type="primary" effect="plain" id="tag">其他出库单列表</el-tag></div>
              <el-input placeholder="请输入搜索信息" v-model="otherInfo" class="search-input">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </block>
            <el-table :data="otherData.slice((otherPage-1)*otherPageSize, otherPage*otherPageSize)" style="width: 100%">
              <el-table-column fixed prop="otherOutId" label="序号" width="50px"></el-table-column>
              <el-table-column prop="otherOutCode" label="出库单号" width="150px"></el-table-column>
              <el-table-column prop="inventoryOrganizationName" label="库存组织" width="300px"></el-table-column>
              <el-table-column prop="storageName" label="出库仓库" width="150px"></el-table-column>
              <el-table-column prop="outType" label="出库分类" width="150px"></el-table-column>
              <el-table-column prop="outDate" label="出库日期" width="150px"></el-table-column>
              <el-table-column prop="sourceCode" label="来源单据号" width="150px"></el-table-column>
              <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
              <el-table-column prop="statusName" label="状态" width="150px"></el-table-column>
              <el-table-column prop="creatorName" label="创建人" width="150px"></el-table-column>
              <el-table-column prop="createDate" label="创建时间" width="150px"></el-table-column>
              <el-table-column fixed="right" prop="" label="操作" width="50px">
                <template slot-scope="scope">
                  <el-button size="mini" type="success" icon="el-icon-document" circle @click="checkOtherDetail(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @current-change="handleOtherPage"
                layout="total, prev, pager, next, jumper"
                :current-page="otherPage"
                :page-size="otherPageSize"
                :total="otherData.length">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--销售出库详请弹窗-->
    <el-dialog title="详情" :visible.sync="saleDetailsVisible" width="80%">
      <div class="details">
        <el-form :inline="true" ref="form" :model="saleForm" label-width="80px">
          <el-form-item label="库存组织">
            <el-input v-model="saleForm.inventoryOrganizationName" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="出库仓库">
            <el-input v-model="saleForm.storageName" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="出库日期">
            <el-input v-model="saleForm.saleDate" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="出库分类">
            <el-input v-model="saleForm.saleType" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="saleForm.remark" type="textarea" :rows="3" class="remark" placeholder="备注" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="saleDetailData.slice((saleDetailPage-1)*saleDetailPageSize, saleDetailPage*saleDetailPageSize)" style="width: 100%">
          <el-table-column fixed prop="saleLeaveDetailId" label="序号" width="50px"></el-table-column>
          <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
          <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
          <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
          <el-table-column prop="amount" label="数量" width="150px"></el-table-column>
          <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleSaleDetailPage"
          layout="total, prev, pager, next, jumper"
          :current-page="saleDetailPage"
          :page-size="saleDetailPageSize"
          :total="saleDetailData.length">
        </el-pagination>
      </div>
    </el-dialog>
    <!--其他出库详情弹窗-->
    <el-dialog title="详情" :visible.sync="otherDetailsVisible" width="80%">
      <div class="details">
        <el-form :inline="true" ref="form" :model="otherForm" label-width="80px">
          <el-form-item label="库存组织">
            <el-input v-model="otherForm.inventoryOrganizationName" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="出库仓库">
            <el-input v-model="otherForm.storageName" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="出库日期">
            <el-input v-model="otherForm.outDate" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="出库分类">
            <el-input v-model="otherForm.outType" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="otherForm.remark" type="textarea" :rows="3" class="remark" placeholder="备注" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="otherDetailData.slice((otherDetailPage-1)*otherDetailPageSize, otherDetailPage*otherDetailPageSize)" style="width: 100%">
          <el-table-column fixed prop="otherOutId" label="序号" width="50px"></el-table-column>
          <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
          <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
          <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
          <el-table-column prop="amount" label="数量" width="150px"></el-table-column>
          <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleOtherDetailPage"
          layout="total, prev, pager, next, jumper"
          :current-page="otherDetailPage"
          :page-size="otherDetailPageSize"
          :total="otherDetailData.length">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NavgationBar from '../../../components/NavgationBar'
import Block from '../../../components/Block'
import Card from '../../../components/Card'
import {queryAllSaleOut, queryAllOtherOut, queryOtherDetail, queryAllSaleDetail} from '../../../api/NormalUser/MainWarehouse'

export default {
  beforeMount () {
    let _this = this
    // 所有销售入库
    const sale = queryAllSaleOut()
    sale.then(function (e) {
      try {
        _this.saleDormitory = e.data.data
      } catch (e) {
        console.log('获取数据失败')
      }
    })
    // 所有其他入库
    const other = queryAllOtherOut()
    other.then(function (e) {
      try {
        _this.otherDormitory = e.data.data
      } catch (e) {
        console.log('获取数据失败')
      }
    })
  },
  name: 'ExWarehouse',
  components: {
    NavgationBar,
    Block,
    Card
  },
  data () {
    return {
      saleInfo: '',
      otherInfo: '',
      saleDetailsVisible: false,
      otherDetailsVisible: false,
      // 销售出库分页
      salePage: 1,
      salePageSize: 9,
      // 其他出库分页
      otherPage: 1,
      otherPageSize: 9,
      // 销售详情弹窗分页
      saleDetailPage: 1,
      saleDetailPageSize: 7,
      // 其他详情弹窗分页
      otherDetailPage: 1,
      otherDetailPageSize: 7,
      saleDormitory: [],
      otherDormitory: [],
      otherForm: {
        inventoryOrganizationName: '',
        storageName: '',
        outDate: '',
        outType: '',
        remark: ''
      },
      saleForm: {
        inventoryOrganizationName: '',
        storageName: '',
        saleDate: '',
        saleType: '',
        remark: ''
      },
      saleDetailData: [],
      otherDetailData: []
    }
  },
  computed: {
    saleData () {
      const search = this.saleInfo
      if (search) {
        return this.saleDormitory.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.saleDormitory
    },
    otherData () {
      const search = this.otherInfo
      if (search) {
        return this.otherDormitory.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.otherDormitory
    }
  },
  methods: {
    handleSalePage (value) {
      this.salePage = value
    },
    handleOtherPage (value) {
      this.otherPage = value
    },
    handleSaleDetailPage (value) {
      this.saleDetailPage = value
    },
    handleOtherDetailPage (value) {
      this.otherDetailPage = value
    },
    // 其他入库详情
    checkOtherDetail (row) {
      this.otherForm.inventoryOrganizationName = row.inventoryOrganizationName
      this.otherForm.outDate = row.outDate
      this.otherForm.outType = row.outType
      this.otherForm.storageName = row.storageName
      this.otherForm.remark = row.remark
      let _this = this
      let parameter = {otherOutId: row.otherOutId}
      console.log(parameter)
      const otherDetail = queryOtherDetail(parameter)
      otherDetail.then(function (e) {
        try {
          if (e.data.data !== null) {
            _this.otherDetailData = e.data.data
          }
        } catch (e) {
          console.log('获取数据失败')
        }
      })
      this.otherDetailsVisible = true
    },
    // 销售入库详情
    checkSaleDetail (row) {
      this.saleForm.inventoryOrganizationName = row.inventoryOrganizationName
      this.saleForm.saleDate = row.saleDate
      this.saleForm.saleType = row.saleType
      this.saleForm.storageName = row.storageName
      this.saleForm.remark = row.remark
      let _this = this
      let parameter = {saleLeaveCode: row.saleLeaveCode}
      console.log(parameter)
      const otherDetail = queryAllSaleDetail(parameter)
      otherDetail.then(function (e) {
        try {
          if (e.data.data !== null) {
            _this.saleDetailData = e.data.data
          }
        } catch (e) {
          console.log('获取数据失败')
        }
      })
      this.saleDetailsVisible = true
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
