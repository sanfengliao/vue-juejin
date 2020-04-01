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
      '/v1/pin/comments': {
        target: 'https://hot-topic-comment-wrapper-ms.juejin.im',
        changeOrigin: true,
        pathRewrite: {
          '/pin': '/'
        }
      },
      '/v1/pin': {
        target: 'https://short-msg-ms.juejin.im',
        changeOrigin: true,
        pathRewrite: {
          '/pin': '/'
        }
      },
      '/v1/xiaoce/cache': {
        target: 'https://xiaoce-cache-api-ms.juejin.im',
        changeOrigin: true,
        pathRewrite: {
          '/xiaoce/cache': '/'
        }
      },
      '/v1/xiaoce': {
        target: 'https://xiaoce-timeline-api-ms.juejin.im',
        changeOrigin: true,
        pathRewrite: {
          '/xiaoce': '/'
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
      },
      '/v2/event': {
        target: 'https://event-storage-api-ms.juejin.im',
        changeOrigin: true,
        pathRewrite: {
          '/v2/event': '/v2'
        }
      }
    }
  }
}