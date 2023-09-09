import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        cls: 'md'
      },
      component: () => import('../md/index.md')
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        cls: 'md'
      },
      component: () => import('../md/about.md')
    },
    {
      path: '/array',
      name: 'array',
      meta: {
        cls: 'md'
      },
      component: () => import('../md/vue2_数组.md')
    },
    {
      path: '/error',
      name: 'error',
      meta: {
        cls: 'md'
      },
      component: () => import('../md/vue2_错误.md')
    }
  ]
})
export default router
