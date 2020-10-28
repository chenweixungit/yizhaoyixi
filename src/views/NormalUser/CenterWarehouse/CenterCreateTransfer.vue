<template>
  <div>
    <navgation-bar></navgation-bar>
    <Block><el-button type="success" id="back" @click="turnBack">返回</el-button></Block>
    <!--手动选择区域-->
    <card id="select-area">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="库存组织">
          <el-select placeholder="请选择库存组织" class="selector"></el-select>
        </el-form-item>
        <el-form-item label="转入仓库">
          <el-select placeholder="请选择转入仓库" class="selector"></el-select>
        </el-form-item>
        <el-form-item label="转出仓库">
          <el-select placeholder="请选择转出仓库" class="selector"></el-select>
        </el-form-item>
        <el-form-item label="申请日期">
          <el-date-picker type="date" placeholder="请选择日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input type="textarea" :rows="3" class="remark" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
    </card>
    <!--物料选择区域-->
    <card id="material-area">
      <block><el-button type="success" @click="dialogVisible = true">选择转库申请单</el-button></block>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="" label="序号" width="50px"></el-table-column>
        <el-table-column prop="" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="" label="物料名称" width="150px"></el-table-column>
        <el-table-column prop="" label="规格" width="150px"></el-table-column>
        <el-table-column prop="" label="型号" width="150px"></el-table-column>
        <el-table-column prop="" label="单位" width="150px"></el-table-column>
        <el-table-column prop="" label="申请数量" width="150px"></el-table-column>
        <el-table-column prop="" label="实发数量" width="150px"></el-table-column>
        <el-table-column prop="" label="现存量" width="150px"></el-table-column>
        <el-table-column prop="" label="申请单号" width="150px"></el-table-column>
        <el-table-column prop="" label="备注" width="150px"></el-table-column>
        <el-table-column fixed="right" prop="" label="操作" width="50px">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <el-button type="primary" class="operation-btn">保存</el-button>
      <el-button type="primary" class="operation-btn">提交</el-button>
      <el-button type="danger" class="operation-btn" @click="cancelDialogVisible = true">取消</el-button>
    </card>
    <!--选择转库申请单弹窗-->
    <el-dialog title="请选择转库申请单" :visible.sync="dialogVisible" width="50%">
      <el-input placeholder="" v-model="searchInfo" class="search-input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div id="dialog-table">
        <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%">
          <el-table-column fixed type="selection" width="55"></el-table-column>
          <el-table-column fixed prop="" label="序号" width="55"></el-table-column>
          <el-table-column prop="" label="转库申请单号"></el-table-column>
          <el-table-column prop="" label="申请部门"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          class="dialog-pagination">
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
import Block from '../../../components/Block'
import Card from '../../../components/Card'
import store from '../../../store/store'
export default {
  name: 'CreateShift',
  components: {
    NavgationBar,
    Block,
    Card
  },
  data () {
    return {
      cancelDialogVisible: false,
      dialogVisible: false
    }
  },
  methods: {
    turnBack () {
      store.dispatch('changeIASelection', '转库单')
      this.$router.push('/CenterInventoryAdjustment')
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
    height 180px
  .selector
    width 195px
  .remark
    width 1178px
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
    top 300px
  #dialog-table
    height 400px
  .dialog-pagination
    float left
  .search-input
    width 300px
    float right
</style>
