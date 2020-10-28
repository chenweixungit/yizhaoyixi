<template>
  <div>
    <navgation-bar></navgation-bar>
    <block><el-button type="success" id="back" @click="turnBack">返回</el-button></block>
    <card id="select-area">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="库存组织">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单日期">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="价税合计">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="textarea" :rows="3" class="remark" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </card>
    <card id="material-area">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="" label="序号" width="50px"></el-table-column>
        <el-table-column prop="" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="" label="物料名称" width="150px"></el-table-column>
        <el-table-column prop="" label="规格" width="150px"></el-table-column>
        <el-table-column prop="" label="型号" width="150px"></el-table-column>
        <el-table-column prop="" label="单位" width="150px"></el-table-column>
        <el-table-column prop="" label="数量" width="150px"></el-table-column>
        <el-table-column prop="" label="税率" width="150px"></el-table-column>
        <el-table-column prop="" label="含税单价" width="150px"></el-table-column>
        <el-table-column prop="" label="无税单价" width="150px"></el-table-column>
        <el-table-column prop="" label="含税金额" width="150px"></el-table-column>
        <el-table-column prop="" label="无税金额" width="150px"></el-table-column>
        <el-table-column prop="" label="税额" width="150px"></el-table-column>
        <el-table-column prop="" label="备注" width="150px"></el-table-column>
        <el-table-column prop="" label="订单号" width="150px"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </card>
  </div>
</template>

<script>
import NavgationBar from '../../../components/NavgationBar'
import Block from '../../../components/Block'
import Card from '../../../components/Card'
export default {
  name: 'OrderDetails',
  components: {
    NavgationBar,
    Block,
    Card
  },
  data () {
    return {}
  },
  methods: {
    turnBack () {
      this.$router.push('/Order')
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
  .remark
    width 1190px
    position relative
    left 10px
  #material-area
    margin-top 10px
</style>
