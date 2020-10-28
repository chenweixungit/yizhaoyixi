<template>
 <div>
   <navgation-bar></navgation-bar>
   <Block><el-button type="success" id="back" @click="turnBack">返回</el-button></Block>
   <!--手动选择区域-->
   <card id="select-area">
     <el-form :inline="true" ref="form" :model="form" label-width="100px">
       <el-form-item label="库存组织">
         <el-select v-model="form.inventoryOrganizationName" placeholder="请选择库存组织" class="selector">
           <el-option v-for="(item, index) in invOrg" :key="index" :value="item.name"></el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="合同名称">
         <el-input v-model="form.contractName" placeholder="请填写合同名称"></el-input>
       </el-form-item>
       <el-form-item label="供应商">
         <el-select v-model="form.supplierName" placeholder="请选择供应商" class="selector">
           <el-option v-for="(item, index) in supplier" :key="index" :value="item.name"></el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="签订日期">
         <el-date-picker v-model="form.date" type="date" value-format="yyyy-MM-dd" placeholder="请选择签订日期" style="width: 82%;"></el-date-picker>
       </el-form-item>
       <el-form-item label="合同有效期" style="position: relative; right: 43px">
         <el-date-picker v-model="form.endDate" type="date" value-format="yyyy-MM-dd" placeholder="请选则合同有效期" style="width: 87%;"></el-date-picker>
       </el-form-item>
       <el-form-item label="合同总额" style="position: relative; right: 74px">
         <el-input v-model="form.total" placeholder="含税金额总额" :disabled="true" style="width: 94%;"></el-input>
       </el-form-item>
       <el-form-item>
         <el-input v-model="form.remark" type="textarea" :rows="3" class="remark" placeholder="备注"></el-input>
       </el-form-item>
       <el-button type="primary" id="save-btn" @click="saveMain">保存</el-button>
     </el-form>
   </card>
   <!--选择请购单区域-->
   <card id="material-area">
     <block><el-button type="success" @click="choosePurReq">选择请购单</el-button></block>
     <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%">
       <el-table-column fixed prop="goodsId" label="序号" width="50px"></el-table-column>
       <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
       <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
       <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
       <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
       <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
       <el-table-column prop="requestAmount" label="请购数量" width="150px">
         <template v-slot="slotProps">
           <el-input-number v-model="slotProps.row.requestAmount" style="width: 100px" controls-position="right" :min="1" :max="50"></el-input-number>
         </template>
       </el-table-column>
       <el-table-column prop="taxRate" label="税率" width="150px">
         <template v-slot="slotProps">
           <el-input-number v-model="slotProps.row.taxRate" style="width: 100px" controls-position="right" :min="13" :max="16"></el-input-number>
         </template>
       </el-table-column>
       <el-table-column prop="hasTaxPrice" label="含税单价" width="150px">
         <template v-slot="slotProps">
           <el-input-number v-model="slotProps.row.hasTaxPrice" style="width: 100px" controls-position="right" :min="1"></el-input-number>
         </template>
       </el-table-column>
       <el-table-column prop="noTaxPrice" label="无税单价" width="100px">
         <template v-slot="slotProps">
           {{slotProps.row.noTaxPrice=(slotProps.row.hasTaxPrice / (1.0 + slotProps.row.taxRate / 100.0)).toFixed(2)}}
         </template>
       </el-table-column>
       <el-table-column prop="hasTaxMoney" label="含税金额" width="100px">
         <template v-slot="slotProps">
           {{slotProps.row.hasTaxMoney = (slotProps.row.hasTaxPrice * slotProps.row.requestAmount).toFixed(2)}}
         </template>
       </el-table-column>
       <el-table-column prop="noTaxMoney" label="无税金额" width="100px">
         <template v-slot="slotProps">
           {{slotProps.row.noTaxMoney = (slotProps.row.noTaxPrice * slotProps.row.requestAmount).toFixed(2)}}
         </template>
       </el-table-column>
       <el-table-column prop="taxMoney" label="税额" width="100px">
         <template v-slot="slotProps">
           {{slotProps.row.taxMoney = (slotProps.row.hasTaxMoney - slotProps.row.noTaxMoney).toFixed(2)}}
         </template>
       </el-table-column>
       <el-table-column prop="goodsRemark" label="备注" width="150px">
         <template slot-scope="scope">
           <el-input v-model="scope.row.goodsRemark"></el-input>
         </template>
       </el-table-column>
       <el-table-column fixed="right" prop="" label="操作" width="50px">
         <template slot-scope="scope">
           <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteGoods(scope)" circle></el-button>
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
     <el-button type="primary" class="operation-btn" @click="saveAll">保存</el-button>
     <el-button type="primary" class="operation-btn" @click="commitAll">提交</el-button>
     <el-button type="danger" class="operation-btn" @click="cancelDialogVisible = true">取消</el-button>
   </card>
   <!--增加付款协议-->
