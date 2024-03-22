import { createRouter, createWebHashHistory } from 'vue-router'
import ReviewPost from '@/views/ReviewPost.vue'
import CKeditorVue from '@/views/CKeditor.vue'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CKeditorVue
    },
    {
      path: '/review',
      name: 'interview',
      component: ReviewPost
    },
    {
      path: '/ckeditor',
      name: 'ckeditor',
      component: CKeditorVue
    }
  ]
})
