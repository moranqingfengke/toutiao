import request from '@/utils/request.js'

export const getUserChannelAPI = () => {
  return request.get('/v1_0/user/channels')
}
