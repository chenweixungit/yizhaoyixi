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
          <el-col :span="1"><el-button type="success" size="medium" @click="addNewRole">添加</el-button></el-col>
        </el-row>
      </el-main>
      <card>
        <div class="container-table">
          <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    stripe :default-sort="{prop: 'data', order: 'descending'}">
            <el-table-column prop="roleName" label="角色" fixed>
            </el-table-column>
            <el-table-column prop="roleDescription" label="角色描述">
            </el-table-column>
            <el-table-column prop="creatorName" label="创建人" sortable>
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间" sortable>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="250px">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
      <el-dialog title="新建角色" :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="角色">
            <el-input v-model="form.roleName"></el-input>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input v-model="form.creatorName"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-col :span="11">
              <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期" v-model="form.createDate" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input type="textarea" v-model="form.roleDescription" maxlength="200" rows="6" placeholder="最多输入200字"></el-input>
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
  findAllRole,
  insertRole,
  updateRole,
  stopRole,
  enableRole,
  deleteRole
} from '../../api/admin'
export default {
  beforeMount () {
    const response = findAllRole()
    let _this = this
    response.then(function (e) {
      _this.tableData = e.data.data
      console.log(e.data)
    })
  },
  name: 'roleManage',
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
      // 0表示新建,1表示编辑
      currentRoleState: 0,
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
        roleName: '', // 角色
        creatorName: '', // 创建人
        createDate: '', // 创建日期
        roleDescription: '' // 角色描述
      }
    }
  },
  methods: {
    // 添加新角色
    addNewRole () {
      this.dialogVisible = true
      this.form = {
        roleName: '', // 角色
        creatorName: '', // 创建人
        createDate: '', // 创建日期
        roleDescription: '' // 角色描述
      }
      this.currentRoleState = 0
    },
    current_change (val) {
      this.currentPage = val
    },
    handleEdit (row) {
      this.currentRoleState = 1
      this.dialogVisible = true
      this.form.id = row.id
      this.form.roleName = row.roleName
      this.form.roleDescription = row.roleDescription
      this.form.creatorName = row.creatorName
      this.form.createDate = row.createDate
      this.form.statusName = row.statusName
    },
    handleStart (index, row) { // 启用
      const response = enableRole({roleId: row.id})
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
      const response = stopRole({roleId: row.id})
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
      const response = deleteRole({roleId: row.id})
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
      if (this.currentRoleState === 0) {
        this.from.id = null
        this.from.statusId = null
        const response = insertRole(this.form)
        response.then(function (e) {
          if (e.data.code === 0) {
            _this.$message({
              message: '创建角色成功成功',
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
        const updateResponse = updateRole(this.form)
        updateResponse.then(function (e) {
          if (e.data.code === 0) {
            _this.$message({
              message: '修改角色成功',
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
