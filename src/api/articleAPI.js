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

// 获取文章下评论数据的 API
export const getCmtListAPI = (artId, offset) => {
  return request.get('/v1_0/comments', {
    params: {
      // a 表示获取文章下的评论
      type: 'a',
      // 文章的 Id
      source: artId,
      // 获取评论数据的偏移量，值为评论的 id。表示从此 id 的数据向后取，不传表示从第一页开始读取数据
      offset
    }
  })
}

// 评论点赞的 API
export const addLikeCmtAPI = cmtId => {
  return request.post('/v1_0/comment/likings', {
    target: cmtId
  })
}

// 评论取消点赞的 API
export const delLikeCmtAPI = cmtId => {
  return request.delete(`/v1_0/comment/likings/${cmtId}`)
}

// 发表评论的 API
export const pubCommentAPI = (artId, content) => {
  return request.post('/v1_0/comments', {
    target: artId,
    content
  })
}
