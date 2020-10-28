<template>
  <el-container id="containder">
    <el-header>
      <el-menu :default-active="activeIndex" class="class" :active="activeIndex"
               mode="horizontal" @select="handleSelect">
        <el-submenu index="1" >
          <template slot="title">系统管理</template>
          <el-menu-item index="1-1">组织架构管理</el-menu-item>
          <el-menu-item index="1-2">角色管理</el-menu-item>
          <el-menu-item index="1-3">用户管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2" >
          <template slot="title">基础数据管理</template>
          <el-menu-item index="2-1">库存组织管理</el-menu-item>
          <el-menu-item index="2-2">中心管理</el-menu-item>
          <el-menu-item index="2-3">品牌管理</el-menu-item>
          <el-menu-item index="2-4">仓库维护</el-menu-item>
          <el-menu-item index="2-5">供应商维护</el-menu-item>
          <el-menu-item index="2-6">客户维护</el-menu-item>
          <el-menu-item index="2-7">计量单位维护</el-menu-item>
          <el-menu-item index="2-8">物料类别维护</el-menu-item>
          <el-menu-item index="2-9">物料维护</el-menu-item>
        </el-submenu>
        <el-submenu index="3" class="user-icon">
          <template slot="title"><i class="el-icon-user" ></i></template>
          <el-menu-item index="3-1" >修改密码</el-menu-item>
          <el-menu-item index="3-2">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
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
  </el-container>
</template>

<script>
import store from '../store/store'
import {changePassword} from '../api/components'

export default {
  name: 'adminNavigation',
  computed: {
    activeIndex () {
      return store.state.activeIndex
    }
  },
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
  components: {
  },
  methods: {
    handleSelect (key, keyPath) {
      // eslint-disable-next-line no-unused-vars
      store.dispatch('changeActiveIndex', key)
      let map = new Map([['1-1', '/admin/organize'], ['1-2', '/admin/role'], ['1-3', '/admin/user'],
        ['2-1', '/admin/storage'], ['2-2', '/admin/center'], ['2-3', '/admin/brand'],
        ['2-4', '/admin/warehouse'], ['2-5', '/admin/support'], ['2-6', '/admin/client'],
        ['2-7', '/admin/measure'], ['2-8', '/admin/materialKind'], ['2-9', '/admin/material']])
      if (key === '3-1') {
        this.dialogVisible = true
      } else if (key === '3-2') {
        this.$router.push('/login')
      } else {
        this.$router.push(map.get(key))
      }
    },
    onSubmit () {
      this.dialogVisible = false
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
  .user-icon
    position relative
    left 930px
  #containder
    width 1300px
    margin 0 auto
</style>