<!--   <card id="add-agreement">-->
<!--     <block><el-button type="success" @click="addAgreement">增加付款协议</el-button></block>-->
<!--     <el-table :data="agreementData.slice((agreementPage-1)*agreementPageSize, agreementPage*agreementPageSize)" style="width: 100%">-->
<!--       <el-table-column fixed prop="orderNum" label="序号" width="50px"></el-table-column>-->
<!--       <el-table-column prop="batch" label="付款批次">-->
<!--         <template slot-scope="scope">-->
<!--           <el-input-number v-model="scope.row.batch" controls-position="right" :min="1" :max="100" style="width: 100px"></el-input-number>-->
<!--         </template>-->
<!--       </el-table-column>-->
<!--       <el-table-column prop="proportion" label="付款比例">-->
<!--         <template slot-scope="scope">-->
<!--           <el-input-number v-model="scope.row.proportion" controls-position="right" :min="0" :max="1" style="width: 100px"></el-input-number>-->
<!--         </template>-->
<!--       </el-table-column>-->
<!--       <el-table-column prop="amount" label="付款金额">-->
<!--         <template slot-scope="scope">-->
<!--           <el-input-number v-model="scope.row.amount" controls-position="right" :min="1" style="width: 100px"></el-input-number>-->
<!--         </template>-->
<!--       </el-table-column>-->
<!--       <el-table-column prop="date" label="计划付款日期">-->
<!--         <template slot-scope="scope">-->
<!--           <el-date-picker v-model="scope.row.date" type="date" placeholder="请选择日期" style="width: 80%"></el-date-picker>-->
<!--         </template>-->
<!--       </el-table-column>-->
<!--       <el-table-column prop="prePay" label="是否预付款">-->
<!--         <template slot-scope="scope">-->
<!--           <el-select v-model="scope.row.prePay" placeholder="是否预付款" class="selector" style="width: 80%">-->
<!--             <el-option value="是"></el-option>-->
<!--             <el-option value="否"></el-option>-->
<!--           </el-select>-->
<!--         </template>-->
<!--       </el-table-column>-->
<!--       <el-table-column prop="remark" label="备注">-->
<!--         <template slot-scope="scope">-->
<!--           <el-input v-model="scope.row.remark"></el-input>-->
<!--         </template>-->
<!--       </el-table-column>-->
<!--       <el-table-column fixed="right" prop="" label="操作" width="50px">-->
<!--         <template slot-scope="scope">-->
<!--           <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>-->
<!--         </template>-->
<!--       </el-table-column>-->
<!--     </el-table>-->
<!--     <div class="pagination">-->
<!--       <el-pagination-->
<!--         @current-change="handleAgreementPage"-->
<!--         layout="total, prev, pager, next, jumper"-->
<!--         :current-page="agreementPage"-->
<!--         :page-size="agreementPageSize"-->
<!--         :total="agreementData.length">-->
<!--       </el-pagination>-->
<!--     </div>-->
<!--   </card>-->
<!--   &lt;!&ndash;上传附件&ndash;&gt;-->
<!--   <card id="upload">-->
<!--     <block><el-button type="success" @click="11">上传附件</el-button></block>-->
<!--     <el-table :data="appendixData.slice((appendixPage-1)*appendixPageSize, appendixPage*appendixPageSize)" style="width: 100%">-->
<!--       <el-table-column fixed prop="orderNum" label="序号" width="50px"></el-table-column>-->
<!--       <el-table-column prop="appendixName" label="附件名称"></el-table-column>-->
<!--       <el-table-column prop="time" label="上传时间"></el-table-column>-->
<!--       <el-table-column prop="person" label="上传人"></el-table-column>-->
<!--       <el-table-column fixed="right" prop="" label="操作" width="50px">-->
<!--         <template slot-scope="scope">-->
<!--           <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>-->
<!--         </template>-->
<!--       </el-table-column>-->
<!--     </el-table>-->
<!--     <div class="pagination">-->
<!--       <el-pagination-->
<!--         @current-change="handleAppendixPage"-->
<!--         layout="total, prev, pager, next, jumper"-->
<!--         :current-page="appendixPage"-->
<!--         :page-size="appendixPageSize"-->
<!--         :total="appendixData.length">-->
<!--       </el-pagination>-->
<!--     </div>-->
<!--   </card>-->
   <!--选择请购单弹框-->
   <el-dialog title="选择请购单" :visible.sync="dialogVisible" width="80%">
     <el-input placeholder="请输入搜索信息" v-model="searchInfo" class="search-input">
       <el-button slot="append" icon="el-icon-search"></el-button>
     </el-input>
     <div id="dialog-table">
       <el-table :data="materialData.slice((materialPage-1)*materialPageSize, materialPage*materialPageSize)" ref="multipleTable" tooltip-effect="dark" style="width: 100%">
         <el-table-column fixed type="selection" width="50px"></el-table-column>
         <el-table-column fixed prop="goodsId" label="序号" width="50px"></el-table-column>
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
   <!--点击取消时的确认弹框-->
   <el-dialog title="确认取消创建" :visible.sync="cancelDialogVisible" width="30%" center>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="turnBack">确 定</el-button>
      </span>
   </el-dialog>
 </div>
