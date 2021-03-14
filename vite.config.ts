import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.juejin.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxyServer, opts) => {
          proxyServer.on('proxyReq', (proxyReq, req) => {
            proxyReq.setHeader('origin', 'https://juejin.cn')
            proxyReq.setHeader('Referer', 'https://juejin.cn/')
          })
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${resolve(__dirname, './src/assets/less/var.less')}";`,
        math: 'always',
      }
    }
  },
  plugins: [vue()]
})
