<template>
  <div>
    <navgation-bar></navgation-bar>
    <card id="select-area">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="库存组织">
          <el-select placeholder="请选择库存组织" v-model="form.filterName" class="selector">
            <el-option label="" value=""></el-option>
            <el-option v-for="(item,index) in organizations" :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库">
          <el-select placeholder="选择仓库" v-model="form.filterStorageName" class="selector">
            <el-option label="" value=""></el-option>
            <el-option v-for="(item,index) in warehouses" :key="index" :value="item.storageName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="搜索">
          <el-input  placeholder="请输入物料编码/名称" v-model="searchInfo" class="selector">
            <el-button  slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </card>
    <card id="material-area">
      <el-table :data="tableData.slice((tableCurrentPage - 1) * tablePageSize ,tableCurrentPage * tablePageSize)" style="width: 100%">
        <el-table-column prop="inventoryOrganizationName" label="库存组织" width="300px"></el-table-column>
        <el-table-column prop="storageName" label="仓库" width="150px"></el-table-column>
        <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
        <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
        <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
        <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
        <el-table-column prop="amount" label="现存量" width="150px"></el-table-column>
        <el-table-column prop="storagePrice" label="库存单价" width="150px"></el-table-column>
        <el-table-column prop="storageMoney" label="库存金额" width="150px"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="tablePageSize"
          :current-page="tableCurrentPage"
          :total="tableData.length"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </card>
  </div>
</template>

<script>
import NavgationBar from '../../../components/NavgationBar'
import Card from '../../../components/Card'
import Block from '../../../components/Block'
import {findAllGoods, findAllInventoryOrganization, findAllWarehouseByOrganization} from '../../../api/NormalUser/SearchGoods'
export default {
  name: 'SearchGoods',
  components: {
    NavgationBar,
    Card,
    Block
  },
  beforeMount () {
    let _this = this
    const response = findAllGoods()
    response.then(function (e) {
      _this.dormitory = e.data.data
    })
    const res = findAllInventoryOrganization()
    res.then(function (e) {
      _this.organizations = e.data.data
    })
  },
  computed: {
    total () {
      return ''
    },
    tableData () {
      const search = this.searchInfo
      if (search) {
        return this.dormitory.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      if (this.form.filterName && this.form.filterStorageName) {
        return this.dormitory.filter(temp => {
          // eslint-disable-next-line eqeqeq
          return temp['inventoryOrganizationName'] == this.form.filterName && temp['storageName'] == this.form.filterStorageName
        })
      } else if (this.form.filterName) {
        return this.dormitory.filter(temp => {
          // eslint-disable-next-line eqeqeq
          return temp['inventoryOrganizationName'] == this.form.filterName
        })
      } else if (this.form.filterStorageName) {
        return this.dormitory.filter(temp => {
          // eslint-disable-next-line eqeqeq
          return temp['storageName'] == this.form.filterStorageName
        })
      }
      return this.dormitory
    }
  },
  data () {
    return {
      form: {},
      tableCurrentPage: 1,
      tablePageSize: 10,
      dialogVisible: false,
      cancelDialogVisible: false,
      searchInfo: '',
      dormitory: [
      ],
      // 库存组织下拉数据
      organizations: [
      ],
      // 仓库下拉数据
      warehouses: [
      ],
      // 用于筛选的库存组织
      filterName: '',
      // 用于筛选的仓库名
      filterStorageName: ''
    }
  },
  methods: {
    handleCurrentChange (value) {
      this.tableCurrentPage = value
    },
    turnBack () {
      this.$router.push('/saleManage')
    }
  },
  watch: {
    'form.filterName': {
      handler (newName, oldName) {
        console.log(newName)
        let _this = this
        let Para = {inventoryOrganizationName: newName}
        const response = findAllWarehouseByOrganization(Para)
        response.then(function (e) {
          console.log(e.data.data)
          _this.warehouses = e.data.data
        })
      },
      immediate: true,
      deep: true
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
    margin-top 10px
    height 90px
  .selector
    width 230px
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
  .operation-btn
    position relative
    left 900px
    top 320px
  #dialog-table
    height 400px
  .dialog-pagination
    float left
  .search-input
    width 300px
    float right
</style>
