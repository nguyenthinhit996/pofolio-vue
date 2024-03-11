import { createRouter, createWebHashHistory } from 'vue-router'
import InterviewVue from '@/views/Interview.vue'
import CKeditorVue from '@/views/CKeditor.vue'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'interview',
      component: InterviewVue
    },
    {
      path: '/interview',
      name: 'interview',
      component: InterviewVue
    },
    {
      path: '/ckeditor',
      name: 'ckeditor',
      component: CKeditorVue
    }
  ]
})
