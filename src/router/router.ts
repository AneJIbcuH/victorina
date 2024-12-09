import { createRouter, createWebHistory } from 'vue-router'

export enum AppRouts {
  HOME = '/',
  VICTORINA = '/victorina',
  END = '/end',
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: AppRouts.HOME,
      component: () => import('../pages/Home/Home.vue'),
    },
    {
      path: AppRouts.VICTORINA,
      component: () => import('../pages/Victorina/Victorina.vue'),
    },
    {
      path: AppRouts.END,
      component: () => import('../pages/End/End.vue'),
    },
  ],
})

export default router
