import { createRouter, createWebHistory } from 'vue-router'
import BodyImagen from '@/components/BodyImagen.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'album',
      component: BodyImagen
      
    }
  ],
})

export default router
