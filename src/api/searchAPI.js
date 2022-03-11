import request from '@/utils/request.js'

// 获取搜索建议列表数据的 API
export const getSuggestListAPI = kw => {
  return request.get('/v1_0/suggestion', {
    // GET请求的参数，要通过params提供
    params: {
      q: kw
    }
  })
}

// 搜索文章数据的 API
export const getSearchResultAPI = (kw, page) => {
  return request.get('/v1_0/search', {
    params: {
      q: kw, // 搜索关键词
      page: page // 页码值
    }
  })
}
