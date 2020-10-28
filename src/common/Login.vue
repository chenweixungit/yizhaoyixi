<template>
  <div id="main-page">
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h2 class="login-title">登 录</h2>
      <el-form-item prop="account" class="input-box">
        <el-input class="input-content" type="text" placeholder="请输入账号" suffix-icon="el-icon-user" v-model="form.account"/>
      </el-form-item>
      <el-form-item prop="password" class="input-box">
        <el-input class="input-content" type="password" placeholder="请输入密码" suffix-icon="el-icon-lock" v-model="form.password"/>
      </el-form-item>
      <slide-component class="slide-right" ref="LoginVerify">
      </slide-component>
      <el-form-item>
        <el-button id="submit" type="success" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {userLogin, findAllInventoryOrganization} from '../api/common'
import SlideComponent from '../components/Slide'
import store from '../store/store'
export default {
  name: 'Login',
  components: {SlideComponent},
  comments: {
    SlideComponent
  },
  data () {
    return {
      form: {
        account: '',
        password: ''
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        account: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },
      // 对话框显示和隐藏
      dialogVisible: false,
      isLogin: '0'
    }
  },
  methods: {
    onSubmit (formName) {
      // 滑动栏滑倒右端
      let _this = this
      if (this.$refs.LoginVerify.$refs.Verify.isPassing === true) {
        // 进行登录
        try {
          // console.log(store.state.userInfo)
          const response = userLogin(this.form)
          response.then(function (e) {
            if (e.data.code === 0) {
              store.dispatch('changeUserInfo', e.data.data)
              if (e.data.data.roleName[0] === '系统管理员') {
                _this.$router.push('/admin/user')
              } else {
                _this.$router.push('/PurchaseReq')
              }
              const res = findAllInventoryOrganization()
              res.then(function (e) {
                _this.$store.dispatch('setAllInventoryOrganizations', e.data.data)
              })
            } else if (e.data.code === '4') {
              alert('密码错误')
            }
          })
        } catch (error) {
          console.log('登陆失败')
        }
      } else {
        alert('验证未通过，请向右拖动滑动条')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .login-box
    border 1px solid #DCDFE6
    width 450px
    height 380px
    margin 180px auto
    padding 35px 35px 15px 35px
    border-radius 5px
    -webkit-border-radius 5px
    -moz-border-radius 5px
    box-shadow 0 0 25px #909399
    .login-title
      text-align center
      margin 0 auto 40px auto
      color #6B8E23
    .input-box
      position relative
      right 15px
      width 400px
      .input-content
        margin auto 0
    .verifying-button
      display flex
      flex-direction column
      justify-content center
      width 340px
      height 45px
  .slide-right
    margin auto
    margin-left 80px
    width 350px
    height 50px
  #submit
    margin-left 110px
</style>
