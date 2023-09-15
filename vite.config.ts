import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vitePluginMd from './src/plugins/vueMdPlugin'
import chencc from './src/plugins/vueSfc'
export default defineConfig({
  plugins: [
    vue({
      include: [/(\.vue)$/, /\.md$/]
    }),
    vueJsx(),
    vitePluginMd({
      shiki: {
        theme: 'dark-plus'
      }
    }),
    chencc()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
