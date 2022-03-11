import request from '@/utils/request.js'

// 文章细节api
export const getArticleDetailAPI = id => {
  return request.get(`/v1_0/articles/${id}`)
}

// 关注用户的 API（形参中的 userId 是文字作者的 id）
export const followUserAPI = userId => {
  return request.post('/v1_0/user/followings', {
    target: userId
  })
}

// 取消关注用户的 API
export const unfollowUserAPI = userId => {
  return request.delete(`/v1_0/user/followings/${userId}`)
}

// 点赞的 API（形参中的 artId 是文章的 Id）
export const addLikeAPI = artId => {
  return request.post('/v1_0/article/likings', {
    target: artId
  })
}

// 取消点赞的 API（形参中的 artId 是文章的 Id）
export const delLikeAPI = artId => {
  return request.delete(`/v1_0/article/likings/${artId}`)
}
