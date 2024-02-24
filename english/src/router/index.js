import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MochiViewVue from '@/views/MochiView.vue'
import ManageMochiVue from '@/views/ManageMochi.vue'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mochi',
      name: 'mochi',
      component: MochiViewVue
    },
    {
      path: '/manage',
      name: 'ManageMochiSentence',
      component: ManageMochiVue
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})
