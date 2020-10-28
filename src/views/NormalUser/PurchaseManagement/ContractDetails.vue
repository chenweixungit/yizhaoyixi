<template>
  <div>
    <navgation-bar></navgation-bar>
    <Block><el-button type="success" id="back" @click="turnBack">返回</el-button></Block>
    <!--手动选择区域-->
    <card id="select-area">
      <el-form :inline="true" ref="form" :model="form" label-width="100px">
        <el-form-item label="库存组织">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="合同名称">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="签订日期">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="合同有效期">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="合同总额">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input :disabled="true" type="textarea" :rows="3" class="remark" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
    </card>
    <!--选择请购单区域-->
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
        <el-table-column fixed="right" prop="" label="操作">
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
    </card>
    <!--增加付款协议-->
    <card id="add-agreement">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="" label="序号" width="50px"></el-table-column>
        <el-table-column prop="" label="付款批次" width="150px"></el-table-column>
        <el-table-column prop="" label="付款比例" width="150px"></el-table-column>
        <el-table-column prop="" label="付款金额" width="150px"></el-table-column>
        <el-table-column prop="" label="计划付款日期" width="150px"></el-table-column>
        <el-table-column prop="" label="是否预付款" width="150px"></el-table-column>
        <el-table-column prop="" label="备注" width="150px"></el-table-column>
        <el-table-column fixed="right" prop="" label="操作">
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
    </card>
    <!--上传附件-->
    <card id="upload">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="" label="序号" width="50px"></el-table-column>
        <el-table-column prop="" label="附件名称"></el-table-column>
        <el-table-column prop="" label="上传时间"></el-table-column>
        <el-table-column prop="" label="上传人"></el-table-column>
        <el-table-column fixed="right" prop="" label="操作">
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
    </card>
  </div>
</template>

<script>
import NavgationBar from '../../../components/NavgationBar'
import Block from '../../../components/Block'
import Card from '../../../components/Card'
export default {
  name: 'ContractDetails',
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
      this.$router.push('/Contract')
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
    height 240px
  .selector
    width 195px
  .remark
    width 1140px
    position relative
    left 30px
  .save
    position relative
    left 220px
    top 35px
  #material-area
    margin-top 10px
  #dialog-table
    height 400px
  .dialog-pagination
    float left
  .search-input
    width 300px
    float right
  #add-agreement
    margin-top 10px
    height 400px
  #upload
    margin-top 10px
    height 470px
</style>
