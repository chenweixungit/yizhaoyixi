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
        <el-col :span="1"><el-button type="success" size="medium" @click="addCenter">添加</el-button></el-col>
      </el-row>
    </el-main>
    <card>
      <div class="container-table">
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  stripe :default-sort="{prop: 'data', order: 'descending'}">
          <el-table-column prop="centerName" label="中心" fixed>
          </el-table-column>
          <el-table-column prop="inventoryOrganizationName" label="库存组织" width="250px">
          </el-table-column>
          <el-table-column prop="remark" label="备注">
          </el-table-column>
          <el-table-column prop="creatorName" label="创建人" sortable>
          </el-table-column>
          <el-table-column prop="createDate" label="创建时间" sortable>
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="250px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
              <el-button type="danger" v-if="scope.row.statusName === '启用'" size="mini" @click="handleEnd(scope.$index,scope.row)">停用</el-button>
              <el-button type="success" v-if="scope.row.statusName === '停用'" size="mini" @click="handleStart(scope.$index,scope.row)">启用</el-button>
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
    <el-dialog title="新建中心" :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.centerName"></el-input>
        </el-form-item>
        <el-form-item label="库存组织">
          <el-select v-model="form.inventoryOrganizationName" placeholder="所在库存组织">
            <el-option v-for="(item,index) in inventoryOrganizations" :key="index" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="form.creatorName"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期" v-model="form.createDate" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark" maxlength="200" rows="6" placeholder="最多输入200字"></el-input>
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
  findAllCenter,
  findAllInventoryOrganization,
  insertCenter,
  updateCenter,
  stopCenter,
  startCenter,
  deleteCenter
} from '../../api/admin'
export default {
  beforeMount () {
    const response = findAllCenter()
    let _this = this
    response.then(function (e) {
      _this.tableData = e.data.data
      console.log(e.data)
    })
    const res = findAllInventoryOrganization()
    res.then(function (e) {
      _this.inventoryOrganizations = e.data.data
    })
  },
  name: 'centerManage',
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
      currentStatus: 0,
      inventoryOrganizations: [],
      searchInput: '',
      total: 17, // 默认数据总数
      pagesize: 9, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      istag: true,
      input: '',
      tableData: [],
      dialogVisible: false,
      form: { // 表单获取的数据
        centerName: '', // 中心名称
        creator: '', // 创建人
        region: '', // 地区
        date: '', // 创建日期
        time: '', // 创建时间
        desc: '' // 备注
      }
    }
  },
  methods: {
    addCenter () {
      this.currentStatus = 0
      this.form = []
      this.dialogVisible = true
    },
    current_change (val) {
      this.currentPage = val
    },
    handleEdit (index, row) {
      this.currentStatus = 1
      this.dialogVisible = true
      this.form = row
    },
    handleStart (index, row) { // 启用
      const response = startCenter({id: row.id})
      let _this = this
      response.then(function (e) {
        console.log(e.data)
        if (e.data.code === 0) {
          for (let i = 0; i < _this.tableData.length; i++) {
            if (row.id === _this.tableData[i].id) {
              _this.tableData[i].statusName = '启用'
              console.log(_this.tableData[i].statusName)
            }
          }
        }
      })
    },
    handleEnd (index, row) { // 停用
      console.log(row.id)
      const response = stopCenter({id: row.id})
      let _this = this
      response.then(function (e) {
        console.log(e.data)
        if (e.data.code === 0) {
          for (let i = 0; i < _this.tableData.length; i++) {
            if (row.id === _this.tableData[i].id) {
              _this.tableData[i].statusName = '停用'
              console.log(_this.tableData[i].statusName)
            }
          }
        }
      })
    },
    handleDelete (index, row) {
      const response = deleteCenter({id: row.id})
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
      let _this = this
      this.dialogVisible = false
      if (this.currentStatus === 0) {
        console.log(this.form)
        const response = insertCenter({
          centerName: this.form.centerName,
          inventoryOrganizationName: this.form.inventoryOrganizationName,
          remark: this.form.remark,
          creatorName: this.form.creatorName,
          createDate: this.form.createDate
        })
        response.then(function (e) {
          if (e.data.code === 0) {
            _this.$message({
              message: '创建中心成功',
              type: 'success'
            })
            _this.form.statusName = '启用'
            _this.tableData.push(_this.form)
          }
        })
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.form.id === this.tableData[i].id) {
            this.tableData.splice(i, 1)
          }
        }
        const updateResponse = updateCenter(this.form)
        updateResponse.then(function (e) {
          if (e.data.code === 0) {
            _this.$message({
              message: '修改中心成功',
              type: 'success'
            })
            _this.tableData.push(_this.form)
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main_container
    width 1260px
    margin 0 auto
</style>