</template>

<script>
import NavgationBar from '../../../components/NavgationBar'
import Block from '../../../components/Block'
import Card from '../../../components/Card'
import {findAllInvOrg} from '../../../api/NormalUser/PurchaseReq'
import {getAllSupplier} from '../../../api/common'
import {getContractId, saveContractMain, choosePurchaseReq, insertContractGoods, deleteContractDetail, updateContractStatus, updateContractGoodsDetail} from '../../../api/NormalUser/PurchaseManagement'
import store from '../../../store/store'
export default {
  beforeMount () {
    let _this = this
    if (store.state.contractState === 1) {
      this.form = store.state.contractMain
      this.tableData = store.state.contractGoods
      this.contractId = store.state.contractMain.id
    } else {
      // 获取合同编号
      const contractId = getContractId()
      contractId.then(function (e) {
        try {
          _this.contractId = e.data.data
        } catch (e) {
          console.log('获取数据失败')
        }
      })
    }
    // 获取库存组织
    const invOrg = findAllInvOrg()
    invOrg.then(function (e) {
      try {
        _this.invOrg = e.data.data
      } catch (e) {
        console.log('获取数据失败')
      }
    })
    // 获取所有供应商
    const supplier = getAllSupplier()
    supplier.then(function (e) {
      try {
        _this.supplier = e.data.data
      } catch (e) {
        console.log('获取数据失败')
      }
    })
  },
  name: 'CreateContract',
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
      contractId: '',
      invOrg: [],
      supplier: [],
      // 选择请购单分页
      currentPage: 1,
      pageSize: 6,
      // 添加协议分页
      agreementPage: 1,
      agreementPageSize: 3,
      // 上传附件分页
      appendixPage: 1,
      appendixPageSize: 4,
      // 物料弹窗分页
      materialPage: 1,
      materialPageSize: 6,
      // 表单数字
      form: {
        inventoryOrganizationName: '',
        contractName: '',
        supplierName: '',
        date: '',
        endDate: '',
        total: 0,
        remark: ''
      },
      // 选择请购单数据
      tableData: [],
      // // 添加协议数据
      // agreementData: [],
      // // 上传数据
      // appendixData: [],
      // 物料弹窗数据
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
      this.$router.push('/Contract')
    },
    handleCurrentChange (value) {
      this.currentPage = value
    },
    // handleAgreementPage (value) {
    //   this.agreementPage = value
    // },
    // addAgreement () {
    //   this.agreementData.push(1)
    // },
    // handleAppendixPage (value) {
    //   this.appendixPage = value
    // },
    handleMaterialPage (value) {
      this.materialPage = value
    },
    // 保存主明细数据
    saveMain () {
      if (this.form.inventoryOrganizationName === '') {
        this.$message.error('请先选择库存组织')
      } else if (this.form.contractName === '') {
        this.$message.error('请先填写合同名称')
      } else if (this.form.supplierName === '') {
        this.$message.error('请先选择供应商')
      } else if (this.form.date === '') {
        this.$message.error('请先选择签订日期')
      } else if (this.form.endDate === '') {
        this.$message.error('请先选择合同有效期')
      } else {
        let total = 0
        for (let i = 0; i < this.tableData.length; i++) {
          if (!isNaN(this.tableData[i].hasTaxMoney)) {
            total += parseFloat(this.tableData[i].hasTaxMoney)
          }
          this.form.total = total
        }
        let parameter = {
          id: '',
          inventoryOrganizationName: '',
          contractName: '',
          supplierName: '',
          date: '',
          total: '',
          creatorName: '',
          endDate: '',
          remark: ''
        }
        parameter.id = this.contractId
        parameter.inventoryOrganizationName = this.form.inventoryOrganizationName
        parameter.contractName = this.form.contractName
        parameter.supplierName = this.form.supplierName
        parameter.date = this.form.date
        parameter.total = this.form.total
        parameter.creatorName = '周鹏程'
        parameter.endDate = this.form.endDate
        parameter.remark = this.form.remark
        console.log(parameter)
        saveContractMain(parameter)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }
    },
    // 根据库存组织选择请购单
    choosePurReq () {
      if (this.form.inventoryOrganizationName === '') {
        this.$message.error('请先选择库存组织')
      } else {
        let _this = this
        let parameter = {inventoryOrganizationName: this.form.inventoryOrganizationName}
        const purReqData = choosePurchaseReq(parameter)
        console.log(purReqData)
        purReqData.then(function (e) {
          try {
            _this.dormitory = e.data.data
          } catch (e) {
            console.log('获取数据失败')
          }
          _this.dialogVisible = true
        })
      }
    },
    // 插入物料
    insert () {
      let _this = this
      this.tableData = this.$refs.multipleTable.selection
      this.tableData.taxRate = 13
      this.tableData.hasTaxPrice = 0
      let parameter = []
      for (let i = 0; i < this.tableData.length; i++) {
        let temp = {}
        temp.id = this.contractId
        temp.goodsId = this.tableData[i].goodsId
        temp.requestAmount = this.tableData[i].requestAmount
        temp.purchaseReqRemark = this.tableData[i].purchaseReqRemark
        temp.purchaseReqCode = this.tableData[i].purchaseReqCode
        parameter.push(temp)
      }
      console.log(parameter)
      const response = insertContractGoods(parameter)
      response.then(function (e) {
        _this.dialogVisible = false
      })
    },
    // 删除某条物料
    deleteGoods (scope) {
      let parameter = {id: this.contractId, goodsId: ''}
      parameter.goodsId = scope.row.goodsId
      console.log(parameter)
      deleteContractDetail(parameter)
      this.tableData.splice(scope.$index, 1)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    // 保存所有
    saveAll () {
      let _this = this
      if (this.form.inventoryOrganizationName === '') {
        this.$message.error('请先选择库存组织')
      } else if (this.form.contractName === '') {
        this.$message.error('请先填写合同名称')
      } else if (this.form.supplierName === '') {
        this.$message.error('请先选择供应商')
      } else if (this.form.date === '') {
        this.$message.error('请先选择签订日期')
      } else if (this.form.endDate === '') {
        this.$message.error('请先选择合同有效期')
      } else {
        let total = 0
        for (let i = 0; i < this.tableData.length; i++) {
          if (!isNaN(this.tableData[i].hasTaxMoney)) {
            total += parseFloat(this.tableData[i].hasTaxMoney)
          }
          this.form.total = total
        }
        let parameter = {
          id: '',
          inventoryOrganizationName: '',
          contractName: '',
          supplierName: '',
          date: '',
          total: '',
          creatorName: '',
          endDate: '',
          remark: ''
        }
        parameter.id = this.contractId
        parameter.inventoryOrganizationName = this.form.inventoryOrganizationName
        parameter.contractName = this.form.contractName
        parameter.supplierName = this.form.supplierName
        parameter.date = this.form.date
        parameter.total = this.form.total
        parameter.creatorName = '周鹏程'
        parameter.endDate = this.form.endDate
        parameter.remark = this.form.remark
        console.log(parameter)
        const response = saveContractMain(parameter)
        response.then(function (e) {
          // 更新明细
          let detailParameter = []
          for (let i = 0; i < _this.tableData.length; i++) {
            let temp = {}
            temp.id = _this.contractId
            temp.goodsId = _this.tableData[i].goodsId
            temp.taxRate = _this.tableData[i].taxRate
            temp.hasTaxPrice = _this.tableData[i].hasTaxPrice
            temp.noTaxPrice = _this.tableData[i].noTaxPrice
            temp.hasTaxMoney = _this.tableData[i].hasTaxMoney
            temp.noTaxMoney = _this.tableData[i].noTaxMoney
            temp.taxMoney = _this.tableData[i].taxMoney
            temp.goodsRemark = _this.tableData[i].goodsRemark
            detailParameter.push(temp)
          }
          console.log(detailParameter)
          const response = updateContractGoodsDetail(detailParameter)
          response.then(function (e) {
            // 更新状态
            let statusParameter = {id: _this.contractId, statusId: 3}
            console.log(statusParameter)
            updateContractStatus(statusParameter)
            _this.$message({
              message: '保存成功',
              type: 'success'
            })
          })
        })
      }
    },
    // 提交所有
    commitAll () {
      let _this = this
      if (this.form.inventoryOrganizationName === '') {
        this.$message.error('请先选择库存组织')
      } else if (this.form.contractName === '') {
        this.$message.error('请先填写合同名称')
      } else if (this.form.supplierName === '') {
        this.$message.error('请先选择供应商')
      } else if (this.form.date === '') {
        this.$message.error('请先选择签订日期')
      } else if (this.form.endDate === '') {
        this.$message.error('请先选择合同有效期')
      } else {
        let total = 0
        for (let i = 0; i < this.tableData.length; i++) {
          if (!isNaN(this.tableData[i].hasTaxMoney)) {
            total += parseFloat(this.tableData[i].hasTaxMoney)
          }
          this.form.total = total
        }
        let parameter = {
          id: '',
          inventoryOrganizationName: '',
          contractName: '',
          supplierName: '',
          date: '',
          total: '',
          creatorName: '',
          endDate: '',
          remark: ''
        }
        parameter.id = this.contractId
        parameter.inventoryOrganizationName = this.form.inventoryOrganizationName
        parameter.contractName = this.form.contractName
        parameter.supplierName = this.form.supplierName
        parameter.date = this.form.date
        parameter.total = this.form.total
        parameter.creatorName = '周鹏程'
        parameter.endDate = this.form.endDate
        parameter.remark = this.form.remark
        console.log(parameter)
        const response = saveContractMain(parameter)
        response.then(function (e) {
          // 更新明细
          let detailParameter = []
          for (let i = 0; i < _this.tableData.length; i++) {
            let temp = {}
            temp.id = _this.contractId
            temp.goodsId = _this.tableData[i].goodsId
            temp.taxRate = _this.tableData[i].taxRate
            temp.hasTaxPrice = _this.tableData[i].hasTaxPrice
            temp.noTaxPrice = _this.tableData[i].noTaxPrice
            temp.hasTaxMoney = _this.tableData[i].hasTaxMoney
            temp.noTaxMoney = _this.tableData[i].noTaxMoney
            temp.taxMoney = _this.tableData[i].taxMoney
            temp.goodsRemark = _this.tableData[i].goodsRemark
            detailParameter.push(temp)
          }
          console.log(detailParameter)
          const response = updateContractGoodsDetail(detailParameter)
          response.then(function (e) {
            // 更新状态
            let statusParameter = {id: _this.contractId, statusId: 4}
            console.log(statusParameter)
            const response = updateContractStatus(statusParameter)
            response.then(function (e) {
              _this.$router.push('/Contract')
            })
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
    height 290px
  .selector
    width 195px
  .remark
    width 1140px
    position relative
    left 30px
  .save
    position relative
    left 220px
    top 35px
  #material-area
    margin-top 10px
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
  #add-agreement
    margin-top 10px
    height 400px
  #upload
    margin-top 10px
    height 470px
  #save-btn
    float right
    margin-right 40px
</style>
