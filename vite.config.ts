import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src') // 相对路径别名配置，使用 @ 代替 src
        }
    },
    // 配置跨域代理
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                cookiePathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
})