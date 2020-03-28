module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/v1/home': {
        target: 'http://timeline-merger-ms.juejin.im',
        changeOrigin: true,
        pathRewrite: {
          '/home': '/'
        }
      },
      '/v1/post': {
        target: 'https://entry-view-storage-api-ms.juejin.im',
        changeOrigin: true,
        pathRewrite: {
          '/post': '/'
        }
      },
      '/v1': {
        target: 'http://timeline-merger-ms.juejin.im',
        changeOrigin: true,
      },
      '/v2/comment': {
        target: 'https://comment-wrapper-ms.juejin.im',
        changeOrigin: true,
        pathRewrite: {
          '/v2/comment': '/v2'
        }
      }
    }
  }
}