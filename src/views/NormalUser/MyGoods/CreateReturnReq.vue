<template>
  <div>
    <navgation-bar></navgation-bar>
    <Block><el-button type="success" id="back" @click="turnBack">返回</el-button></Block>
    <!--手动选择区域-->
    <card id="select-area">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="库存组织">
          <el-select v-model="form.organization" placeholder="请选择库存组织" class="selector"></el-select>
        </el-form-item>
        <el-form-item label="归还部门">
          <el-select v-model="form.department" placeholder="请选择归还部门" class="selector"></el-select>
        </el-form-item>
        <el-form-item label="归还类型">
          <el-select v-model="form.type" placeholder="请选择归还类型" class="selector">
            <el-option value="礼品"></el-option>
            <el-option value="教学用品"></el-option>
            <el-option value="办公用品"></el-option>
            <el-option value="销售商品"></el-option>
            <el-option value="市场物资"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-model="form.date" label="归还日期">
          <el-col :span="20">
            <el-date-picker type="date" placeholder="请选择日期" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.remark" type="textarea" :rows="3" class="remark" placeholder="备注"></el-input>
        </el-form-item>
        <el-button type="primary" id="save-btn" @click="save">保存</el-button>
      </el-form>
    </card>
    <!--物料-->
    <card id="material-area">
      <block><el-button type="success" @click="dialogVisible = true">选择归还物资</el-button></block>
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%">
        <el-table-column fixed prop="orderNum" label="序号" width="50px"></el-table-column>
        <el-table-column prop="materialCode" label="物料编码"></el-table-column>
        <el-table-column prop="materialName" label="物料名称"></el-table-column>
        <el-table-column prop="specification" label="规格"></el-table-column>
        <el-table-column prop="model" label="型号"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="amount" label="归还数量">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.amount" controls-position="right" :min="1" :max="1000" style="width: 100px"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <temlate slot-scope="scope">
            <el-input v-model="scope.row.remark"></el-input>
          </temlate>
        </el-table-column>
        <el-table-column fixed="right" prop="" label="操作" width="50px">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
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
      <el-button type="primary" class="operation-btn">保存</el-button>
      <el-button type="primary" class="operation-btn">提交</el-button>
      <el-button type="danger" class="operation-btn" @click="cancelDialogVisible = true">取消</el-button>
    </card>
    <!--选择物料弹窗-->
    <el-dialog title="选择物资" :visible.sync="dialogVisible" width="80%">
      <el-input placeholder="请输入搜索信息" v-model="searchInfo" class="search-input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div id="dialog-table">
        <el-table :data="materialData.slice((materialPage-1)*materialPageSize,materialPage*materialPageSize)" ref="multipleTable" tooltip-effect="dark" style="width: 100%">
          <el-table-column fixed type="selection" width="50px"></el-table-column>
          <el-table-column fixed prop="orderNum" label="序号" width="50px"></el-table-column>
          <el-table-column prop="materialCode" label="物料编码" width="150px"></el-table-column>
          <el-table-column prop="materialName" label="物料名称" width="150px"></el-table-column>
          <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
          <el-table-column prop="model" label="型号" width="150px"></el-table-column>
          <el-table-column prop="unit" label="单位" width="150px"></el-table-column>
          <el-table-column prop="stock" label="现存量" width="150px"></el-table-column>
          <el-table-column prop="attribute" label="存货属性" width="150px"></el-table-column>
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
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="确认取消创建" :visible.sync="cancelDialogVisible" width="30%" center>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="turnBack">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NavgationBar from '../../../components/NavgationBar'
import Card from '../../../components/Card'
import Block from '../../../components/Block'
export default {
  name: 'CreateReturnReq',
  components: {
    NavgationBar,
    Card,
    Block
  },
  data () {
    return {
      searchInfo: '',
      dialogVisible: false,
      cancelDialogVisible: false,
      // 分页参数
      currentPage: 1,
      pageSize: 6,
      // 弹框分页参数
      materialPage: 1,
      materialPageSize: 6,
      // 表单数据
      form: {
        organization: '',
        department: '',
        type: '',
        date: '',
        remark: ''
      },
      // 表格数据
      tableData: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      dormitory: [
        {
          orderNum: 1
        },
        {},
        {},
        {},
        {},
        {},
        {}
      ]
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
      this.$router.push('/ReturnMaterial')
    },
    handleCurrentChange (value) {
      this.currentPage = value
    },
    handleMaterialPage (value) {
      this.materialPage = value
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
    height 230px
  .selector
    width 195px
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
    height 650px
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
  #save-btn
    float right
    margin-right 60px
</style>
