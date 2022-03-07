module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 根节点的 font-size 值
      propList: ['*'] // 要处理的属性列表，* 代表所有属性
    }
  }
}
