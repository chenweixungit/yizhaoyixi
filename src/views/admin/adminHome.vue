<template>
  <el-container>
    <el-header><admin-navigation></admin-navigation></el-header>
    <el-main>
    </el-main>
  </el-container>
</template>

<script>
import AdminNavigation from '../../components/adminNavigation'
import store from '../../store/store'
export default {
  name: 'adminHome',
  data () {
    return {
      searchInput: '',
      total: 17, // 默认数据总数
      pagesize: 9, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      istag: true,
      input: '',
      tableData: [
        {
          username: '用户1',
          workNumber: '00001',
          phoneNumber: '13306783267',
          email: '13306783267@163.com',
          location: '合肥',
          createName: '陈维迅',
          createDate: '2020.01.01.17.01',
          status: '保存',
          account: 'account1',
          password: '123456',
          department: '技术部',
          role: '普通用户'
        }
      ]
    }
  },
  components: {
    AdminNavigation
    // handleSelect (key, keyPath) {
    //   console.log(key, keyPath)
    // }
  },
  methods: {
    current_change (val) {
      this.currentPage = val
    },
    showInfo () {
      console.log(store.state.userInfo)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
