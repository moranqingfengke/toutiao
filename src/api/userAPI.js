import request from '@/utils/request.js'

// 登录接口
export const loginAPI = data => {
  return request.post('/v1_0/authorizations', data)
}
