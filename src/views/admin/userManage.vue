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
        <el-col :span="1"><el-button type="success" size="medium" @click="addOne">添加</el-button></el-col>
      </el-row>
    </el-main>
    <card>
      <div class="container-table">
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  stripe :default-sort="{prop: 'data', order: 'descending'}">
          <el-table-column prop="username" label="姓名" width="150px" >
          </el-table-column>
          <el-table-column prop="workNumber" label="工号" width="150px" >
          </el-table-column>
          <el-table-column prop="phoneNumber" label="手机号" width="150px" >
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="200px" >
          </el-table-column>
          <el-table-column prop="locationName" label="区域" width="150px" >
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" width="150px" >
          </el-table-column>
          <el-table-column prop="roleName" label="角色" width="200px">
          </el-table-column>
          <el-table-column prop="creatorName" label="创建人" sortable width="150px">
          </el-table-column>
          <el-table-column  prop="createDate" label="创建时间" sortable width="150px">
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="250px" fixed="right">
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
    <el-dialog title="新建用户" :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model.number="form.workNumber"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="区域">
          <el-select v-model="form.locationName" placeholder="区域">
            <el-option label="合肥" value="合肥"></el-option>
            <el-option label="南京" value="南京"></el-option>
            <el-option label="杭州" value="杭州"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="form.departmentName" placeholder="部门">
            <el-option v-for="(item,index) in departments" :key="index" :value="item.departmentName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.roleName" placeholder="角色">
            <el-option v-for="(item,index) in roles" :key="index" :value="item.roleName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="form.creatorName"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-date-picker  value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期" v-model="form.createDate" style="width: 100%;"></el-date-picker>
          </el-col>
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
  findAllUser,
  stopUser,
  enableUser,
  deleteUser, findAllDepartment, findAllRole, addUser, updateUser
} from '../../api/admin'
export default {
  beforeMount () {
    const response = findAllUser()
    let _this = this
    response.then(function (e) {
      _this.tableData = e.data.data
      console.log(e.data)
    })
    const res = findAllDepartment()
    res.then(function (e) {
      _this.departments = e.data.data
    })
    const roleresponse = findAllRole()
    roleresponse.then(function (e) {
      _this.roles = e.data.data
    })
  },
  name: 'userManage',
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
    // eslint-disable-next-line no-unused-vars
    let checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    return {
      currentState: 0,
      roles: [],
      departments: [],
      dialogVisible: false,
      searchInput: '',
      total: 23, // 默认数据总数
      pagesize: 5, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      istag: true,
      input: '',
      tableData: [
      ],
      form: {
        username: '',
        workNumber: '',
        phoneNumber: '',
        email: '',
        locationName: '',
        departmentName: '',
        roleName: '',
        creatorName: '',
        createDate: ''
      },
      rules: {
        phoneNumber: [
          {
            required: true, validator: checkPhone, trigger: 'blur'
          }
        ],
        workNumber: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    addOne () {
      this.dialogVisible = true
      this.form = {
        username: '',
        workNumber: '',
        phoneNumber: '',
        email: '',
        locationName: '',
        departmentName: '',
        roleName: '',
        creatorName: '',
        createDate: ''
      }
      this.currentState = 0
    },
    current_change (val) {
      this.currentPage = val
    },
    handleEdit (row) {
      console.log(row)
      this.currentState = 1
      this.form.id = row.id
      this.form.statusName = row.statusName
      this.form.account = row.account
      this.form.password = row.password
      this.form.phoneNumber = row.phoneNumber
      this.form.username = row.username
      this.form.workNumber = row.workNumber
      this.form.email = row.email
      this.form.locationName = row.locationName
      this.form.creatorName = row.creatorName
      this.form.departmentName = row.departmentName
      this.form.roleName = row.roleName[0]
      this.form.createDate = row.createDate
      this.dialogVisible = true
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.form.id === this.tableData[i].id) {
          this.tableData.splice(i, 1)
        }
      }
    },
    handleStart (index, row) { // 启用
      const response = enableUser({userId: row.id})
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
      const response = stopUser({userId: row.id})
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
      const response = deleteUser({userId: row.id})
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
      if (this.currentState === 0) {
        let roleName = []
        roleName.push(this.form.roleName)
        this.form.roleName = roleName
        this.form.account = ''
        this.form.password = ''
        this.form.statusName = ''
        this.form.id = null
        console.log(this.form)
        const response = addUser(this.form)
        response.then(function (e) {
          if (e.data.code === 0) {
            _this.$message({
              message: '创建用户成功',
              type: 'success'
            })
            _this.form.statusName = '启用'
            _this.tableData.push(_this.form)
          }
        })
      } else {
        let roleName = []
        roleName.push(this.form.roleName)
        this.form.roleName = roleName
        const response = updateUser(this.form)
        response.then(function (e) {
          if (e.data.code === 0) {
            _this.$message({
              message: '修改用户成功',
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
