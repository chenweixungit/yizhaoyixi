<template>
  <div>
    <navgation-bar></navgation-bar>
    <block><el-button type="success" id="back" @click="turnBack">返回</el-button></block>
    <card id="select-area">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="库存组织">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="归还部门">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="归还类型">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="归还日期">
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
        <el-table-column prop="" label="物料编码"></el-table-column>
        <el-table-column prop="" label="物料名称"></el-table-column>
        <el-table-column prop="" label="规格"></el-table-column>
        <el-table-column prop="" label="型号"></el-table-column>
        <el-table-column prop="" label="单位"></el-table-column>
        <el-table-column prop="" label="归还数量"></el-table-column>
        <el-table-column prop="" label="备注"></el-table-column>
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
import Block from '../../../components/Block'
import Card from '../../../components/Card'
import NavgationBar from '../../../components/NavgationBar'
export default {
  name: 'ReturnMaterialDetails',
  components: {
    Block,
    Card,
    NavgationBar
  },
  data () {
    return {}
  },
  methods: {
    turnBack () {
      this.$router.push('/ReturnMaterial')
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
