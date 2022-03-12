import request from '@/utils/request.js'

// 登录接口
export const loginAPI = data => {
  return request.post('/v1_0/authorizations', data)
}

// 请求用户基本信息的 API
export const getUserInfoAPI = () => {
  return request.get('/v1_0/user')
}

// 请求用户简介信息的 API
export const getUserProfileAPI = () => {
  return request.get('/v1_0/user/profile')
}

// 修改用户简介的 API
export const updateUserProfileAPI = obj => {
  return request.patch('/v1_0/user/profile', obj)
}

// 修改头像
export const updateUserAvatarAPI = fd => {
  return request.patch('/v1_0/user/photo', fd)
}
