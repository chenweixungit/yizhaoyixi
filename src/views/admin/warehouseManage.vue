<template>
  <el-container>
    <el-header><admin-navigation></admin-navigation></el-header>
    <el-main class="main_container">
      <el-row type="flex" justify="start">
        <el-col :span="4"><el-input v-model="searchInput" placeholder="请输入要搜索的内容"
                                    prefix-icon="el-icon-search" size="medium"></el-input></el-col>
        <el-col :span="1"></el-col>
        <el-col :span="2"><el-button type="success" size="medium">确认</el-button></el-col>
        <el-col :span="16"></el-col>
        <el-col :span="1"><el-button type="success" size="medium" @click="dialogVisible = true">添加</el-button></el-col>
      </el-row>
    </el-main>
    <card>
      <div class="container-table">
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  stripe :default-sort="{prop: 'data', order: 'descending'}">
          <el-table-column prop="inventoryOrganizationName" label="所属组织" width="150px">
          </el-table-column>
          <el-table-column prop="storageCode" label="仓库编码" width="150px">
          </el-table-column>
          <el-table-column prop="storageName" label="仓库名称" width="150px">
          </el-table-column>
          <el-table-column prop="storageCenterId" label="所属中心" width="150px">
          </el-table-column>
          <el-table-column prop="brandName" label="所属品牌" width="150px">
          </el-table-column>
          <el-table-column prop="storageRemark" label="备注" width="150px">
          </el-table-column>
          <el-table-column prop="storageCreatorName" label="创建人" sortable width="150px">
          </el-table-column>
          <el-table-column prop="storageCreateDate" label="创建时间" sortable width="150px">
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="250px" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
              <el-button type="danger" v-if="scope.row.storageStatusName === '启用'" size="mini" @click="handleEnd(scope.$index,scope.row)">停用</el-button>
              <el-button type="success" v-if="scope.row.storageStatusName === '停用'" size="mini" @click="handleStart(scope.$index,scope.row)">启用</el-button>
              <el-button type="danger"  size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="fy"
                       layout="total, prev, pager, next, jumper"
                       @current-change="current_change"
                       :total="tableDataCom.length"
                       :page-size="pagesize"
                       :current-page="currentPage"
                       background
        >
        </el-pagination>
      </div>
    </card>
    <el-dialog title="新建客户" :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属组织">
          <el-input v-model="form.organization"></el-input>
        </el-form-item>
        <el-form-item label="仓库编码">
          <el-input v-model="form.warehouseCode"></el-input>
        </el-form-item>
        <el-form-item label="仓库名称">
          <el-input v-model="form.warehouseName"></el-input>
        </el-form-item>
        <el-form-item label="所属中心">
          <el-select v-model="form.center" placeholder="活动区域">
            <el-option label="重量" value="重量"></el-option>
            <el-option label="数量" value="数量"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属品牌">
          <el-select v-model="form.brand" placeholder="活动区域">
            <el-option label="存货" value="存货"></el-option>
            <el-option label="固定资产" value="固定资产"></el-option>
            <el-option label="费用" value="费用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="form.creator"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.time" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.desc" maxlength="200" rows="6" placeholder="最多输入200字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onSubmit">立即创建</el-button>
          <el-button type="success" @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import Card from '../../components/Card'
import AdminNavigation from '../../components/adminNavigation'
import {
  findAllStorage,
  stopStorage,
  startStorage,
  deleteStorage
} from '../../api/admin'
export default {
  beforeMount () {
    const response = findAllStorage()
    let _this = this
    response.then(function (e) {
      _this.tableData = e.data.data
      console.log(e.data)
    })
  },
  name: 'warehouseManage',
  components: {
    AdminNavigation,
    Card
  },
  computed: {
    tableDataCom () {
      const search = this.searchInput
      if (search) {
        return this.tableData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.tableData
    }
  },
  data () {
    return {
      dialogVisible: false,
      searchInput: '',
      total: 17, // 默认数据总数
      pagesize: 9, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      istag: true,
      input: '',
      tableData: [
        {
        }
      ],
      form: {
        organization: '', // 所属组织
        warehouseCode: '', // 仓库编码
        warehouseName: '', // 仓库名称
        center: '', // 所属中心
        brand: '', // 所属品牌
        creator: '', // 创建人
        date: '', // 创建日期
        time: '', // 创建时间
        desc: '' // 备注
      }
    }
  },
  methods: {
    current_change (val) {
      this.currentPage = val
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleStart (index, row) { // 启用
      const response = startStorage({storageId: row.storageId})
      let _this = this
      response.then(function (e) {
        console.log(e.data)
        if (e.data.code === 0) {
          for (let i = 0; i < _this.tableData.length; i++) {
            if (row.storageId === _this.tableData[i].storageId) {
              _this.tableData[i].storageStatusName = '启用'
              console.log(_this.tableData[i].storageStatusName)
            }
          }
        }
      })
    },
    handleEnd (index, row) { // 停用
      const response = stopStorage({storageId: row.storageId})
      let _this = this
      response.then(function (e) {
        console.log(e.data)
        if (e.data.code === 0) {
          for (let i = 0; i < _this.tableData.length; i++) {
            if (row.storageId === _this.tableData[i].storageId) {
              _this.tableData[i].storageStatusName = '停用'
              console.log(_this.tableData[i].storageStatusName)
            }
          }
        }
      })
    },
    handleDelete (index, row) {
      const response = deleteStorage({storageId: row.storageId})
      let _this = this
      response.then(function (e) {
        console.log(e.data)
        if (e.data.code === 0) {
          _this.tableData = e.data.data
          _this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          _this.$message({
            message: '删除失败',
            type: 'danger'
          })
        }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    onSubmit (done) { // 表单提交函数
      this.$confirm('确认提交？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main_container
    width 1260px
    margin 0 auto
</style>
