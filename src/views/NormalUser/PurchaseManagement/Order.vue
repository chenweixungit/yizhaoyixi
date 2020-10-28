<template>
  <div>
    <navgation-bar></navgation-bar>
    <!--选择方式按钮-->
    <block>
      <el-button type="success" id="create-list" @click="pickPurReq">按请购单</el-button>
      <el-button type="success" id="create-list" @click="pickContract">按采购合同</el-button>
    </block>
    <!--采购订单列表-->
    <card>
      <block>
        <div id="tag-area"><el-tag type="primary" effect="plain" id="tag">采购订单列表</el-tag></div>
        <el-input placeholder="请输入搜索信息" v-model="searchInfo" class="search-input">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </block>
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%">
        <el-table-column fixed prop="orderId" label="序号" width="50px"></el-table-column>
        <el-table-column prop="orderCode" label="订单编号" width="150px"></el-table-column>
        <el-table-column prop="inventoryOrganizationName" label="库存组织" width="300px"></el-table-column>
        <el-table-column prop="supplierName" label="供应商" width="150px"></el-table-column>
        <el-table-column prop="orderDate" label="订单日期" width="150px"></el-table-column>
        <el-table-column prop="haxTaxMoney" label="价税合计" width="150px"></el-table-column>
        <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
        <el-table-column prop="contractCode" label="来源合同" width="150px"></el-table-column>
        <el-table-column prop="statusName" label="状态" width="150px"></el-table-column>
        <el-table-column prop="creatorName" label="创建人" width="150px"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="150px"></el-table-column>
        <el-table-column fixed="right" prop="" label="操作" width="50px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.statusName === '草稿'" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button v-if="scope.row.statusName === '已审批'" size="mini" type="success" icon="el-icon-document" @click="showDetails(scope.row)" circle></el-button>
            <el-button v-if="scope.row.statusName === '草稿'" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
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
    <!--按照请购单弹窗-->
    <el-dialog title="选择请购单" :visible.sync="dialogVisible" width="80%">
      <el-input placeholder="请输入搜索信息" v-model="reqInfo" class="search-input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div id="dialog-table">
        <el-table :data="reqData.slice((reqPage-1)*reqPageSize, reqPage*reqPageSize)" ref="multipleTable" tooltip-effect="dark" style="width: 100%">
          <el-table-column fixed type="selection" width="55px"></el-table-column>
          <el-table-column fixed prop="goodsId" label="序号" width="55px"></el-table-column>
          <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
          <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
          <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
          <el-table-column prop="requestAmount" label="请购数量" width="150px"></el-table-column>
          <el-table-column prop="amount" label="现存量" width="150px"></el-table-column>
          <el-table-column prop="purchaseReqCode" label="请购单号" width="150px"></el-table-column>
          <el-table-column prop="creatorName" label="申请人" width="150px"></el-table-column>
          <el-table-column prop="centerName" label="申请部门" width="150px"></el-table-column>
          <el-table-column prop="purchaseReqDate" label="请购日期" width="150px"></el-table-column>
          <el-table-column prop="purchaseReqRemark" label="备注" width="150px"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-pagination
          @current-change="handleReqPage"
          layout="total, prev, pager, next, jumper"
          class="dialog-pagination"
          :current-page="reqPage"
          :page-size="reqPageSize"
          :total="reqData.length">
        </el-pagination>
        <el-button type="primary" @click="createByPurReq">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--按照采购合同弹窗-->
    <el-dialog title="选择采购合同" :visible.sync="contractDialogVisible" width="80%">
      <el-input placeholder="请输入搜索信息" v-model="contractInfo" class="search-input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div id="contract-table">
        <el-table :data="contractData.slice((contractPage-1)*contractPageSize, contractPage*contractPageSize)" ref="multipleTable2" tooltip-effect="dark" style="width: 100%">
          <el-table-column fixed type="selection" width="50px"></el-table-column>
          <el-table-column fixed prop="contractId" label="序号" width="50px"></el-table-column>
          <el-table-column prop="contractCode" label="合同编号"></el-table-column>
          <el-table-column prop="contractName" label="合同名称"></el-table-column>
          <el-table-column prop="supplierName" label="供应商"></el-table-column>
          <el-table-column prop="contractDate" label="合同签订日期"></el-table-column>
          <el-table-column prop="money" label="合同金额"></el-table-column>
          <el-table-column prop="contractRemark" label="备注"></el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleContractPage"
          layout="total, prev, pager, next, jumper"
          class="dialog-pagination"
          :current-page="contractPage"
          :page-size="contractPageSize"
          :total="contractData.length">
        </el-pagination>
        <el-button type="primary" style="position: relative; left: 700px; top: 10px" @click="showDetail">确 定</el-button>
      </div>
      <div id="material-table">
        <el-table :data="materialData.slice((materialPage-1)*materialPageSize, materialPage*materialPageSize)" tooltip-effect="dark" style="width: 100%">
          <el-table-column fixed prop="goodsId" label="序号" width="55px"></el-table-column>
          <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
          <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
          <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
          <el-table-column prop="amount" label="数量" width="150px"></el-table-column>
          <el-table-column prop="taxRate" label="税率" width="150px"></el-table-column>
          <el-table-column prop="hasTaxPrice" label="含税单价" width="150px"></el-table-column>
          <el-table-column prop="noTaxPrice" label="无税单价" width="150px"></el-table-column>
          <el-table-column prop="hasTaxMoney" label="含税金额" width="150px"></el-table-column>
          <el-table-column prop="noTaxMoney" label="无税金额" width="150px"></el-table-column>
          <el-table-column prop="taxMoney" label="税额" width="150px"></el-table-column>
          <el-table-column prop="contractGoodsRemark" label="备注" width="150px"></el-table-column>
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
          <el-button type="primary" @click="byContract">确 定</el-button>
          <el-button @click="contractDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--详情弹框-->
    <el-dialog title="详情" :visible.sync="detailVisible" width="80%">
      <div class="details">
        <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item label="库存组织">
            <el-input v-model="form.inventoryOrganizationName" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item label="供应商">
            <el-input v-model="form.supplierName" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item label="订单日期">
            <el-input v-model="form.orderDate" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item label="价税合计">
            <el-input v-model="form.haxTaxMoney" :disabled="true" class="details-input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.remark" type="textarea" :rows="3" class="remark" :disabled="true" style="width: 1082px"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="detailData.slice((detailPage-1)*detailPageSize,detailPage*detailPageSize)" style="width: 100%">
          <el-table-column fixed prop="orderDetailId" label="序号" width="50px"></el-table-column>
          <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
          <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
          <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
          <el-table-column prop="amount" label="数量" width="150px"></el-table-column>
          <el-table-column prop="taxRate" label="税率" width="150px"></el-table-column>
          <el-table-column prop="hasTaxPrice" label="含税单价" width="150px"></el-table-column>
          <el-table-column prop="noTaxPrice" label="无税单价" width="150px"></el-table-column>
          <el-table-column prop="hasTaxMoney" label="含税金额" width="150px"></el-table-column>
          <el-table-column prop="noTaxMoney" label="无税金额" width="150px"></el-table-column>
          <el-table-column prop="taxMoney" label="税额" width="150px"></el-table-column>
          <el-table-column prop="goodsRemark" label="备注" width="150px"></el-table-column>
          <el-table-column prop="purchaseReqCode" label="订单号" width="150px"></el-table-column>
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
import {
  queryAllOrder,
  queryPurReq,
  newOrderByPurchaseReq,
  saveMainInfo,
  queryContract,
  queryContractDetailById,
  newOrderByContract,
  queryOrderDetail
} from '../../../api/NormalUser/PurchaseManagement'

