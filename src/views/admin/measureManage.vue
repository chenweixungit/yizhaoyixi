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
        <el-col :span="1"><el-button type="success" size="medium" @click="addMeasurement">添加</el-button></el-col>
      </el-row>
    </el-main>
    <card>
      <div class="container-table">
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  stripe :default-sort="{prop: 'data', order: 'descending'}">
          <el-table-column prop="measurementCode" label="单位编码" fixed>
          </el-table-column>
          <el-table-column prop="measurementName" label="单位名称">
          </el-table-column>
          <el-table-column prop="measurementDimension" label="所属量纲">
          </el-table-column>
          <el-table-column prop="creatorName" label="创建人">
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
    <el-dialog title="新建测量单位" :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="单位编码">
          <el-input v-model="form.measureCode"></el-input>
        </el-form-item>
        <el-form-item label="单位名称">
          <el-input v-model="form.measureName"></el-input>
        </el-form-item>
        <el-form-item label="所属量纲">
          <el-select v-model="form.measureStandard" placeholder="活动区域">
            <el-option label="重量" value="重量"></el-option>
            <el-option label="长度" value="长度"></el-option>
            <el-option label="面积" value="面积"></el-option>
            <el-option label="体积" value="体积"></el-option>
            <el-option label="件数" value="件数"></el-option>
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
  findAllMeasurement,
  stopMeasurement,
  enableMeasurement,
  deleteMeasurement
} from '../../api/admin'
export default {
  beforeMount () {
    const response = findAllMeasurement()
    let _this = this
    response.then(function (e) {
      _this.tableData = e.data.data
      console.log(e.data)
    })
  },
  name: 'measureManage',
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
      currentMeasurementStatus: 0,
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
        measurementCode: '',
        measurementName: '',
        measurementDimension: '',
        creatorName: '',
        createDate: ''
      }
    }
  },
  methods: {
    addMeasurement () {
      this.currentMeasurementStatus = 0
      this.dialogVisible = true
      this.form = {
        measurementCode: '',
        measurementName: '',
        measurementDimension: '',
        creatorName: '',
        createDate: ''
      }
    },
    current_change (val) {
      this.currentPage = val
    },
    handleEdit (index, row) {
      this.currentMeasurementStatus = 1
      this.dialogVisible = true
      this.form = row
    },
    handleStart (index, row) { // 启用
      const response = enableMeasurement({measurementId: row.measurementId})
      let _this = this
      response.then(function (e) {
        console.log(e.data)
        if (e.data.code === 0) {
          for (let i = 0; i < _this.tableData.length; i++) {
            if (row.measurementId === _this.tableData[i].measurementId) {
              _this.tableData[i].statusName = '启用'
              console.log(_this.tableData[i].statusName)
            }
          }
        }
      })
    },
    handleEnd (index, row) { // 停用
      const response = stopMeasurement({measurementId: row.measurementId})
      let _this = this
      response.then(function (e) {
        console.log(e.data)
        if (e.data.code === 0) {
          for (let i = 0; i < _this.tableData.length; i++) {
            if (row.measurementId === _this.tableData[i].measurementId) {
              _this.tableData[i].statusName = '停用'
              console.log(_this.tableData[i].statusName)
            }
          }
        }
      })
    },
    handleDelete (index, row) {
      const response = deleteMeasurement({measurementId: row.measurementId})
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
