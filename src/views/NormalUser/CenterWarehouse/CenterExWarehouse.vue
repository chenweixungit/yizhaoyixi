<template>
  <div>
    <navgation-bar></navgation-bar>
    <!--标签页-->
    <div id="tabs">
      <el-tabs type="border-card">
        <!--材料出库主页面-->
        <el-tab-pane label="材料出库">
          <div style="height: 650px">
            <block>
              <div class="tag-area">
                <el-tag type="primary" effect="plain" id="tag">材料出库单列表</el-tag>
              </div>
              <el-input placeholder="请输入搜索内容" v-model="materialOutDataInfo" class="search-input">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </block>
            <el-table :data="materialOutDataCom.slice((materialOutCurrentPage - 1) * materialOutPagesize,materialOutCurrentPage * materialOutPagesize)" style="width: 100%">
              <el-table-column fixed prop="goodsOutId" label="序号" width="50px"></el-table-column>
              <el-table-column prop="goodsOutCode" label="出库单号" width="150px"></el-table-column>
              <el-table-column prop="inventoryOrganizationName" label="库存组织" width="300px"></el-table-column>
              <el-table-column prop="storageName" label="出库仓库" width="150px"></el-table-column>
              <el-table-column prop="goodsOutType" label="出库分类" width="150px"></el-table-column>
              <el-table-column prop="goodsOutDate" label="出库日期" width="150px"></el-table-column>
              <el-table-column prop="departmentName" label="申请部门" width="150px"></el-table-column>
              <el-table-column prop="goodsOutRemark" label="备注" width="150px"></el-table-column>
              <el-table-column prop="statusName" label="状态" width="150px"></el-table-column>
              <el-table-column prop="creatorName" label="创建人" width="150px"></el-table-column>
              <el-table-column prop="createDate" label="创建时间" width="150px"></el-table-column>
              <el-table-column fixed="right" prop="" label="操作" width="50px">
                <template slot-scope="scope">
                  <el-button size="mini" type="success" icon="el-icon-document" circle @click="showMaterial(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @current-change="materialOutPageChange"
                :page-size="materialOutPagesize"
                :current-page="materialOutCurrentPage"
                :total="materialOutDataCom.length"
                layout="total, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="销售出库">
          <div style="height: 650px">
            <block>
              <div class="tag-area"><el-tag type="primary" effect="plain" id="tag">销售出库单列表</el-tag></div>
              <el-input placeholder="请输入搜索内容" v-model="saleOutDataInfo" class="search-input">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </block>
            <el-table :data="saleOutDataCom.slice((saleOutCurrentPage - 1) * saleOutPagesize,saleOutCurrentPage * saleOutPagesize)" style="width: 100%">
              <el-table-column fixed prop="saleLeaveId" label="序号" width="50px"></el-table-column>
              <el-table-column prop="saleLeaveCode" label="出库单号" width="150px"></el-table-column>
              <el-table-column prop="inventoryOrganizationName" label="库存组织" width="300px"></el-table-column>
              <el-table-column prop="storageName" label="出库仓库" width="150px"></el-table-column>
              <el-table-column prop="saleType" label="出库分类" width="150px"></el-table-column>
              <el-table-column prop="saleDate" label="出库日期" width="150px"></el-table-column>
              <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
              <el-table-column prop="statusName" label="状态" width="150px"></el-table-column>
              <el-table-column prop="creatorName" label="创建人" width="150px"></el-table-column>
              <el-table-column prop="createDate" label="创建时间" width="200px"></el-table-column>
              <el-table-column fixed="right" prop="" label="操作" width="50px">
                <template slot-scope="scope">
                  <el-button size="mini" type="success" icon="el-icon-document" circle @click="showSale(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @current-change="saleOutPageChange"
                :page-size="saleOutPagesize"
                :current-page="saleOutCurrentPage"
                :total="saleOutDataCom.length"
                layout="total, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <!--其他出库主页面-->
        <el-tab-pane label="其他出库">
          <div style="height: 650px">
            <block>
              <div class="tag-area"><el-tag type="primary" effect="plain" id="tag">其他出库单列表</el-tag></div>
              <el-input placeholder="请输入搜索内容" v-model="otherOutDataInfo" class="search-input">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </block>
            <el-table :data="otherOutDataCom.slice((otherOutCurrentPage - 1) * otherOutPagesize,otherOutCurrentPage * otherOutPagesize)" style="width: 100%">
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
                  <el-button size="mini" type="success" icon="el-icon-document" circle @click="showOther(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @current-change="otherOutPageChange"
                :total="otherOutDataCom.length"
                :page-size="otherOutPagesize"
                :current-page="otherOutCurrentPage"
                layout="total, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