export default {
  beforeMount () {
    let _this = this
    // 获取所有的采购订单
    const allOrder = queryAllOrder()
    allOrder.then(function (e) {
      try {
        _this.dormitory = e.data.data
      } catch (e) {
        console.log('获取数据失败')
      }
    })
  },
  name: 'Order',
  components: {
    NavgationBar,
    Block,
    Card
  },
  data () {
    return {
      searchInfo: '',
      reqInfo: '',
      contractInfo: '',
      dialogVisible: false,
      contractDialogVisible: false,
      detailVisible: false,
      // 订单分页
      currentPage: 1,
      pageSize: 6,
      // 请购单弹窗分页
      reqPage: 1,
      reqPageSize: 6,
      // 合同弹窗分页
      contractPage: 1,
      contractPageSize: 3,
      materialPage: 1,
      materialPageSize: 5,
      // 详情弹窗分页
      detailPage: 1,
      detailPageSize: 7,
      dormitory: [],
      reqDormitory: [],
      contractDormitory: [],
      materialData: [],
      detailData: [],
      form: {
        inventoryOrganizationName: '',
        supplierName: '',
        orderDate: '',
        haxTaxMoney: '',
        remark: ''
      }
    }
  },
  computed: {
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
    },
    reqData () {
      const search = this.reqInfo
      if (search) {
        return this.reqDormitory.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.reqDormitory
    },
    contractData () {
      const search = this.contractInfo
      if (search) {
        return this.contractDormitory.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.contractDormitory
    }
  },
  methods: {
    handleReqPage (value) {
      this.reqPage = value
    },
    handleContractPage (value) {
      this.contractPage = value
    },
    handleMaterialPage (value) {
      this.materialPage = value
    },
    handleDetailDataPage (value) {
      this.detailPage = value
    },
    handleCurrentChange (value) {
      this.currentPage = value
    },
    // 选择请购单
    pickPurReq () {
      let _this = this
      let parameter = {inventoryOrganizationName: '艺朝艺夕教育科技集团有限公司'}
      const purReq = queryPurReq(parameter)
      purReq.then(function (e) {
        try {
          _this.reqDormitory = e.data.data
        } catch (e) {
          console.log('获取数据失败')
        }
        _this.dialogVisible = true
      })
    },
    // 按请购单生成
    createByPurReq () {
      let _this = this
      let select = this.$refs.multipleTable.selection
      let parameter = []
      for (let i = 0; i < select.length; i++) {
        let temp = {}
        temp.requestAmount = select[i].requestAmount
        temp.goodsCode = select[i].goodsCode
        temp.purchaseReqCode = select[i].purchaseReqCode
        temp.purchaseReqRemark = select[i].purchaseReqRemark
        parameter.push(temp)
      }
      console.log(parameter)
      const response = newOrderByPurchaseReq(parameter)
      response.then(function (e) {
        let parameter2 = {
          inventoryOrganizationName: '艺朝艺夕教育科技集团有限公司',
          creatorName: '周鹏程'
        }
        const response = saveMainInfo(parameter2)
        response.then(function (e) {
          const allOrder = queryAllOrder()
          allOrder.then(function (e) {
            try {
              _this.dormitory = e.data.data
            } catch (e) {
              console.log('获取数据失败')
            }
            _this.dialogVisible = false
          })
        })
      })
    },
    // 选择合同
    pickContract () {
      let _this = this
      let parameter = {inventoryOrganizationName: '艺朝艺夕教育科技集团有限公司'}
      const contract = queryContract(parameter)
      contract.then(function (e) {
        try {
          _this.contractDormitory = e.data.data
        } catch (e) {
          console.log('获取数据失败')
        }
        _this.contractDialogVisible = true
      })
    },
    // 显示合同详情
    showDetail () {
      let _this = this
      let parameter = {contractId: 2}
      console.log(parameter)
      const details = queryContractDetailById(parameter)
      details.then(function (e) {
        try {
          _this.materialData = e.data.data
        } catch (e) {
          console.log('获取数据失败')
        }
      })
    },
    // 按合同生成采购订单
    byContract () {
      let _this = this
      let parameter = {
        contractId: 2,
        creatorName: '周鹏程'
      }
      const response = newOrderByContract(parameter)
      response.then(function (e) {
        const allOrder = queryAllOrder()
        allOrder.then(function (e) {
          try {
            _this.dormitory = e.data.data
          } catch (e) {
            console.log('获取数据失败')
          }
          _this.contractDialogVisible = false
        })
      })
    },
    // 查询明细
    showDetails (row) {
      this.form.inventoryOrganizationName = row.inventoryOrganizationName
      this.form.supplierName = row.supplierName
      this.form.orderDate = row.orderDate
      this.form.haxTaxMoney = row.haxTaxMoney
      this.form.remark = row.remark
      let _this = this
      let parameter = {orderId: row.orderId}
      console.log(parameter)
      const details = queryOrderDetail(parameter)
      details.then(function (e) {
        try {
          if (e.data.data !== null) {
            _this.detailData = e.data.data
          }
        } catch (e) {
          console.log('获取数据失败')
        }
        _this.detailVisible = true
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
  #dialog-table
    height 400px
  #contract-table
    height 300px
  #material-table
    height 300px
  .dialog-pagination
    float left
  .details
    height 600px
  .details-input
    width 180px
</style>
