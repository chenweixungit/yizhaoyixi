<template>
  <div id="navgation-bar">
    <el-menu :default-active="activeIndex" class="nav-menu" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" class="operation">请购</el-menu-item>
      <el-submenu index="2" class="operation">
        <template slot="title">我的物资</template>
        <el-menu-item index="2-1">物资申请</el-menu-item>.
        <el-menu-item index="2-2">物资归还</el-menu-item>
      </el-submenu>
      <el-submenu index="3" class="operation">
        <template slot="title">采购管理</template>
        <el-menu-item index="3-1">采购合同</el-menu-item>
        <el-menu-item index="3-2">采购订单</el-menu-item>
      </el-submenu>
      <el-submenu index="4" class="operation">
        <template slot="title">总仓管理</template>
        <el-menu-item index="4-1">商品入库</el-menu-item>
        <el-menu-item index="4-2">商品出库</el-menu-item>
        <el-menu-item index="4-3">库存调整</el-menu-item>
      </el-submenu>
      <el-submenu index="5" class="operation">
        <template slot="title">中心管理</template>
        <el-menu-item index="5-1">中心入库</el-menu-item>
        <el-menu-item index="5-2">中心出库</el-menu-item>
        <el-menu-item index="5-3">库存调整</el-menu-item>
      </el-submenu>
      <el-menu-item index="6" class="operation">销售管理</el-menu-item>
      <el-menu-item index="7" class="operation">库存查询</el-menu-item>
      <el-submenu index="8" class="user-operation">
        <template slot="title"><i class="el-icon-user"></i></template>
        <el-menu-item index="8-1">修改密码</el-menu-item>
        <el-menu-item index="8-2">登出</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="550px">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="originPass">
          <el-input width="200px" type="password" v-model="ruleForm2.originPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input  type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input  type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import store from '../store/store'
import {changePassword} from '../api/components'

export default {
  name: 'NavgationBar',
  data () {
    let validatePass = (rule, value, callback) => { //  判断密码为空的规则
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => { // 判断两次密码不一致的规则
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      ruleForm2: {
        originPass: '',
        pass: '',
        checkPass: ''
      },
      rules2: {
        originPass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    activeIndex () {
      return store.state.activeIndex
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      store.dispatch('changeActiveIndex', key)
      if (key === '1') {
        this.$router.push('/PurchaseReq')
      } else if (key === '2-1') {
        this.$router.push('/MaterialReq')
      } else if (key === '2-2') {
        this.$router.push('/ReturnMaterial')
      } else if (key === '3-1') {
        this.$router.push('/Contract')
      } else if (key === '3-2') {
        this.$router.push('/Order')
      } else if (key === '4-1') {
        this.$router.push('/IntoWarehouse')
      } else if (key === '4-2') {
        this.$router.push('/ExWarehouse')
      } else if (key === '4-3') {
        this.$router.push('/InventoryAdjustment')
      } else if (key === '5-1') {
        this.$router.push('/CenterIntoWarehouse')
      } else if (key === '5-2') {
        this.$router.push('/CenterExWarehouse')
      } else if (key === '5-3') {
        this.$router.push('/CenterInventoryAdjustment')
      } else if (key === '6') {
        this.$router.push('/saleManage')
      } else if (key === '7') {
        this.$router.push('/searchGoods')
      } else if (key === '8-1') {
        this.dialogVisible = true
      } else if (key === '8-2') {
        this.$router.push('/login')
      }
    },
    submitForm (formName) {
      let _this = this
      const response = changePassword({account: store.state.userInfo.account,
        password: this.ruleForm2.originPass,
        newPassword: this.ruleForm2.pass})
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('密码已修改成功!')
              _this.dialogVisible = false
            } else {
              console.log('error submit!!')
              return false
            }
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
.operation
  position relative
  left 100px
.user-operation
  position relative
  left 550px
</style>