<!--    材料出库单弹框详情-->
    <el-dialog title="详情" :visible.sync="materialDetailsVisible" width="80%">
      <div class="details">
        <el-form :inline="true" ref="form" :model="materialForm" label-width="80px">
          <el-form-item label="库存组织">
            <el-input v-model="materialForm.inventoryOrganizationName" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="出库仓库">
            <el-input v-model="materialForm.storageName" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="出库日期">
            <el-input v-model="materialForm.goodsOutDate" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="出库分类">
            <el-input v-model="materialForm.goodsOutType" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="materialForm.goodsOutRemark" type="textarea" :rows="3" class="remark" placeholder="备注" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="materialOutDialogDataCom.slice((materialOutDialogCurrentPage - 1) * materialOutDialogPagesize,materialOutDialogCurrentPage * materialOutDialogPagesize)" style="width: 100%">
          <el-table-column fixed prop="goodsOutDetailId" label="序号" width="50px"></el-table-column>
          <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
          <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
          <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
          <el-table-column prop="outAmount" label="出库数量" width="150px"></el-table-column>
          <el-table-column prop="nowAmount" label="现有数量" width="150px"></el-table-column>
          <el-table-column prop="goodsOutDetailRemark" label="备注" width="150px"></el-table-column>
        </el-table>
        <el-pagination
          @current-change="materialOutDialogPageChange"
          :page-size="materialOutDialogPagesize"
          :current-page="materialOutDialogCurrentPage"
          :total="materialOutDialogDataCom.length"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </el-dialog>
    <!--销售出库详请弹窗-->
    <el-dialog title="详情" :visible.sync="saleDetailsVisible" width="80%">
      <div class="details">
        <el-form :inline="true" ref="saleForm" :model="saleForm" label-width="80px">
          <el-form-item label="库存组织">
            <el-input v-model="saleForm.inventoryOrganizationName" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="出库仓库">
            <el-input v-model="saleForm.storageName" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="销售日期">
            <el-input v-model="saleForm.saleDate" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="销售类型">
            <el-input v-model="saleForm.saleType" :disabled="true" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="saleForm.remark" type="textarea" :rows="3" class="remark" placeholder="备注" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="saleOutDialogDataCom.slice((saleOutDialogCurrentPage - 1) * saleOutDialogPagesize,saleOutDialogCurrentPage * saleOutDialogPagesize)" style="width: 100%">
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
          @current-change="saleOutDialogPageChange"
          :page-size="saleOutDialogPagesize"
          :current-page="saleOutDialogCurrentPage"
          :total="saleOutDialogDataCom.length"
          layout="total, prev, pager, next, jumper">
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
        <el-table :data="otherOutDialogDataCom.slice((otherOutDialogCurrentPage - 1) * otherOutDialogPagesize,otherOutDialogCurrentPage * otherOutDialogPagesize)" style="width: 100%">
          <el-table-column fixed prop="otherOutDetailId" label="序号" width="50px"></el-table-column>
          <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
          <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
          <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
          <el-table-column prop="amount" label="数量" width="150px"></el-table-column>
          <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
        </el-table>
        <el-pagination
          @current-change="otherOutDialogPageChange"
          :page-size="otherOutDialogPagesize"
          :current-page="otherOutDialogCurrentPage"
          :total="otherOutDialogDataCom.length"
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
import {
  findAllGoodsOut,
  findAllOtherOut,
  findAllSaleOut,
  findGoodsDetailById, findOtherDetailById, findSaleDetailById
} from '../../../api/NormalUser/CenterWarehouse'
export default {
  name: 'CenterExWarehouse',
  components: {
    NavgationBar,
    Block,
    Card
  },
  beforeMount () {
    let _this = this
    const response = findAllGoodsOut()
    response.then(function (e) {
      _this.materialOutData = e.data.data
    })
    const res = findAllSaleOut()
    res.then(function (e) {
      _this.saleOutData = e.data.data
    })
    const resp = findAllOtherOut()
    resp.then(function (e) {
      _this.otherOutData = e.data.data
    })
  },
  computed: {
    materialOutDataCom () {
      const search = this.materialOutDataInfo
      if (search) {
        return this.materialOutData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.materialOutData
    },
    saleOutDataCom () {
      const search = this.saleOutDataInfo
      if (search) {
        return this.saleOutData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.saleOutData
    },
    otherOutDataCom () {
      const search = this.otherOutDataInfo
      if (search) {
        return this.otherOutData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.otherOutData
    },
    materialOutDialogDataCom () {
      return this.materialOutDialogData
    },
    saleOutDialogDataCom () {
      return this.saleOutDialogData
    },
    otherOutDialogDataCom () {
      return this.otherOutDialogData
    }
  },
  data () {
    return {
      materialForm: {
      },
      saleForm: {},
      otherForm: {},
      materialOutDataInfo: '',
      saleOutDataInfo: '',
      otherOutDataInfo: '',
      saleDetailsVisible: false,
      otherDetailsVisible: false,
      materialDetailsVisible: false,
      materialOutData: [],
      materialOutPagesize: 9,
      materialOutCurrentPage: 1,
      saleOutData: [],
      saleOutPagesize: 9,
      saleOutCurrentPage: 1,
      otherOutData: [],
      otherOutPagesize: 9,
      otherOutCurrentPage: 1,
      materialOutDialogData: [],
      materialOutDialogCurrentPage: 1,
      materialOutDialogPagesize: 8,
      saleOutDialogData: [],
      saleOutDialogCurrentPage: 1,
      saleOutDialogPagesize: 8,
      otherOutDialogData: [],
      otherOutDialogPagesize: 8,
      otherOutDialogCurrentPage: 1
    }
  },
  methods: {
    showSale (row) {
      this.saleForm = row
      let _this = this
      const response = findSaleDetailById({saleLeaveCode: row.saleLeaveCode})
      console.log({saleLeaveCode: row.saleLeaveCode})
      response.then(function (e) {
        _this.saleOutDialogData = e.data.data
        _this.saleDetailsVisible = true
      })
    },
    showOther (row) {
      let _this = this
      this.otherForm = row
      const response = findOtherDetailById({otherOutId: row.otherOutId})
      response.then(function (e) {
        _this.otherForm = e.data.data
        _this.otherDetailsVisible = true
      })
    },
    showMaterial (row) {
      this.materialForm = row
      let _this = this
      const response = findGoodsDetailById({goodsOutId: row.goodsOutId})
      console.log({goodsOutId: row.goodsOutId})
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.materialDetailsVisible = true
          _this.materialOutDialogData = e.data.data
        }
      })
    },
    otherOutDialogPageChange (value) {
      this.otherOutDialogCurrentPage = value
    },
    saleOutDialogPageChange (value) {
      this.saleOutDialogCurrentPage = value
    },
    materialOutDialogPageChange (value) {
      this.materialOutDialogCurrentPage = value
    },
    materialOutPageChange (value) {
      this.materialOutCurrentPage = value
    },
    saleOutPageChange (value) {
      this.saleOutCurrentPage = value
    },
    otherOutPageChange (value) {
      this.otherOutCurrentPage = value
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
