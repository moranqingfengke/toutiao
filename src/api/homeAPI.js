import request from '@/utils/request.js'

// 获取频道列表
export const getUserChannelAPI = () => {
  return request.get('/v1_0/user/channels')
}

// 获取频道下文章列表数据
export const getArtListAPI = (id, time) => {
  return request.get('/v1_0/articles', {
    params: {
      channel_id: id,
      timestamp: time
    }
  })
}
