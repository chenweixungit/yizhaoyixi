// import { createLocalVue, mount } from '@vue/test-utils'
// import admin from '../../src/page/LoginPage'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
// import VueRouter from 'vue-router'
// import store from '../../src/store'
// import router from '../../src/router'
import {adminNavigation, mount} from '../../../src/components/adminNavigation'
import {changePassword} from '../../../src/api/admin'
import router from '../../../src/router'
import store from '../../../src/store'
// describe('LoginPage', () => {
//   const localVue = createLocalVue()
//   localVue.use(Vuex)
//   localVue.use(ElementUI)
//   localVue.use(VueRouter)
//   const wrapper = mount(LoginPage, {
//     store,
//     router,
//     localVue
//   })
//   test('快照测试', async () => {
//     await expect(wrapper.html()).toMatchSnapshot()
//   })
//   test('是一个 Vue 实例', async () => {
//     await expect(wrapper.isVueInstance()).toBeTruthy()
//   })
// })
describe('adminNavigation', () => {
  const localVue = changePassword()
  localVue.use(Vuex)
  localVue.use(ElementUI)
  // localVue.use(VueRouter)
  const wrapper = mount(adminNavigation, {
    store,
    router,
    localVue
  })
  test('快照测试', async () => {
    await expect(wrapper.html()).toMatchSnapshot()
  })
  test('是一个 Vue 实例', async () => {
    await expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
