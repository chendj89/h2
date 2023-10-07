import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vitePluginMd from './src/plugins/vueMdPlugin'
import VueDevTools from 'vite-plugin-vue-devtools'
export default defineConfig({
  plugins: [
    VueDevTools(),
    vue({
      include: [/(\.vue)$/, /\.md$/]
    }),
    vueJsx(),
    vitePluginMd({
      shiki: {
        theme: 'dark-plus'
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
