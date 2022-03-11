import request from '@/utils/request.js'

// 获取用户频道列表
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

// 将文章设置成不感兴趣
export const dislikeArticleAPI = id => {
  return request.post('/v1_0/article/dislikes', {
    target: id
  })
}

// 举报文章的 API
export const reportArticleAPI = (target, type) => {
  return request.post('/v1_0/article/reports', {
    target, // 文章的 Id
    type // 举报的类型
  })
}

// 获取所有频道数据的 API
export const getAllChannelAPI = () => {
  return request.get('/v1_0/channels')
}

// 更新用户频道列表数据的 API
export const updateUserChannelAPI = channels => {
  return request.put('/v1_0/user/channels', {
    channels
  })
}
