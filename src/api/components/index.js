import axios from 'axios'
// 修改密码
async function changePassword (data) {
  const res = await axios({
    method: 'post',
    url: '/user/changePassword',
    data: data
  })
  return res
}
export {
  changePassword
}
